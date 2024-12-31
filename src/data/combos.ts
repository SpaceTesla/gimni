import Combo from '@/types/combo';

const combos: Combo[] = [
  {
    name: 'Combo 1',
    price: 150,
    image: '/food.png',
    veg: [
      { name: 'White Rice/Jeera Rice', quantity: 1 },
      { name: 'Mix Veg', quantity: 1 },
      { name: 'Dal', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Salad', quantity: 1 },
    ],
    nonVeg: [
      { name: 'White Rice/Jeera Rice', quantity: 1 },
      { name: 'Chicken Masala', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Salad', quantity: 1 },
    ],
  },
  {
    name: 'Combo 2',
    price: 250,
    image: '/food.png',
    veg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Veg Starter', quantity: 1 },
      { name: 'Veg Gravy', quantity: 1 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
    ],
    nonVeg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Non-veg Starter', quantity: 1 },
      { name: 'Non-veg Gravy', quantity: 1 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
    ],
  },
  {
    name: 'Combo 3',
    price: 350,
    image: '/food.png',
    veg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Veg Starter', quantity: 2 },
      { name: 'Veg Gravy', quantity: 1 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
    ],
    nonVeg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Non-veg Starter', quantity: 2 },
      { name: 'Non-veg Gravy', quantity: 1 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
    ],
    addOns: [{ name: 'Mutton', quantity: 1, price: 90 }],
  },
  {
    name: 'Combo 4',
    price: 450,
    image: '/food.png',
    veg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Veg Starter', quantity: 2 },
      { name: 'Veg Gravy', quantity: 2 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Chutney', quantity: 1 },
    ],
    nonVeg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Non-veg Starter', quantity: 2 },
      { name: 'Non-veg Gravy', quantity: 2 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Chutney', quantity: 1 },
    ],
    addOns: [{ name: 'Mutton', quantity: 1, price: 90 }],
  },
  {
    name: 'Combo 5',
    price: 550,
    image: '/food.png',
    veg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Veg Starter', quantity: 3 },
      { name: 'Veg Gravy', quantity: 3 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Chutney', quantity: 1 },
    ],
    nonVeg: [
      { name: 'Rice', quantity: 2 },
      { name: 'Roti', quantity: 1 },
      { name: 'Non-veg Starter', quantity: 3 },
      { name: 'Non-veg Gravy', quantity: 3 },
      { name: 'Dal', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Sweet', quantity: 1 },
      { name: 'Papad', quantity: 1 },
      { name: 'Chutney', quantity: 1 },
    ],
    addOns: [{ name: 'Mutton', quantity: 1, price: 90 }],
  },
];

export default combos;
