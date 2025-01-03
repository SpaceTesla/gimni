import mongoose from 'mongoose';
import WelcomeDrink from '../models/WelcomeDrink';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gimni', {});
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedWelcomeDrinks = async () => {
  const welcomeDrinks = [
    {
      name: 'Jal Jeera',
      category: 'Other',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Fresh Lime Juice',
      category: 'Other',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
    {
      name: 'Lemon Mint Cooler',
      category: 'Other',
      diet: 'Veg',
      price: mongoose.Types.Decimal128.fromString('50.00'),
    },
  ];

  try {
    await WelcomeDrink.insertMany(welcomeDrinks);
    console.log('Welcome drinks seeded successfully!');
  } catch (error) {
    console.error('Error seeding Welcome Drinks:', error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await seedWelcomeDrinks();
  await mongoose.disconnect();
};

seedDatabase().then((r) => console.log('Seeding completed!\n', r));
