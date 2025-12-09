import { Header, Footer } from "@/components/layout";
import { getNewsList } from "@/lib/microcms";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニュース",
  description: "逗子ライブインクルーシブの最新ニュース・お知らせ",
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function NewsPage() {
  const { contents: news } = await getNewsList({ limit: 100 });

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              NEWS
            </h1>
            <p className="text-white/60">ニュース・お知らせ</p>
          </div>

          {/* News List */}
          {news.length > 0 ? (
            <ul className="space-y-8">
              {news.map((item) => (
                <li key={item.id}>
                  <Link href={`/news/${item.id}`} className="block group">
                    <article className="border-b border-white/10 pb-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2">
                        <time className="text-sm text-white/50 shrink-0">
                          {formatDate(item.date)}
                        </time>
                        {item.category && item.category.length > 0 && (
                          <span className="text-xs px-2 py-1 bg-white/10 text-white/70 w-fit">
                            {item.category[0]}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg text-white/90 group-hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-white/50">
              現在、ニュースはありません。
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
