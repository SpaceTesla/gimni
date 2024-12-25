import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative m-4 h-[420px] max-w-[380px] overflow-hidden rounded-[80px] shadow-[4px_4px_8px_rgba(0,0,0,0.6)] lg:m-12">
      <Image
        src="/food.png"
        alt="Delicious food"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Hero;
