import axios from 'axios';
import { CartItem } from '@/context/cartContext';

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  numberOfPeople: number;
  occasion: string;
  date: Date;
}

export const handleCheckout = async (
  userInfo: UserInfo,
  cartItems: CartItem[],
) => {
  console.log('User Info:', userInfo);
  console.log('Cart Items:', cartItems);

  // Call the API route to send the email
  try {
    const response = await axios.post('/api/send-email', {
      userInfo,
      cartItems,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
