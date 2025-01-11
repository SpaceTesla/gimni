import Hero from '@/components/hero';
import Design from '@/components/design';
import DefaultLayout from '@/app/default-layout';

export default function Home() {
  return (
    <DefaultLayout>
      <Design />
      <Hero />
    </DefaultLayout>
  );
}
