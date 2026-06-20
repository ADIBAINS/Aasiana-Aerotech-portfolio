import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Handshake, Shield } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "About",
  description: "Aasiana Aerotech provides aviation regulatory and technical consultancy — airworthiness, DGCA liaison, aircraft induction and flight permissions.",
  openGraph: {
    title: "About | Aasiana Aerotech",
    description: "A focused partner for aviation's most exacting regulatory and technical processes.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="A focused partner for aviation’s most exacting processes." text="Aasiana Aerotech is built around one objective: making technical and regulatory work clearer, more controlled and easier to act on." />
      <section className="section">
        <div className="container split-heading about-intro">
          <div><p className="eyebrow">Our purpose</p><h2>Good coordination starts with technical understanding.</h2></div>
          <div className="intro__copy">
            <p>Aircraft owners and operators often face approval paths involving multiple authorities, detailed records and fixed operational timelines. A missed dependency can affect the entire programme.</p>
            <p>We connect technical requirements with disciplined regulatory coordination, helping clients maintain visibility from initial assessment through closure.</p>
          </div>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container">
          <div className="values-grid">
            {[
              [Shield, "Integrity first", "Advice must be technically defensible and compliant, even when the answer is operationally inconvenient."],
              [Handshake, "Working partnership", "We work alongside the operator’s technical and operations teams instead of treating approvals as detached paperwork."],
              [Cpu, "Technical rigour", "Every submission is approached with the same precision expected in aircraft engineering and maintenance records."],
            ].map(([Icon, title, text]) => {
              const ValueIcon = Icon as typeof Shield;
              return <article className="value-card" key={title as string}><ValueIcon /><h3>{title as string}</h3><p>{text as string}</p></article>;
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container operating-grid">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2>A disciplined operating model.</h2>
            <p>Our work is designed to give clients a reliable view of progress, risk and next action.</p>
          </div>
          <div className="principles">
            {[
              ["Understand before acting", "We establish the technical context and authority dependencies before defining the approval route."],
              ["Document every requirement", "We use structured checklists and controlled records to reduce omissions and rework."],
              ["Communicate the real status", "Updates focus on completed work, open actions, blockers and accountable next steps."],
              ["Protect client information", "Aircraft records and business information are handled with appropriate confidentiality."],
            ].map(([title, text]) => <div className="principle" key={title}><CheckCircle2 /><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="experience-band">
        <div className="container experience-band__inner">
          <div><p className="eyebrow eyebrow--light">Company credentials</p><h2>Experience and leadership details can be added here.</h2><p>This section is intentionally reserved for verified founder biographies, certifications, memberships and project milestones.</p></div>
          <span className="editable-badge">Editable content placeholder</span>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta"><div><h2>Need support on a current aviation matter?</h2><p>Share the requirement and current status. We will help frame the next steps.</p></div><Link href="/contact" className="button">Contact us <ArrowRight size={17} /></Link></div>
      </section>
    </>
  );
}
