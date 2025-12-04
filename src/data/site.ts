import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "逗子ライブインクルーシブ",
  description:
    "障がい者アーティストとトップアーティストが共演するインクルーシブなコンサート",
  statement: "誰もが楽しめる音楽コンサート",
  heroImage: "/images/hero.jpg",
  crowdfundingUrl: undefined,
  contactPhone: "050-3578-2929",
  contactEmail: "info@zushiliveinclusive.com",
  socialLinks: [
    { type: "facebook", url: "https://facebook.com/" },
    { type: "instagram", url: "https://instagram.com/" },
    { type: "twitter", url: "https://twitter.com/" },
  ],
};

export const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "PERFORMERS", href: "/performers" },
  { label: "TICKETS", href: "/tickets" },
  { label: "VENUE", href: "/venue" },
  { label: "ARCHIVE", href: "/archive" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];
