import axios from 'axios';
import { CartItem } from '@/context/cartContext';
import { useToast } from '@/hooks/use-toast';

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

  const { toast } = useToast();

  // Call the API route to send the email
  try {
    const response = await axios.post('/api/send-email', {
      userInfo,
      cartItems,
    });
    console.log(response.data.message);
    toast({
      title: 'Order placed successfully!',
      description: 'We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
