import type Option from '@/types/option';

interface Combo {
  name: string;
  price: number;
  image: string;
  options: Option[];
  // indian: Option;
  // chinese: Option;
  // birthdaySnackUp?: Option;
  // highTea?: Option;
  addOns?: Option;
}

export default Combo;
