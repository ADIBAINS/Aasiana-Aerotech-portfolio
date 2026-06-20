const defaultSiteUrl = "https://www.aasianaaerotech.in";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    return new URL(configuredUrl || defaultSiteUrl);
  } catch {
    return new URL(defaultSiteUrl);
  }
}
