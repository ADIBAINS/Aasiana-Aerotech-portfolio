import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="container page-hero__content">
        <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={14} /><span>{eyebrow}</span></div>
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
