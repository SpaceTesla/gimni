interface Dish {
  name: string;
  quantity: number;
  price?: number;
}

interface Option {
  type: string;
  veg: Dish[];
  nonVeg: Dish[];
}

export default Option;
