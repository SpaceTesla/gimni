import mongoose, { Schema, Document } from 'mongoose';

interface IStarter extends Document {
  name: string;
  category: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other';
  type: 'Starter';
  diet: 'Veg' | 'Non-Veg';
  price: mongoose.Types.Decimal128;
}

const StarterSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Bengali', 'Non-Bengali', 'Birthday Snack-Up', 'Other'], // Restricts the category
  },
  type: {
    type: String,
    required: true,
    enum: ['Starter'], // Only 'Starter' is valid
  },
  diet: { type: String, required: true, enum: ['Veg', 'Non-Veg'] },
  price: { type: Schema.Types.Decimal128, required: true, min: 0 },
});

const Starter = mongoose.model<IStarter>('Starter', StarterSchema);

export default Starter;
