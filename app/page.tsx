import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, FileSearch, Headphones, Route, ShieldCheck } from "lucide-react";
import { AircraftBlueprint, FlightPathGraphic } from "@/components/AviationGraphics";
import { HeroItem, HeroMotion, Reveal } from "@/components/Motion";
import { services } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image src="/images/aviation-hero.png" alt="Business aircraft inside a modern maintenance hangar" fill priority className="hero__image" sizes="100vw" />
        <div className="hero__veil" />
        <div className="hero__lines" aria-hidden="true" />
        <div className="container hero__content">
          <HeroMotion className="hero__copy">
            <HeroItem><p className="eyebrow eyebrow--light">Aviation regulatory & technical consultancy</p></HeroItem>
            <HeroItem><h1>Aircraft ready.<br /><em>Permissions clear.</em></h1></HeroItem>
            <HeroItem><p className="hero__lead">We coordinate the technical records, authority submissions and operational clearances between an aircraft and its next movement.</p></HeroItem>
            <HeroItem><div className="hero__actions">
              <Link href="/contact" className="button button--white">Discuss your requirement <ArrowRight size={17} /></Link>
              <Link href="/services" className="button-link">Explore capabilities <ChevronDown size={17} /></Link>
            </div></HeroItem>
          </HeroMotion>
          <div className="hero__status">
            <span className="pulse" />
            <div><small>Operational support</small><strong>Across India & international routes</strong></div>
          </div>
        </div>
        <div className="hero__rail">
          <div className="container hero__rail-inner">
            <span>Airworthiness</span><i /><span>Permissions</span><i /><span>Compliance</span><i /><span>Aircraft induction</span>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="container split-heading">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2>The file, the aircraft<br />and the authority.</h2>
          </Reveal>
          <Reveal className="intro__copy" delay={0.1}>
            <p>An approval file is only useful when it reflects the aircraft, satisfies the authority and arrives before the operational deadline.</p>
            <p>Aasiana Aerotech keeps those three realities aligned—from first document review to final permission.</p>
            <Link href="/about" className="text-link">About Aasiana Aerotech <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section media-story">
        <div className="container media-story__grid">
          <Reveal className="media-card">
            <Image
              src="/images/airworthiness-inspection.png"
              alt="Aviation engineer inspecting a business aircraft"
              fill
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <span className="media-card__label">Airworthiness support</span>
          </Reveal>
          <Reveal className="media-story__copy" delay={0.12}>
            <FlightPathGraphic className="flight-path-svg" />
            <p className="eyebrow">From aircraft to authority</p>
            <h2>Every detail connected.</h2>
            <p>Technical records, inspections, submissions and permissions are treated as one connected approval path—not isolated tasks.</p>
            <div className="mini-metrics">
              <div><strong>01</strong><span>Technical review</span></div>
              <div><strong>02</strong><span>Authority coordination</span></div>
              <div><strong>03</strong><span>Approval closure</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Core capabilities</p><h2>One partner across the<br />approval lifecycle.</h2></div>
            <p>Focused support at the intersection of aircraft technical requirements, operational permissions and regulatory process.</p>
          </div>
          <div className="capability-index">
            {services.slice(0, 6).map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal className="capability-row" key={service.title} delay={(index % 3) * .05}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={21} strokeWidth={1.6} />
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <ArrowRight size={18} />
                </Reveal>
              );
            })}
          </div>
          <div className="center-action"><Link href="/services" className="button button--outline">View all services <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="section process">
        <AircraftBlueprint className="process-blueprint" />
        <div className="container process-grid">
          <Reveal className="process-title">
            <p className="eyebrow eyebrow--light">How we work</p>
            <h2>A clear route through complex requirements.</h2>
            <p>Each engagement is structured around visibility, ownership and timely action.</p>
            <Link href="/contact" className="button button--white">Start a conversation <ArrowRight size={17} /></Link>
          </Reveal>
          <Reveal className="steps" delay={0.12}>
            {[
              ["01", "Assess", "Review the requirement, aircraft status, timelines and authority dependencies.", FileSearch],
              ["02", "Map", "Define the approval route, documentation set, responsibilities and critical dates.", Route],
              ["03", "Coordinate", "Prepare submissions and maintain focused communication with stakeholders.", Headphones],
              ["04", "Close", "Track queries, complete actions and deliver an organised approval record.", ShieldCheck],
            ].map(([number, title, text, Icon]) => {
              const StepIcon = Icon as typeof FileSearch;
              return <div className="step" key={number as string}><span>{number as string}</span><StepIcon /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>;
            })}
          </Reveal>
        </div>
      </section>

      <section className="section assurance">
        <div className="container assurance-grid">
          <Reveal className="assurance-visual">
            <Image
              src="/images/aviation-documentation.png"
              alt="Aviation technical documentation being reviewed"
              fill
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 50vw"
              className="assurance-photo"
            />
            <div className="assurance-card"><ShieldCheck /><small>Our approach</small><strong>Documentation-led.<br />Deadline-aware.</strong></div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow">Why Aasiana</p>
            <h2>Built for work where detail matters.</h2>
            <p>We bring an operator-minded approach to regulatory coordination. That means understanding what is required, what can delay it and what needs to happen next.</p>
            <ul className="check-list">
              {["Single point of coordination", "Clear documentation checklists", "Proactive status communication", "Confidential handling of records"].map((item) => <li key={item}><Check size={16} />{item}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <div><p className="eyebrow eyebrow--light">Have an active requirement?</p><h2>Let&apos;s establish the clearest path to approval.</h2></div>
          <Link href="/contact" className="button button--white">Speak with our team <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
