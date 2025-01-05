interface MenuItem {
  id: string;
  name: string;
  category: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other';
  type:
    | 'Welcome Drink'
    | 'Starter'
    | 'Bhaja'
    | 'Rice'
    | 'Bread'
    | 'Main Course Gravy'
    | 'Main Course Dal'
    | 'Chutney & Sides'
    | 'Dessert';
  diet: 'Veg' | 'Non-Veg';
  price: number;
  quantity: number;
  selected?: string[];
  options: string[];
}

export default MenuItem;
