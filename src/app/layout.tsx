import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "逗子ライブインクルーシブ",
    template: "%s | 逗子ライブインクルーシブ",
  },
  description:
    "障がい者アーティストとトップアーティストが共演するインクルーシブなコンサート。誰もが楽しめる音楽コンサートを逗子から。",
  keywords: ["逗子", "インクルーシブ", "コンサート", "ライブ", "音楽", "バリアフリー"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://zushiliveinclusive.com",
    siteName: "逗子ライブインクルーシブ",
    title: "逗子ライブインクルーシブ",
    description:
      "障がい者アーティストとトップアーティストが共演するインクルーシブなコンサート",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
