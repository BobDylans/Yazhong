import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with Yazhong",
  description:
    "Have a question about custom-fit car seat covers or accessories? Chat with us on WhatsApp for the fastest response, or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
