import { pageMetadata } from "@/lib/seo";
import { FaqPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Contact Us — Get in Touch with Yazhong",
  description:
    "Have a question about custom-fit car seat covers or accessories? Chat with us on WhatsApp for the fastest response, or send us a message.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        NOTE: FAQ content duplicated from src/i18n/en.ts for JSON-LD.
        Update both if FAQ changes.
      */}
      <FaqPageSchema items={[
        {
          question: "How do I find the right fit for my vehicle?",
          answer: "Just tell us your car's make, model, and year on WhatsApp. We'll help you find the perfect match from our catalog of 500+ vehicle models.",
        },
        {
          question: "How long does shipping take?",
          answer: "Orders are processed within 24 hours. Standard shipping takes 5-8 business days. Express shipping (2-3 days) is available on request.",
        },
        {
          question: "Can I return if it doesn't fit?",
          answer: "Absolutely. We offer a 30-day easy return policy. If your custom-fit product doesn't match your vehicle, we'll make it right.",
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes! We ship to over 40 countries worldwide. Tracked shipping is included on all orders over $200.",
        },
      ]} />
      {children}
    </>
  );
}
