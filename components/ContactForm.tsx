"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import * as Sentry from "@sentry/nextjs";
import { services } from "@/lib/site";

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setPending(true);
    setError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        const responseError = new Error(result.error || "Unable to send your enquiry.");
        if (response.status >= 500) {
          track("contact_form_failed", { reason: "server" });
          Sentry.captureException(responseError, { tags: { operation: "contact_form", status: response.status } });
        }
        setError(responseError.message);
        return;
      }
      track("contact_form_submitted", { service: String(data.service || "unknown") });
      setSent(true);
      form.reset();
    } catch (submissionError) {
      track("contact_form_failed", { reason: "network" });
      Sentry.captureException(submissionError, { tags: { operation: "contact_form", status: "network" } });
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send your enquiry.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success">
        <CheckCircle2 size={42} />
        <h2>Enquiry received.</h2>
        <p>Your message was sent directly to the Aasiana Aerotech team. A representative can reply to the email address you provided.</p>
        <button className="text-button" onClick={() => setSent(false)}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="field-row">
        <label htmlFor="contact-name"><span className="field-label">Full name <b>*</b></span><input id="contact-name" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "contact-name-error" : undefined} />{fieldErrors.name && <small id="contact-name-error" className="field-error">{fieldErrors.name[0]}</small>}</label>
        <label htmlFor="contact-company"><span className="field-label">Company</span><input id="contact-company" name="company" maxLength={120} autoComplete="organization" placeholder="Organisation name" aria-invalid={Boolean(fieldErrors.company)} aria-describedby={fieldErrors.company ? "contact-company-error" : undefined} />{fieldErrors.company && <small id="contact-company-error" className="field-error">{fieldErrors.company[0]}</small>}</label>
      </div>
      <div className="field-row">
        <label htmlFor="contact-email"><span className="field-label">Email address <b>*</b></span><input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" placeholder="you@company.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "contact-email-error" : undefined} />{fieldErrors.email && <small id="contact-email-error" className="field-error">{fieldErrors.email[0]}</small>}</label>
        <label htmlFor="contact-phone"><span className="field-label">Phone number</span><input id="contact-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" placeholder="+91 00000 00000" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined} />{fieldErrors.phone && <small id="contact-phone-error" className="field-error">{fieldErrors.phone[0]}</small>}</label>
      </div>
      <label htmlFor="contact-service"><span className="field-label">Service required <b>*</b></span>
        <select id="contact-service" name="service" required defaultValue={defaultService} aria-invalid={Boolean(fieldErrors.service)} aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}>
          <option value="" disabled>Select a service</option>
          {services.map((service) => <option key={service.title}>{service.title}</option>)}
          <option>Other / Not sure</option>
        </select>
        {fieldErrors.service && <small id="contact-service-error" className="field-error">{fieldErrors.service[0]}</small>}
      </label>
      <label htmlFor="contact-message"><span className="field-label">How can we assist? <b>*</b></span>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} placeholder="Briefly describe the aircraft, approval or operational requirement." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "contact-message-error" : "contact-message-hint"} />
        {fieldErrors.message ? <small id="contact-message-error" className="field-error">{fieldErrors.message[0]}</small> : <small id="contact-message-hint" className="field-hint">Include route and proposed date for time-sensitive movement requests.</small>}
      </label>
      <label className="consent" htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "contact-consent-error" : undefined} /> <span>I consent to Aasiana Aerotech using these details to respond to my enquiry.</span></label>
      {fieldErrors.consent && <small id="contact-consent-error" className="field-error">{fieldErrors.consent[0]}</small>}
      {error && <p className="form-error" role="alert" aria-live="polite">{error}</p>}
      <button className="button" type="submit" disabled={pending}>
        {pending ? <>Sending enquiry <LoaderCircle className="spin" size={17} /></> : <>Send enquiry <ArrowRight size={17} /></>}
      </button>
      <p className="form-note">Your message is submitted securely through this website. Required fields are marked with an asterisk.</p>
    </form>
  );
}
