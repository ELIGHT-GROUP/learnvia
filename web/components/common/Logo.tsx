"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import systemData from "@/data/system-data.json";
import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  mode?: "full" | "icon-only" | "text-only";
  className?: string;
  href?: string;
};

export function Logo({
  size = "md",
  mode = "full",
  className,
  href = "/",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  const LogoContent = () => (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon */}
      {(mode === "full" || mode === "icon-only") && (
        <div className={cn("relative", sizeClasses[size])}>
          <Image
            width={32}
            height={32}
            src={systemData.system.logo}
            alt={systemData.system.name}
            className={cn(sizeClasses[size])}
          />
        </div>
      )}

      {/* Logo Text */}
      {(mode === "full" || mode === "text-only") && (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            {
              "text-lg": size === "sm",
              "text-xl": size === "md",
              "text-2xl": size === "lg",
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
      <Link href={href}>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

export default Logo;
