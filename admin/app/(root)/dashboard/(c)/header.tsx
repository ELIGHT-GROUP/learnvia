"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/common/ModeToggle";
import Profile from "./profile";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-sidebar px-4 text-sidebar-foreground sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
      </div>

      <div className="flex w-full items-center gap-3 md:ml-auto md:gap-2 lg:gap-3">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-input border-border text-foreground focus-visible:ring-primary"
            />
          </div>
        </form>
        <ModeToggle />
        <Profile />
      </div>
    </header>
  );
}
