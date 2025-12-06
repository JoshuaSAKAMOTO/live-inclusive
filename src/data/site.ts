import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "逗子ライブインクルーシブ",
  description:
    "障がい者アーティストとトップアーティストが共演するインクルーシブなコンサート",
  statement: "音楽は、最初からずっと、インクルーシブだ",
  heroImage: "/images/hero.jpg",
  crowdfundingUrl: "https://camp-fire.jp/projects/895664/view",
  contactPhone: "050-3578-2929",
  contactEmail: "info@zushiliveinclusive.com",
  socialLinks: [
    { type: "instagram", url: "https://www.instagram.com/live_inclusive/" },
    { type: "facebook", url: "https://www.facebook.com/zushiliveinclusive/" },
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
