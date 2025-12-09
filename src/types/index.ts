export interface Performer {
  id: string;
  name: string;
  nameKana: string;
  role: string;
  profile: string;
  thumbnail: string;
  thumbnailPosition?: "top" | "center";
  photo: string;
  sns?: {
    type: "twitter" | "x" | "instagram" | "facebook" | "youtube" | "website";
    url: string;
  }[];
}

export interface Event {
  title: string;
  date: string;
  doorTime: string;
  startTime: string;
  venue: string;
  address: string;
  capacity: number;
  prices: {
    label: string;
    price: number;
    note?: string;
  }[];
  ticketUrl?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  statement: string;
  heroImage: string;
  crowdfundingUrl?: string;
  contactPhone: string;
  contactEmail: string;
  socialLinks: {
    type: "facebook" | "instagram" | "twitter" | "x" | "youtube";
    url: string;
  }[];
}

export interface NavItem {
  label: string;
  href: string;
}
