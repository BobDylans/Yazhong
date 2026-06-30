export interface Testimonial {
  name: string;
  vehicle: string;
  text: string;
  rating: number;
  /** Optional avatar gradient class */
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "James M.",
    vehicle: "BMW X5 2024",
    text: "The custom-fit seat covers transformed my X5's interior. Installation took 15 minutes and the fit is absolutely perfect. Highly recommend!",
    rating: 5,
    avatar: "bg-amber-700",
  },
  {
    name: "Sarah K.",
    vehicle: "Mercedes C-Class 2023",
    text: "I was skeptical about ordering seat covers online, but the WhatsApp team helped me pick the perfect color and model. Looks better than OEM!",
    rating: 5,
    avatar: "bg-zinc-600",
  },
  {
    name: "Mike R.",
    vehicle: "Toyota RAV4 2025",
    text: "Floor mats are incredible quality. Raised edges caught a coffee spill perfectly. Easy to clean too. Will buy again for my second car.",
    rating: 5,
    avatar: "bg-stone-700",
  },
  {
    name: "Omar H.",
    vehicle: "Porsche Cayenne 2024",
    text: "Excellent craftsmanship on the steering wheel cover. The carbon fiber with gold stitch looks incredible in my Cayenne. Shipping was fast too!",
    rating: 5,
    avatar: "bg-amber-800",
  },
  {
    name: "Lisa C.",
    vehicle: "Honda CR-V 2025",
    text: "I love my new seat covers! The Madrid Beige matches my interior perfectly. The team helped me confirm fitment through WhatsApp — so easy.",
    rating: 5,
    avatar: "bg-zinc-700",
  },
  {
    name: "David L.",
    vehicle: "Ford F-150 2024",
    text: "Heavy-duty floor mats that actually fit. The custom-fit for my F-150 is spot on, and they handle mud and snow like a champ.",
    rating: 4,
    avatar: "bg-stone-800",
  },
];
