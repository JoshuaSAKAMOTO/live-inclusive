import { Header, Footer } from "@/components/layout";
import { getNewsList } from "@/lib/microcms";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニュース",
  description: "逗子ライブインクルーシブの最新ニュース・お知らせ",
};

const categories = ["すべて", "お知らせ", "メディア"] as const;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const { contents: news } = await getNewsList({ limit: 100 });

  // カテゴリでフィルタリング
  const filteredNews =
    category && category !== "すべて"
      ? news.filter((item) => item.category?.includes(category as "お知らせ" | "メディア"))
      : news;

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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const isActive = cat === "すべて" ? !category || category === "すべて" : category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "すべて" ? "/news" : `/news?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-black"
                      : "border-white/30 text-white/70 hover:border-white hover:text-white"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* News List */}
          {filteredNews.length > 0 ? (
            <ul className="space-y-8">
              {filteredNews.map((item) => (
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
              {category ? `「${category}」のニュースはありません。` : "現在、ニュースはありません。"}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
