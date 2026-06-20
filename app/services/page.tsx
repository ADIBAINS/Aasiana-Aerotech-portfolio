import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/site";

export const metadata = {
  title: "Services",
  description: "Aviation compliance services — airworthiness management, DGCA liaison, landing & overflight permits, aircraft induction, security approvals, and more.",
  openGraph: {
    title: "Services | Aasiana Aerotech",
    description: "Integrated support from technical review to regulatory clearance across the full aviation approval lifecycle.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Integrated support from technical review to regulatory clearance." text="Choose targeted assistance for a specific approval or structured support across the full aircraft and operational lifecycle." />
      <section className="section">
        <div className="container detailed-services">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article className="detailed-service" key={service.title}>
                <div className="detailed-service__number">{String(index + 1).padStart(2, "0")}</div>
                <div className="detailed-service__icon"><Icon /></div>
                <div className="detailed-service__body">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                </div>
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`} aria-label={`Enquire about ${service.title}`}><ArrowRight /></Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="service-note">
        <div className="container service-note__inner">
          <div><p className="eyebrow eyebrow--light">Not sure where to begin?</p><h2>Start with the operational outcome.</h2></div>
          <p>Tell us what needs to fly, import, register, renew or clear. We can help identify the likely workstream and documentation path.</p>
          <Link href="/contact" className="button button--white">Discuss your case <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
