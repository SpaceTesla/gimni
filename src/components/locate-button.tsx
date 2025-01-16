'use client';

import { useState } from 'react';
import MapModal from '@/components/map-modal';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function LocateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 inline-flex min-w-[168px] items-center gap-6 rounded-xl bg-background px-6 py-1.5 text-[12px] font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.5)] hover:no-underline"
      >
        <div className={'h-6 w-6'}>
          <Image
            src="/assets/locate.svg"
            alt="catering"
            width={50}
            height={50}
            className={'h-6 w-6'}
          />
        </div>
        <span>LOCATE US</span>
      </button>

      <MapModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 -translate-y-2 translate-x-2 rounded-full bg-white p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Gimni&apos;s Kitchen Location
            </h2>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1057791022317!2d77.66127511032956!3d13.028935387238683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17f26c76df33%3A0x61565b61bfc05ccc!2sGimni's%20Kitchen!5e0!3m2!1sen!2sin!4v1735243136477!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </MapModal>
    </div>
  );
}
