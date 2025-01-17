'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-10 bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-white">Admin Dashboard</div>
        <div>
          <Button
            className="mr-4"
            variant={'secondary'}
            onClick={() => router.push('/')}
          >
            Home
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-500 hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
