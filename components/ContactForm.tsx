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
        <label>Full name <span>*</span><input name="name" required autoComplete="name" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)} />{fieldErrors.name && <small className="field-error">{fieldErrors.name[0]}</small>}</label>
        <label>Company<input name="company" autoComplete="organization" placeholder="Organisation name" /></label>
      </div>
      <div className="field-row">
        <label>Email address <span>*</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(fieldErrors.email)} />{fieldErrors.email && <small className="field-error">{fieldErrors.email[0]}</small>}</label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label>
      </div>
      <label>Service required <span>*</span>
        <select name="service" required defaultValue={defaultService} aria-invalid={Boolean(fieldErrors.service)}>
          <option value="" disabled>Select a service</option>
          {services.map((service) => <option key={service.title}>{service.title}</option>)}
          <option>Other / Not sure</option>
        </select>
        {fieldErrors.service && <small className="field-error">{fieldErrors.service[0]}</small>}
      </label>
      <label>How can we assist? <span>*</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} placeholder="Briefly describe the aircraft, approval or operational requirement." aria-invalid={Boolean(fieldErrors.message)} />
        {fieldErrors.message && <small className="field-error">{fieldErrors.message[0]}</small>}
      </label>
      <label className="consent"><input name="consent" type="checkbox" required aria-invalid={Boolean(fieldErrors.consent)} /> <span>I consent to Aasiana Aerotech using these details to respond to my enquiry.</span></label>
      {fieldErrors.consent && <small className="field-error">{fieldErrors.consent[0]}</small>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={pending}>
        {pending ? <>Sending enquiry <LoaderCircle className="spin" size={17} /></> : <>Send enquiry <ArrowRight size={17} /></>}
      </button>
      <p className="form-note">Your message is submitted securely through this website. Required fields are marked with an asterisk.</p>
    </form>
  );
}
