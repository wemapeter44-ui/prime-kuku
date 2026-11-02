// PRIME KUKU - product catalogue (chicken meat only).
//
// HOW TO EDIT THIS FILE
// - available: true  -> shown on the website
// - available: false -> hidden (use this for anything not in stock)
// - image: null      -> a SAMPLE illustration is shown (prototype only)
//   image: '/images/my-photo.jpg' -> your real photo is shown instead
// - options: how the product is sold. unit can be 'bird', 'kg' or 'pack'.
//     label (optional): text shown on the button, e.g. '1.5 kg bird'
//     price: null  -> the site shows "Ask for price"
//     price: 450   -> the site shows KSh 450
// - Every product needs a unique id.
//
// IMPORTANT: availability and the prices for the cuts are still only
// STARTING EXAMPLES. Check each one against what you really sell.

export const categories = [
  'Whole Chicken',
  'Chicken Cuts',
];

// Whole chicken is priced by the size of the bird (price is per bird).
const wholeChickenSizes = [
  { unit: 'bird', label: '1 kg bird', price: 400 },
  { unit: 'bird', label: '1.5 kg bird', price: 500 },
  { unit: 'bird', label: '1.7 kg and above', price: 550 },
];

export const products = [
  {
    id: 'whole-farm-raised',
    name: 'Whole Farm-Raised Chicken',
    category: 'Whole Chicken',
    description: 'Farm-raised chicken, sold whole.',
    available: true,
    image: null,
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
  {
    id: 'fresh-broiler',
    name: 'Fresh Broiler Chicken',
    category: 'Whole Chicken',
    description: 'Fresh broiler chicken, tender and ready to cook.',
    available: true,
    image: null,
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
  {
    id: 'dressed-whole',
    name: 'Dressed Whole Chicken',
    category: 'Whole Chicken',
    description: 'Cleaned and dressed whole chicken.',
    available: true,
    image: null,
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'Chicken Cuts',
    description: 'Lean chicken breast.',
    available: true,
    image: null,
    sampleImage: 'breast',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings',
    category: 'Chicken Cuts',
    description: 'Fresh chicken wings.',
    available: true,
    image: null,
    sampleImage: 'wing',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
  {
    id: 'chicken-drumsticks',
    name: 'Chicken Drumsticks',
    category: 'Chicken Cuts',
    description: 'Juicy chicken drumsticks.',
    available: true,
    image: null,
    sampleImage: 'drumstick',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
  {
    id: 'chicken-thighs',
    name: 'Chicken Thighs',
    category: 'Chicken Cuts',
    description: 'Tender chicken thighs.',
    available: true,
    image: null,
    sampleImage: 'drumstick',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
  {
    id: 'chicken-leg-quarters',
    name: 'Chicken Leg Quarters',
    category: 'Chicken Cuts',
    description: 'Chicken leg quarters (thigh and drumstick together).',
    available: true,
    image: null,
    sampleImage: 'drumstick',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
  {
    id: 'chicken-pieces',
    name: 'Chicken Pieces and Cuts',
    category: 'Chicken Cuts',
    description: 'Mixed chicken pieces, cut to your preference.',
    available: true,
    image: null,
    sampleImage: 'pieces',
    options: [
      { unit: 'kg', price: null },
      { unit: 'pack', price: null },
    ],
  },
];

// Friendly labels for the units
export const unitLabels = {
  bird: 'per bird',
  kg: 'per kg',
  pack: 'per pack',
};

// Text shown for one selling option: its own label if it has one,
// otherwise the unit label (e.g. "per kg")
export function optionLabel(option) {
  return option.label || unitLabels[option.unit];
}

// Shows "KSh 450" or "Ask for price" when no price is set yet
export function formatPrice(price) {
  if (price === null || price === undefined) return 'Ask for price';
  return `KSh ${Number(price).toLocaleString('en-KE')}`;
}