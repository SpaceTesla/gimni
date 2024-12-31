import { Dish, DishWithPrice } from './dish';

interface Combo {
  name: string;
  price: number;
  image: string;
  veg: Dish[];
  nonVeg: Dish[];
  addOns?: DishWithPrice[];
}

export default Combo;
