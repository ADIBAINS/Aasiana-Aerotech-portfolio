import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";
const maxBodyBytes = 16 * 1024;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
    }

    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > maxBodyBytes) {
      return NextResponse.json({ error: "Request payload is too large." }, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
      return NextResponse.json({ error: "Request payload is too large." }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Request body must contain valid JSON." }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Please check the highlighted fields.",
          fieldErrors: z.flattenError(result.error).fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, company, email, phone, service, message, website } = result.data;

    // Honeypot field: real visitors never see or fill this.
    if (website) {
      console.info(JSON.stringify({ event: "contact_spam_filtered", requestId }));
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error(JSON.stringify({ event: "contact_not_configured", requestId }));
      return NextResponse.json(
        { error: "Email service is not configured yet. Please use the direct contact details." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company || "Not provided"),
      email: escapeHtml(email),
      phone: escapeHtml(phone || "Not provided"),
      service: escapeHtml(service),
      message: escapeHtml(message).replace(/\n/g, "<br />"),
    };

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Aasiana website enquiry — ${service}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service: ${service}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#29252f;max-width:640px;margin:auto">
          <div style="border-top:5px solid #311f6e;padding:28px 0 18px">
            <p style="margin:0 0 8px;color:#c8322c;font-size:12px;letter-spacing:2px;text-transform:uppercase">New website enquiry</p>
            <h1 style="margin:0;font-size:26px">Aasiana Aero Tech</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:11px;border-bottom:1px solid #e2dfe8;color:#6c6c6a">Name</td><td style="padding:11px;border-bottom:1px solid #e2dfe8"><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:11px;border-bottom:1px solid #e2dfe8;color:#6c6c6a">Company</td><td style="padding:11px;border-bottom:1px solid #e2dfe8">${safe.company}</td></tr>
            <tr><td style="padding:11px;border-bottom:1px solid #e2dfe8;color:#6c6c6a">Email</td><td style="padding:11px;border-bottom:1px solid #e2dfe8">${safe.email}</td></tr>
            <tr><td style="padding:11px;border-bottom:1px solid #e2dfe8;color:#6c6c6a">Phone</td><td style="padding:11px;border-bottom:1px solid #e2dfe8">${safe.phone}</td></tr>
            <tr><td style="padding:11px;border-bottom:1px solid #e2dfe8;color:#6c6c6a">Requirement</td><td style="padding:11px;border-bottom:1px solid #e2dfe8">${safe.service}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#f6f4f8;border-left:3px solid #c8322c;line-height:1.65">${safe.message}</div>
        </div>
      `,
    });

    if (error) {
      Sentry.captureException(error, { tags: { requestId, operation: "contact_email" } });
      console.error(JSON.stringify({ event: "contact_send_failed", requestId, durationMs: Date.now() - startedAt }));
      return NextResponse.json({ error: "The enquiry could not be sent. Please try again." }, { status: 502 });
    }

    console.info(JSON.stringify({
      event: "contact_send_succeeded",
      requestId,
      service,
      durationMs: Date.now() - startedAt,
    }));
    return NextResponse.json({ ok: true });
  } catch (error) {
    Sentry.captureException(error, { tags: { requestId, operation: "contact_api" } });
    console.error(JSON.stringify({ event: "contact_route_failed", requestId, durationMs: Date.now() - startedAt }));
    return NextResponse.json({ error: "The enquiry could not be sent. Please try again." }, { status: 500 });
  }
}
