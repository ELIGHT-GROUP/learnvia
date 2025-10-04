import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import systemData from '@/data/system-data.json';

type LogoProps = {
  mode?: 'default' | 'light' | 'dark' | 'colored';
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
  href?: string;
};

export function Logo({
  mode = 'default',
  size = 'md',
  withText = true,
  className,
  href = '/',
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const colorClasses = {
    default: 'text-primary',
    light: 'text-white',
    dark: 'text-gray-900',
    colored: 'text-blue-600',
  };

  const LogoContent = () => (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Icon */}
      <div className={cn('relative', sizeClasses[size])}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-full w-auto', colorClasses[mode])}
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {withText && (
        <span
          className={cn(
            'font-semibold tracking-tight',
            colorClasses[mode],
            {
              'text-lg': size === 'sm',
              'text-xl': size === 'md',
              'text-2xl': size === 'lg',
            }
          )}
        >
           {systemData.system.name}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

export default Logo;