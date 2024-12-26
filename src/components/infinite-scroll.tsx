'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function InfiniteScroll({
  children,
  direction = 'left',
  speed = 20,
  className,
}: InfiniteScrollProps) {
  const [duplicated, setDuplicated] = useState(children);

  useEffect(() => {
    setDuplicated(
      <>
        {children}
        {children}
        {children}
      </>,
    );
  }, [children]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={cn(
          'flex min-w-full gap-4 py-4',
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right',
          className,
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated}
      </div>
    </div>
  );
}
