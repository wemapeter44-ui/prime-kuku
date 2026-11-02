export const categories = ['Whole Chicken'];

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
    description: 'Raised on our farm and sold whole — cleaned, dressed and ready to cook.',
    available: true,
    image: '/logo.jpg', // Tumetumia jina halisi la picha yako
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
  {
    id: 'fresh-broiler',
    name: 'Fresh Whole Broiler Chicken',
    category: 'Whole Chicken',
    description: 'Fresh whole broiler chicken — tender, farm-raised and ready for the pot.',
    available: true,
    image: '/logo.jpg', // Picha hii inaweza kutumika tena kwa sasa
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
  {
    id: 'dressed-whole',
    name: 'Dressed Whole Chicken',
    category: 'Whole Chicken',
    description: 'Whole chicken, properly cleaned and dressed. Straight from our farm to your kitchen.',
    available: true,
    image: '/product.jpg', // Picha ya nyama mbichi
    sampleImage: 'whole',
    options: wholeChickenSizes,
  },
];

export const unitLabels = {
  bird: 'per bird',
};

export function optionLabel(option) {
  return option.label || unitLabels[option.unit];
}

export function formatPrice(price) {
  if (price === null || price === undefined) return 'Ask for price';
  return `KSh ${Number(price).toLocaleString('en-KE')}`;
}