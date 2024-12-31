interface Dish {
  name: string;
  quantity: number;
}

interface DishWithPrice extends Dish {
  price: number;
}

export type { Dish, DishWithPrice };
