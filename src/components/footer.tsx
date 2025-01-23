import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-brown-leaf py-1.5 text-white">
      <div className="flex items-center justify-end gap-2 px-4">
        <p className={'text-[8px]'}>
          Made by{' '}
          <Link
            href={'https://anthrapi.com'}
            className={'italic text-blue-500'}
          >
            Anthrapi
          </Link>
        </p>
        <div className={'flex h-3 w-3 items-center justify-center'}>
          <Image
            src={'/anthrapi.svg'}
            alt={'anthrapi logo'}
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
