"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Availability", href: "/admin/availability" },
  { label: "Blocked Dates", href: "/admin/blocked-dates" },
  { label: "Bookings", href: "/admin/bookings" },
];

interface Props {
  email: string | null;
}

export default function AdminNav({ email }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-navy text-gold flex items-center justify-center text-xs font-black">
              R
            </span>
            <span className="text-navy font-black text-sm sm:text-base">
              Ricky&apos;s Driving · Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            {email && (
              <span className="hidden sm:inline text-xs text-gray-400 font-medium">
                {email}
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="text-sm font-semibold text-navy/70 hover:text-navy disabled:opacity-50 transition-colors"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto -mb-px">
          {navLinks.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap",
                  active
                    ? "text-navy border-gold"
                    : "text-navy/60 border-transparent hover:text-navy hover:border-gray-200"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
