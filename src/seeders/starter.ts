import mongoose from 'mongoose';
import Starter from '../models/Starter';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bengali_cuisine', {});
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedStarters = async () => {
  const starters = [
    // Veg @ 40
    {
      name: 'Veg Cutlet',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Gobi Manchurian',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Veg Manchurian',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Potato Chilli',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'French Fries',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Green Peas Garlic Fry',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Beguni (Brinjal) Pakoda',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Pyaji (Onion) Pakoda',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Kach Kolar (Raw Banana) Cutlet',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Babycorn Manchurian',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Aloo Chop',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Aloo Samosa',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Dahi Bara',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },
    {
      name: 'Ghugni',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('40.00'),
    },

    // Veg @ 80
    {
      name: 'Paneer Cutlet',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('80.00'),
    },
    {
      name: 'Paneer Chilly',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('80.00'),
    },
    {
      name: 'Mushroom Manchurian',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('80.00'),
    },
    {
      name: 'Mushroom Pepper',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('80.00'),
    },
    {
      name: 'Paneer 65',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('80.00'),
    },

    // Non-Veg @ 50
    {
      name: 'Diimer (Egg) Devil',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Keema Ghugni',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Jeera Aloo',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Dhaniya Aloo',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Egg Chilli',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },

    // Non-Veg @ 75
    {
      name: 'Chicken Cutlet',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Fish Cutlet',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Chicken Manchurian',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Chicken Chilli',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Pepper Chicken',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Chicken Lolly Pop',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Chicken Pakora',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Fish Chilli',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Fish Fry',
      category: 'Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
    {
      name: 'Garlic Chicken',
      category: 'Non-Bengali',
      type: 'Starter',
      diet: 'Non-Veg',
      price: mongoose.Types.Decimal128.fromString('75.00'),
    },
  ];

  try {
    await Starter.insertMany(starters);
    console.log('Starters seeded successfully!');
  } catch (error) {
    console.error('Error seeding Starters:', error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await seedStarters();
  mongoose.disconnect();
};

seedDatabase();
