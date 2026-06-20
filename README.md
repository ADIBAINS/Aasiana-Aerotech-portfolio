# Aasiana Aero Tech portfolio

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Contact form

The form sends directly from the Next.js server through Resend. Configure:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` using a sender on your verified domain
- `CONTACT_TO_EMAIL` as the company inbox receiving enquiries

The API key remains server-side. The contact route validates and normalizes input with Zod, returns field-level errors, includes a spam honeypot, sends plain-text and HTML versions, and sets the visitor’s email as the reply-to address.

## Analytics and observability

- Vercel Web Analytics records page traffic and the `contact_form_submitted` / `contact_form_failed` conversion events.
- Vercel Speed Insights records production Core Web Vitals.
- Sentry records browser, server, routing, and API failures when its environment variables are configured.
- The contact API emits JSON logs with a request ID, outcome, service category, and duration. It never logs the visitor’s message or contact details.

Enable Analytics and Speed Insights in the Vercel project dashboard. For Sentry, create a Next.js project and copy the values listed in `.env.example` into the deployment environment.

### Sentry setup on Vercel

1. Use the Sentry Next.js project `adil-bains/aasiana-aerotech`.
2. In Sentry, copy the project DSN and create an organization auth token that can upload release artifacts and source maps.
3. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN`, `SENTRY_ORG=adil-bains`, `SENTRY_PROJECT=aasiana-aerotech`, and `SENTRY_AUTH_TOKEN`.
4. Apply the DSN values to Preview and Production. Keep `SENTRY_AUTH_TOKEN` server/build-only; never rename it with a `NEXT_PUBLIC_` prefix.
5. Deploy once, then verify that a deliberately triggered preview error appears in Sentry with readable application source lines. Remove the trigger before production.
6. Configure Sentry alerts for new issues, regressions, and failures tagged with `operation=contact_api` or `operation=contact_email`.

The integration samples 10% of performance traces, excludes default PII, and strips users, request bodies, cookies, headers, and query strings before sending error events.

### Vercel production configuration

- Set `NEXT_PUBLIC_SITE_URL=https://www.aasianaaerotech.in` once the final domain is confirmed.
- Enable Web Analytics and Speed Insights in the Vercel dashboard.
- Add a Vercel Firewall rate-limit rule matching method `POST` and path `/api/contact`. Start with 5 requests per minute per IP, return `429`, and monitor legitimate traffic before tightening it.
- Add all Resend and public contact variables from `.env.example`.
- Verify the Resend sending domain before using it in `CONTACT_FROM_EMAIL`.
