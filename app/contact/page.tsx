import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { services, siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Aasiana Aerotech for aviation compliance, airworthiness, and regulatory clearance support in India.",
  openGraph: {
    title: "Contact | Aasiana Aerotech",
    description: "Tell us what needs to move forward. Share the aircraft, approval or operational requirement.",
  },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const requestedService = (await searchParams).service || "";
  const defaultService = services.some((service) => service.title === requestedService) ? requestedService : "";
  const whatsappText = encodeURIComponent("Hello Aasiana Aerotech, I would like to discuss an aviation requirement.");
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what needs to move forward." text="Share the aircraft, approval or operational requirement. We will review the context and respond with the appropriate next step." />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-details">
            <p className="eyebrow">Get in touch</p>
            <h2>Direct, practical assistance.</h2>
            <p>For time-sensitive movement permissions, include the aircraft type, route, proposed date and current documentation status.</p>
            <div className="contact-list">
              <a href={`mailto:${siteConfig.email}`}><span><Mail /></span><div><small>Email</small><strong>{siteConfig.email}</strong></div></a>
              {siteConfig.phoneHref && siteConfig.phone && <a href={`tel:${siteConfig.phoneHref}`}><span><Phone /></span><div><small>Telephone</small><strong>{siteConfig.phone}</strong></div></a>}
              {siteConfig.whatsapp && <a href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer"><span><MessageCircle /></span><div><small>WhatsApp</small><strong>Start a conversation</strong></div></a>}
              <div><span><MapPin /></span><div><small>Office</small><strong>{siteConfig.address}</strong></div></div>
              <div><span><Clock3 /></span><div><small>Working hours</small><strong>{siteConfig.hours}</strong></div></div>
            </div>
            <div className="contact-response"><span>Response protocol</span><strong>Operational enquiries are reviewed against urgency, proposed movement date and documentation status.</strong></div>
          </div>
          <div className="form-panel">
            <p className="eyebrow">Enquiry form</p>
            <h2>Brief us on your requirement.</h2>
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </section>
    </>
  );
}
