import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <p className="eyebrow">404</p>
      <h1>This page could not be found.</h1>
      <p>The link may be incorrect or the page may have been moved.</p>
      <Link href="/" className="button">Back to home</Link>
    </main>
  );
}
