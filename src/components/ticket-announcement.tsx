"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const STORAGE_KEY = "ticket-announcement-dismissed";

export function TicketAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="チケット販売のお知らせ"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-white/20 px-8 py-10 md:px-12 md:py-14 max-w-md w-full text-center">
        <button
          type="button"
          onClick={close}
          aria-label="閉じる"
          className="absolute top-3 right-3 p-2 text-white/60 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="text-2xl md:text-3xl font-bold mb-6">
          チケット絶賛販売中!
        </p>

        <Link
          href="/tickets"
          onClick={close}
          className="inline-block bg-primary text-black font-medium px-8 py-3 hover:opacity-90 transition-opacity"
        >
          チケットを購入する
        </Link>
      </div>
    </div>
  );
}
