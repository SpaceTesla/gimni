'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 inline-flex min-w-[168px] items-center gap-6 rounded-xl bg-background px-6 py-1.5 text-[12px] font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.5)] hover:no-underline"
      >
        <div className={'h-6 w-6'}>
          <Image
            src="/assets/contact.svg"
            alt="contact"
            width={50}
            height={50}
            className={'h-6 w-6'}
          />
        </div>
        <span>CONTACT US</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 -translate-y-2 translate-x-2 rounded-full bg-white p-1 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-2 text-left">
              <p className="font-semibold">Phone:</p>
              <p>+91 74831 39254</p>
              <p className="font-semibold">Email:</p>
              <p>kitchengimnis@gmail.com</p>
              <p className="font-semibold">Address:</p>
              <p>
                46/2, first floor, Jayanthi Nagar circle, 43, Horamavu,
                Bengaluru, Karnataka 560043
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactButton;
