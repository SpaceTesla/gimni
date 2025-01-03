import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the Menu schema
export interface IMenu extends Document {
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
  price: mongoose.Types.Decimal128;
}

const MenuSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Bengali', 'Non-Bengali', 'Birthday Snack-Up', 'Other'],
    },
    type: {
      type: String,
      required: true,
      enum: [
        'Welcome Drink',
        'Starter',
        'Bhaja',
        'Rice',
        'Bread',
        'Main Course Gravy',
        'Main Course Dal',
        'Chutney & Sides',
        'Dessert',
      ],
    },
    diet: { type: String, required: true, enum: ['Veg', 'Non-Veg'] },
    price: { type: Schema.Types.Decimal128, required: true, min: 0 },
  },
  { timestamps: true }, // Adds createdAt and updatedAt
);

// Export the Mongoose model
const Menu = mongoose.model<IMenu>('Menu', MenuSchema);

export default Menu;
