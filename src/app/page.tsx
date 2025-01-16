import Hero from '@/components/hero';
import Design from '@/components/design';
import DefaultLayout from '@/app/default-layout';
import AnnouncementCard from '@/components/announcement-card';

export default function Home() {
  return (
    <DefaultLayout>
      <Design />
      <Hero />
      <AnnouncementCard />
    </DefaultLayout>
  );
}
