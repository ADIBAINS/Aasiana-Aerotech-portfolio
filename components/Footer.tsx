import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navigation, services, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Technical clarity for airworthy, compliant and operational aviation.</p>
        </div>
        <div>
          <h3>Navigate</h3>
          <div className="footer-links">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h3>Core services</h3>
          <div className="footer-links">
            {services.slice(0, 4).map((service) => <Link key={service.title} href="/services">{service.title}</Link>)}
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <div className="footer-links footer-contact">
            <a href={`mailto:${siteConfig.email}`}><Mail size={16} />{siteConfig.email}</a>
            {siteConfig.phoneHref && siteConfig.phone && <a href={`tel:${siteConfig.phoneHref}`}><Phone size={16} />{siteConfig.phone}</a>}
            <span><MapPin size={16} />{siteConfig.address}</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Aasiana Aerotech. All rights reserved.</p>
        <p>Privacy-conscious analytics and secure enquiry handling.</p>
        {siteConfig.linkedIn && <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" aria-label="Aasiana Aerotech on LinkedIn">LinkedIn <ArrowUpRight size={14} /></a>}
      </div>
    </footer>
  );
}
