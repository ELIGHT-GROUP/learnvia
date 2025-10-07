'use client';

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { navigationItems } from '@/data/navigation';
import { cn } from '@/lib/utils';



export default function SidebarNav() {
  const pathname = usePathname();


  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <SidebarMenu>
      {navigationItems.map((item) => (  
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton className={cn(isActive(item.href) ? 'bg-primary text-white hover:text-white hover:bg-primary/50 ' : '')} asChild tooltip={item.label}>
            <Link href={item.href}>
              {React.createElement(item.icon, { className: 'h-5 w-5' })}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
