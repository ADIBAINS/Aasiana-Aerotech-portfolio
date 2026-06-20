import type { ErrorEvent } from "@sentry/nextjs";

export function scrubSentryEvent(event: ErrorEvent) {
  event.user = undefined;

  if (event.request) {
    event.request.cookies = undefined;
    event.request.data = undefined;
    event.request.headers = undefined;
    event.request.query_string = undefined;
  }

  return event;
}
