import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { Reveal } from "./Motion";

export function ServiceCard({ title, short, icon: Icon, index = 0 }: { title: string; short: string; icon: LucideIcon; index?: number }) {
  return (
    <Reveal className="service-card-motion" delay={(index % 3) * 0.08}>
      <article className="service-card">
        <div className="service-card__icon"><Icon size={25} strokeWidth={1.7} /></div>
        <h3>{title}</h3>
        <p>{short}</p>
        <Link href="/services">Explore service <ArrowUpRight size={15} /></Link>
      </article>
    </Reveal>
  );
}
