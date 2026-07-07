import type { Locale } from "@/i18n/LocaleProvider";

export interface Testimonial {
  name: string;
  vehicle: string;
  text: string;
  rating: number;
  /** Optional avatar gradient class */
  avatar?: string;
}

const en: Testimonial[] = [
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

const ar: Testimonial[] = [
  {
    name: "جيمس م.",
    vehicle: "BMW X5 2024",
    text: "غطسات المقاعد المفصلة حسب الطلب غيّرت مقصورة سيارتي بالكامل. التركيب استغرق 15 دقيقة والملاءمة مثالية تماماً. أنصح بشدة!",
    rating: 5,
    avatar: "bg-amber-700",
  },
  {
    name: "سارة ك.",
    vehicle: "Mercedes C-Class 2023",
    text: "كنت مترددة في طلب غطسات مقاعد عبر الإنترنت، لكن فريق واتساب ساعدني في اختيار اللون والموديل المثالي. النتيجة أفضل من الأصلي!",
    rating: 5,
    avatar: "bg-zinc-600",
  },
  {
    name: "مايك ر.",
    vehicle: "Toyota RAV4 2025",
    text: "دواسات الأرضية بجودة رائعة. الحواف المرتفعة أمسكت انسكاب القهوة بشكل مثالي. سهلة التنظيف أيضاً. سأشتري مرة أخرى لسيارتي الثانية.",
    rating: 5,
    avatar: "bg-stone-700",
  },
  {
    name: "عمر ح.",
    vehicle: "Porsche Cayenne 2024",
    text: "حرفية ممتازة في غطاء المقود. ألياف الكربون مع الخياطة الذهبية تبدو رائعة في سيارتي. الشحن كان سريعاً أيضاً!",
    rating: 5,
    avatar: "bg-amber-800",
  },
  {
    name: "ليزا س.",
    vehicle: "Honda CR-V 2025",
    text: "أحب غطسات مقاعدي الجديدة! لون البيج يطابق مقصورتي بشكل مثالي. ساعدني الفريق في تأكيد الملاءمة عبر واتساب — سهل جداً.",
    rating: 5,
    avatar: "bg-zinc-700",
  },
  {
    name: "ديفيد ل.",
    vehicle: "Ford F-150 2024",
    text: "دواسات أرضية متينة تناسب سيارتي تماماً. الملاءمة لسيارتي F-150 دقيقة، وتتحمل الطين والثلج ببراعة.",
    rating: 4,
    avatar: "bg-stone-800",
  },
];

export const testimonialsByLocale: Record<Locale, Testimonial[]> = { en, ar };

/** Default export for backward compatibility (English) */
export const testimonials = en;
