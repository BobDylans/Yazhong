/**
 * Central site configuration
 * All components should import from here, not hardcode values.
 */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15138009985";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi! I'm interested in your products. Can you help?";

export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappProductUrl(productTitle: string): string {
  return whatsappUrl(`Hi! I'm interested in: ${productTitle}`);
}
