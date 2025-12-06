"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems, siteConfig } from "@/data/site";
import { SocialLinks } from "./social-links";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 py-4 md:px-12 md:py-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left on mobile */}
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white z-60 relative"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Navigation - Desktop */}
            <nav
              aria-label="メインナビゲーション"
              className="hidden md:block"
            >
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm tracking-wider text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links - Desktop */}
            <div className="hidden md:block">
              <SocialLinks links={siteConfig.socialLinks} />
            </div>

            {/* Spacer for mobile to keep hamburger on left */}
            <div className="md:hidden" />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Background */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <nav
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-black transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg tracking-wider text-white/80 hover:text-white transition-colors border-b border-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <SocialLinks links={siteConfig.socialLinks} />
          </div>
        </div>
      </nav>
    </>
  );
}
