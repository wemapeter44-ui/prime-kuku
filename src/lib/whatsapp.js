// PRIME KUKU - WhatsApp ordering helpers.
// WhatsApp has an official link format: https://wa.me/<number>?text=<message>
// Opening it launches WhatsApp with the message already typed out.

import { siteConfig } from '../data/siteConfig';
import { optionLabel, formatPrice } from '../data/products';

// Cleans a number into the format WhatsApp wants (e.g. 254712345678)
function cleanNumber(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '254' + digits.slice(1);
  if (digits.length === 9) digits = '254' + digits;
  return digits;
}

// Builds a link that opens WhatsApp with the given message
export function buildWhatsAppLink(message) {
  const number = cleanNumber(siteConfig.whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Message for ordering one product in one selling option
export function buildProductMessage(product, option) {
  const priceText = formatPrice(option.price);
  return (
    `Hello PRIME KUKU, I would like to order:\n` +
    `${product.name} - ${optionLabel(option)}\n` +
    `Price: ${priceText}\n` +
    `Please confirm availability and delivery details. Thank you.`
  );
}

// General enquiry message
export function buildGeneralMessage() {
  return 'Hello PRIME KUKU, I would like to place an order. Please share what is available today.';
}