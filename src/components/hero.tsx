import Image from 'next/image';
import { Caveat } from 'next/font/google';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import LocateButton from '@/components/locate-button';
import ContactButton from '@/components/contact-button';

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: 'variable',
});

const Hero = () => {
  return (
    <div
      className={
        'mx-auto flex min-h-[88vh] max-w-screen-xl flex-col-reverse items-center gap-8 lg:flex-row'
      }
    >
      <div className="m-4 h-[420px] max-w-[600px] overflow-hidden rounded-[80px] shadow-[4px_4px_8px_rgba(0,0,0,0.6)]">
        <Image
          src="/home.jpg"
          alt="Delicious food"
          width={1000}
          height={600}
          quality={100}
          className={'h-[100%] object-cover'}
        />
      </div>

      <div className={'flex flex-1 flex-col items-center text-center'}>
        <div
          className={`${caveat.variable} text-[48px]`}
          style={{ fontFamily: 'var(--font-caveat)' }}
        >
          Experience Authentic
        </div>
        <div className="before:clip-trapezium relative w-min whitespace-nowrap px-4 text-[64px] font-bold before:absolute before:bottom-[10%] before:left-1/2 before:-z-[1] before:h-[80%] before:w-full before:-translate-x-1/2 before:bg-yellow-highlight before:content-[''] sm:text-[64px]">
          Bengali
        </div>
        <div className="before:clip-trapezium relative px-4 text-[48px] font-extrabold before:absolute before:bottom-[10%] before:left-1/2 before:-z-[1] before:h-[80%] before:w-full before:-translate-x-1/2 before:bg-red-highlight before:content-[''] sm:text-[48px]">
          Cuisine
        </div>
        <div className="text-md mb-4 pt-4 font-semibold">
          TREATING TASTE BUDS
        </div>

        <div className={'flex flex-wrap justify-center gap-4'}>
          <LocateButton />
          <ContactButton />
          <Button
            asChild
            variant={'link'}
            className="mt-4 inline-flex min-w-[168px] items-center gap-6 rounded-xl bg-background px-6 py-1.5 text-[12px] font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.5)] hover:no-underline"
          >
            <Link href={'/catering'}>
              <div className={'h-6 w-6'}>
                <Image
                  src="/assets/catering.svg"
                  alt="catering"
                  width={50}
                  height={50}
                  className={'h-6 w-6'}
                />
              </div>
              <span>CATERING</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={'link'}
            className="mt-4 inline-flex min-w-[168px] items-center gap-6 rounded-xl bg-background px-6 py-1.5 text-[12px] font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.5)] hover:no-underline"
          >
            <Link href={'/takeaway'}>
              <div className={'h-6 w-6'}>
                <Image
                  src="/assets/menu.svg"
                  alt="menu"
                  width={50}
                  height={50}
                  className={'h-6 w-6'}
                />
              </div>
              <span>TAKE AWAY</span>
            </Link>
          </Button>
        </div>
        <div className={'mt-4 max-w-md text-center'}>
          Experience the taste of Bengal with our authentic Bengali cuisine. We
          offer a wide range of dishes that will leave you craving for more.
        </div>
        <Button className={'m-4 rounded-full bg-brown-leaf'} asChild>
          <Link href={'/about'}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
