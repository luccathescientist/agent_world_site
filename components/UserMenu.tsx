"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { Avatar } from "./Avatar";

export function UserMenu({
  name,
  avatarSrc,
}: {
  name: string;
  avatarSrc: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 hover:opacity-75 transition-opacity"
        aria-expanded={open}
      >
        <Avatar src={avatarSrc} name={name} size={26} />
        <span className="text-aw-text font-medium text-sm">{name}</span>
        <svg
          className={`w-3 h-3 text-aw-muted transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-aw-border rounded-xl shadow-lg overflow-hidden z-50">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-aw-text hover:bg-aw-surface transition-colors"
          >
            Profile
          </Link>
          <div className="border-t border-aw-border" />
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2.5 text-sm text-aw-muted hover:bg-aw-surface transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
