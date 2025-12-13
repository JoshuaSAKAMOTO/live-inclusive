import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { performers } from "@/data/performers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "出演者",
  description: "逗子ライブインクルーシブの出演アーティスト一覧",
};

export default function PerformersPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              PERFORMERS
            </h1>
            <p className="text-white/60">出演者</p>
          </div>

          {/* Performers Grid */}
          {performers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {performers.map((performer) => (
                <Link
                  key={performer.id}
                  href={`/performers/${performer.id}`}
                  className="group block"
                >
                  <div className="aspect-square relative overflow-hidden bg-white/5 mb-4">
                    {performer.thumbnail ? (
                      <Image
                        src={performer.thumbnail}
                        alt={performer.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: performer.thumbnailPosition || "center" }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        <svg
                          className="w-16 h-16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <h2 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {performer.name}
                  </h2>
                  <p className="text-sm text-white/60">{performer.role}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl text-white/40 mb-4">Coming Soon</p>
              <p className="text-white/60">
                出演者情報は近日公開予定です
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
