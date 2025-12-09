import { Header, Footer } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "過去公演",
  description: "逗子ライブインクルーシブの過去公演アーカイブ",
};

interface ArchiveItem {
  year: number;
  title: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  articleUrl?: string;
}

const archives: ArchiveItem[] = [
  {
    year: 2025,
    title: "逗子ライブインクルーシブ 2025",
    description:
      "2回目の開催となった2025年公演。さらに多くのアーティストが参加し、感動のステージをお届けしました。",
    thumbnail: "/images/hero.jpg",
    articleUrl: "https://shonanjin.com/news/live-inclusive-2025/",
  },
  {
    year: 2024,
    title: "逗子ライブインクルーシブ 2024",
    description:
      "初開催となった2024年公演。多くの観客に感動をお届けしました。",
    thumbnail: "/images/archive/2024.jpg",
    articleUrl: "https://shonanjin.com/news/live-inclusive-2024/",
  },
];

export default function ArchivePage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              ARCHIVE
            </h1>
            <p className="text-white/60">過去公演</p>
          </div>

          {/* Archives */}
          {archives.length > 0 ? (
            <div className="space-y-16">
              {archives.map((archive) => (
                <article
                  key={archive.year}
                  className="grid md:grid-cols-2 gap-8 items-start"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-white/5 relative overflow-hidden">
                    {archive.thumbnail ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${archive.thumbnail})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {archive.videoUrl && (
                      <a
                        href={archive.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                        aria-label="動画を再生"
                      >
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-primary text-sm mb-2">{archive.year}</p>
                    <h2 className="text-2xl font-medium mb-4">
                      {archive.title}
                    </h2>
                    <p className="text-white/70 leading-relaxed mb-4">
                      {archive.description}
                    </p>
                    {archive.articleUrl && (
                      <a
                        href={archive.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
                      >
                        記事を読む →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl text-white/40 mb-4">Coming Soon</p>
              <p className="text-white/60">
                過去公演の情報は近日公開予定です
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
