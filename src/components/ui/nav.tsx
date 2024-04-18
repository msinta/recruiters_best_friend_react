'use client';

import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';

import React from 'react';
import { buttonVariants } from './button';

export default function Nav() {
  const [, setIsHovered] = React.useState(false);

  return (
    <div className="absolute top-1 sm:top-8 w-full flex justify-center mt-0">
      <div
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-24 w-24 rounded-full relative')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href="https://recruiters-best-friend.vercel.app/">
          <img
            alt="logo"
            src="https://www.avisi.nl/hubfs/2023/Logo%20%5B2023%5D/gitlab-logo-500.png"
            className="h-24 w-24"
          />
          <StarFilledIcon className="h-4 w-4 text-yellow-400 absolute top-1 right-1 transition-all animate-bounce " />
        </a>
      </div>
    </div>
  );
}
