import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

import dishes from '@/data/dishes';
import DishCard from '@/components/dish-card';
import DefaultLayout from '@/app/default-layout';

export default function AboutPage() {
  return (
    <DefaultLayout>
      <div className="min-h-screen w-full px-4 lg:px-0">
        {/* Hero Section */}
        <div className="relative px-4 py-8 md:px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">About Us</h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-700 md:text-2xl">
              Savor the Authentic Taste of Bengali Home Cooking
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl space-y-20 py-12 md:px-6">
          {/* Introduction */}
          <section className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex">
                <Badge className="bg-red-nav text-white hover:bg-red-nav/90">
                  Since 2021
                </Badge>
                <Badge className="ml-auto bg-yellow-highlight text-black hover:bg-yellow-highlight/90">
                  FSSAI: 21221187001721
                </Badge>
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Welcome to Gimni's Kitchen{' '}
              </h2>
              <p className="leading-relaxed text-gray-700">
                Founded in April 2021, Gimni's Kitchen emerged from a vision of
                bringing authentic home-cooked Bengali delicacies to the world.
                Our first outlet in Horamavu, Bangalore, marks the beginning of
                our culinary journey.{' '}
              </p>
              <Button className="bg-red-nav hover:bg-red-nav/90" asChild>
                <Link href={'/alacarte'}>Explore Our Menu</Link>
              </Button>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/food.png"
                alt="Restaurant Interior"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </section>

          {/* Our Story */}
          <section className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>
            <p className="leading-relaxed text-gray-700">
              Launched on Bengali New Year, 14th April 2021, we started with a
              single outlet designed to provide our customers with simple,
              high-quality meals. Within just 45 days, we achieved a remarkable
              milestone by successfully catering to 400 people during Durga
              Puja, leading to a 130% growth in our customer base.
            </p>
          </section>

          {/* Signature Dishes Scroll */}
          <section className="bg-gradient-to-r from-yellow-background via-white/50 to-yellow-background py-12">
            <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
              Our Signature Dishes
            </h2>
            <InfiniteMovingCards
              cards={dishes.map((dish) => (
                <DishCard key={dish.name} {...dish} />
              ))}
              direction="left"
              speed={'fast'}
            />
          </section>

          {/* Founders */}
          <section className="space-y-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Meet Our Founders
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none bg-white/50 shadow-none">
                <CardContent className="space-y-4 p-6">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src="/arko.jpg"
                      alt="Arko Banerjee"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Arko Banerjee</h3>
                  <p className="text-gray-700">
                    With over 20 years of experience in operations, revenue, and
                    growth strategies at organizations like First Advantage and
                    Mphasis, he has spent the last 4 years running his own cloud
                    kitchen, Gimnis Kitchen.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none bg-white/50 shadow-none">
                <CardContent className="space-y-4 p-6">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src="/lipi.jpg"
                      alt="Lipi Banerjee"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Lipi Banerjee</h3>
                  <p className="text-gray-700">
                    Lipi is an exceptional home chef who has curated over 100
                    recipes for Gimnis Kitchen. She is also responsible for
                    recipe development at Satis Friez and oversees dish curation
                    for our brand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Experience Bengali Cuisine?
              </h2>
              <p className="text-gray-700">
                Join us for an authentic Bengali culinary experience or let us
                cater your next event.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-[#FF3B30] hover:bg-[#FF3B30]/90" asChild>
                  <Link href={'/alacarte'}>View Our Menu</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white"
                  asChild
                >
                  <Link href={'/catering'}>Contact for Catering</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
}
