"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aw:forum:lastVisit";

export function NewBadge({ lastReplyAt }: { lastReplyAt: string }) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && new Date(lastReplyAt) > new Date(stored)) {
        setIsNew(true);
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isNew) return null;
  return (
    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-aw-text text-aw-bg leading-none">
      New
    </span>
  );
}

/** Drop this anywhere on the category page to record the visit timestamp. */
export function ForumVisitUpdater() {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {}
  }, []);
  return null;
}
