'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex h-20 items-center justify-between bg-red-nav px-4">
      {/* Top-left SVG (Desktop only) */}
      <div className="hidden lg:block">
        <Image
          src="/assets/tl.svg"
          alt=""
          className="absolute -left-8 -top-20 w-[220px]"
          width={220}
          height={220}
        />
      </div>

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
        } flex flex-1 gap-4 sm:static sm:flex sm:flex-row lg:ml-48`}
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
      <div className="absolute -top-8 right-0.5 hidden w-[80px] lg:block">
        <Image src="/assets/dots_t.svg" alt="Dots" width={80} height={80} />
      </div>
    </nav>
  );
};

const NavLinks = () => (
  <li className="flex flex-col gap-4 font-extrabold sm:flex-row sm:gap-6 sm:font-black md:gap-8 md:text-lg">
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
