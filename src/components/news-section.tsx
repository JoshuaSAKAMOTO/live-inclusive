import { getNewsList, News } from "@/lib/microcms";
import Link from "next/link";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export async function NewsSection() {
  let news: News[] = [];

  try {
    const data = await getNewsList({ limit: 5 });
    news = data.contents;
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
          NEWS
        </h2>

        <ul className="space-y-6">
          {news.map((item) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="block group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <time className="text-sm text-white/50 shrink-0">
                    {formatDate(item.date)}
                  </time>
                  {item.category && item.category.length > 0 && (
                    <span className="text-xs px-2 py-1 bg-white/10 text-white/70 w-fit">
                      {item.category[0]}
                    </span>
                  )}
                  <span className="text-white/90 group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-block px-8 py-3 border border-white/30 hover:border-white hover:bg-white/5 transition-all"
          >
            ニュース一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
