"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="w-6 h-6" />
        <span className="font-bold text-ST_postive">{siteConfig.name}</span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        글 목록
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        소개
      </Link>
      <Link
        href="/series"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/series" ? "text-foreground" : "text-foreground/60"
        )}
      >
        시리즈
      </Link>
    </nav>
  );
}
