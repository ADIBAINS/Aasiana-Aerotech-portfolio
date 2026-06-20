import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? "logo--light" : ""}`} aria-label="Aasiana Aerotech home">
      <Image
        src="/images/aasiana-logo.png"
        alt="Aasiana Aero Tech (P) Ltd."
        width={1420}
        height={175}
        priority
        className="logo__image"
      />
    </Link>
  );
}
