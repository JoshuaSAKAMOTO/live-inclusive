import { Header, Footer } from "@/components/layout";
import { getNewsPreview } from "@/lib/microcms";
import Link from "next/link";
import { notFound } from "next/navigation";

// プレビューページは常に動的レンダリング
export const dynamic = "force-dynamic";

// 検索エンジンにインデックスされないようにする
export const metadata = {
  robots: "noindex, nofollow",
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPreviewPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;

  if (!draftKey) {
    notFound();
  }

  let news;
  try {
    news = await getNewsPreview(id, draftKey);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        {/* Preview Banner */}
        <div className="fixed top-16 left-0 right-0 z-40 bg-yellow-500 text-black text-center py-2 text-sm font-medium">
          プレビューモード - この内容はまだ公開されていません
        </div>

        <article className="max-w-3xl mx-auto px-6 pt-8">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/news"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              ← ニュース一覧に戻る
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <time className="text-sm text-white/50">
                {formatDate(news.date)}
              </time>
              {news.category && news.category.length > 0 && (
                <span className="text-xs px-2 py-1 bg-white/10 text-white/70">
                  {news.category[0]}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{news.title}</h1>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:marker:text-white/50"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/news"
              className="inline-block px-8 py-3 border border-white/30 hover:border-white hover:bg-white/5 transition-all"
            >
              ニュース一覧に戻る
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
