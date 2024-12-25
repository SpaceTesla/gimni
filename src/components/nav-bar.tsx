'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Design from '@/components/design';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="z-100 relative flex h-20 items-center justify-between bg-red-nav px-4 lg:ml-16">
      {/* Hamburger menu for small screens */}
      <button
        className="w-12 p-0 sm:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu height={32} width={32} />
      </button>
      {/* Navigation Menu */}
      <ul
        className={`${
          isMenuOpen
            ? 'absolute left-0 top-20 w-full flex-col bg-red-nav p-4'
            : 'hidden'
        } z-10 flex flex-1 gap-4 sm:static sm:flex sm:flex-row lg:ml-48`}
      >
        <NavLinks />
      </ul>

      {/* Logo and extra dots */}
      <div className="flex items-center gap-4 lg:mr-20">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          className="h-20"
          width={240}
          height={240}
        />
      </div>
    </nav>
  );
};

const NavLinks = () => (
  <li className="z-10 flex flex-col gap-4 font-extrabold sm:flex-row sm:gap-6 sm:font-black md:gap-8 md:text-lg">
    <Link href="/" className="text-center hover:text-white">
      HOME
    </Link>
    <Link href="/about" className="text-center hover:text-white">
      ABOUT
    </Link>
    <Link href="/alacarte" className="text-center hover:text-white">
      À LA CARTE
    </Link>
    <Link href="/catering" className="text-center hover:text-white">
      CATERING
    </Link>
  </li>
);

export default Navbar;
