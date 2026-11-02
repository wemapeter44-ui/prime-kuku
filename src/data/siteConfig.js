// PRIME KUKU - site-wide settings.
// Edit the text here and it updates everywhere on the site.

export const siteConfig = {
  brandName: 'PRIME KUKU',
  tagline: 'Fresh From Our Farm. Quality On Your Table.',

  // Read from .env.local (VITE_WHATSAPP_NUMBER). Never type secrets here.
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
};