import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().min(1, "Select the service you need.").max(120),
  message: z.string().trim().min(10, "Provide at least 10 characters about the requirement.").max(4000),
  consent: z.literal("on", { error: "Consent is required before submitting." }),
  website: z.string().trim().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
