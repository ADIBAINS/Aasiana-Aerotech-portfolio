import {
  BadgeCheck,
  BookOpenCheck,
  FileCheck2,
  FileCog,
  Globe2,
  PlaneLanding,
  RadioTower,
  ShieldCheck,
} from "lucide-react";

export const siteConfig = {
  name: "Aasiana Aerotech",
  shortName: "AA",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aasianaaerotech.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "New Delhi, India",
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS || "Monday–Saturday, 09:30–18:00 IST",
  linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/#clients" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    title: "Airworthiness Management",
    short: "Initial certification, continuing airworthiness, maintenance programmes and review readiness.",
    description:
      "Technical support across initial certification, continuing airworthiness, maintenance programme development, modification approvals and inspection readiness.",
    icon: BadgeCheck,
    items: ["Continuing airworthiness management", "Airworthiness review support", "Maintenance programme development", "Modification and repair approval coordination"],
  },
  {
    title: "DGCA & Regulatory Liaison",
    short: "Applications, representation and accountable follow-up with Indian aviation authorities.",
    description:
      "End-to-end preparation and coordination for DGCA, BCAS and related authority applications, queries, approvals and certification activity.",
    icon: RadioTower,
    items: ["DGCA applications and approvals", "BCAS coordination", "Regulatory representation", "Submission and query tracking"],
  },
  {
    title: "Landing & Overflight Permissions",
    short: "Landing rights, overflight permits, slots and special movement clearances.",
    description:
      "Operational permission support for international and domestic movements, coordinated against route, airport, aircraft and lead-time requirements.",
    icon: PlaneLanding,
    items: ["Landing rights and parking permits", "Overflight clearances", "Airport slot coordination", "Diplomatic and special movement support"],
  },
  {
    title: "Aircraft Induction & De-Registration",
    short: "Registration, technical acceptance, import, de-registration and export coordination.",
    description:
      "A controlled path for aircraft entering or leaving a fleet, covering regulatory documents, registration, technical acceptance and export requirements.",
    icon: FileCog,
    items: ["Aircraft registration support", "Import and technical acceptance", "Entry-into-service planning", "De-registration and export facilitation"],
  },
  {
    title: "Import & Export Clearance",
    short: "Documentation and authority coordination for cross-border aircraft activity.",
    description:
      "Practical support across aviation-specific import and export documentation, customs coordination and related clearances.",
    icon: Globe2,
    items: ["Aircraft and parts customs clearance", "Duty and exemption support", "DGFT licence coordination", "Temporary import and export documentation"],
  },
  {
    title: "Security Approvals (AVSEC)",
    short: "BCAS clearances, AVSEC documentation, audit preparation and renewals.",
    description:
      "Preparation and coordination of aviation security clearances and compliance programmes required by operators and aviation businesses.",
    icon: ShieldCheck,
    items: ["BCAS security clearances", "AVSEC programme documentation", "Security audit preparation", "Renewals and amendment coordination"],
  },
  {
    title: "Technical Documentation",
    short: "Clear, review-ready manuals, submissions and controlled aviation records.",
    description:
      "Development and review of technical documentation structured for operational use and regulatory scrutiny.",
    icon: BookOpenCheck,
    items: ["Operations and maintenance manuals", "Compliance statements", "Audit finding closure", "Regulatory submission packages"],
  },
  {
    title: "Regulatory Advisory",
    short: "Practical interpretation of requirements before they become bottlenecks.",
    description:
      "Early-stage guidance on approval paths, documentation dependencies and realistic regulatory timelines.",
    icon: FileCheck2,
    items: ["Requirement mapping", "Approval strategy", "Readiness assessment", "Regulatory updates"],
  },
];
