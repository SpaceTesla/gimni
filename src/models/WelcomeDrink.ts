import mongoose, { Schema, Document } from 'mongoose';

interface IWelcomeDrink extends Document {
  name: string;
  category: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other';
  diet: 'Veg' | 'Non-Veg';
  price: mongoose.Types.Decimal128;
}

const WelcomeDrinkSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Bengali', 'Non-Bengali', 'Birthday Snack-Up', 'Other'], // Restricts the category values
  },
  diet: { type: String, required: true, enum: ['Veg', 'Non-Veg'] },
  price: { type: Schema.Types.Decimal128, required: true, min: 0 },
});

const WelcomeDrink = mongoose.model<IWelcomeDrink>(
  'WelcomeDrink',
  WelcomeDrinkSchema,
);

export default WelcomeDrink;
