import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const faqs = [
  {
    q: "How can I order?",
    a: "Select your vehicle details on our home page, choose your desired series and color, click 'Add to cart', and proceed to checkout.",
  },
  {
    q: "Will these mats fit my car?",
    a: "Absolutely! Our mats come with a perfect fit guarantee. If they don't fit, we provide a free replacement. If the replacement still doesn't work, we'll issue a full refund.",
  },
  {
    q: "How do you guarantee the perfect fit?",
    a: "Our luxury car mats are made to order and laser-cut using factory measurements of your car manufacturer. We use advanced 3D laser scanning for 100% accuracy.",
  },
  {
    q: "How to install?",
    a: "Installation is quick and easy. No special tools or skills are required. Simply place the mats in your vehicle and secure them with the built-in retention clips.",
  },
  {
    q: "How to clean?",
    a: "Simply wipe with a microfiber cloth and soapy water. Vacuuming is not needed in most cases. DO NOT machine wash or machine dry.",
  },
  {
    q: "Are Luxus Car Mats all-weather?",
    a: "Yes, our mats can be used in the harshest weather conditions and protect up to 95% of your vehicle's floor from mud, dirt, snow and more.",
  },
  {
    q: "What are Luxus Car Mats made of?",
    a: "We use only the highest-quality synthetic eco-leather. Premium materials that are durable, easy to clean, and built to last.",
  },
  {
    q: "What is the shipping cost?",
    a: "We offer free shipping on 90% of territories including the US, UK, Canada, Australia, and Europe. A shipping fee applies for other countries.",
  },
  {
    q: "What is your return policy?",
    a: "If the mats don't fit, you'll receive a free replacement. If the replacement still doesn't fit, you'll receive a full refund.",
  },
  {
    q: "Is there a warranty?",
    a: "Yes, we offer a standard 2-year warranty on all products. Double Layer and Twin-Diamond Series come with a Lifetime Warranty.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Support</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h1>
            <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
              Everything you need to know about Luxus Car Mats.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto px-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/5 py-5">
                <summary className="flex items-center justify-between cursor-pointer text-white font-medium hover:text-gold transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="text-sm">{faq.q}</span>
                  <span className="text-gold text-lg transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-white/40 leading-relaxed pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="pb-20 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-xl font-bold text-white">Still have questions?</h2>
            <p className="mt-2 text-sm text-white/40">Contact us on WhatsApp and we&apos;ll get back to you.</p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-gold text-black px-6 py-2.5 text-sm font-semibold hover:bg-[#b8742f] transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
