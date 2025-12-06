import { Header, Footer } from "@/components/layout";
import { siteConfig } from "@/data/site";
import { event } from "@/data/event";

export default function Home() {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center"
          aria-label="メインビジュアル"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${siteConfig.heroImage})`,
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">
              ZUSHI LIVE INCLUSIVE
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8">
              {siteConfig.statement}
            </p>
            <p className="text-lg md:text-xl text-white/70">
              {formattedDate}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs tracking-widest text-white/60">
              SCROLL
            </span>
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section className="relative h-screen flex items-start justify-start pt-32 md:pt-44">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/images/statement.jpg)`,
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-left px-8 md:px-16">
            <p className="text-white/90 leading-relaxed text-lg md:text-xl">
              障がい者アーティストとトップアーティストが共演する、インクルーシブなコンサート。
              <br />
              ジャンルも、主役も、境界線もない。誰もが楽しめる音楽コンサートを、逗子から。
            </p>
          </div>
        </section>

        {/* Event Info Section */}
        <section className="py-24 md:py-32 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-16">
              EVENT INFO
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Date & Venue */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm text-white/50 mb-2">日時</h3>
                  <p className="text-lg">{formattedDate}</p>
                  <p className="text-white/70">
                    開場 {event.doorTime} / 開演 {event.startTime}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-white/50 mb-2">会場</h3>
                  <p className="text-lg">{event.venue}</p>
                  <p className="text-white/70">{event.address}</p>
                  <p className="text-sm text-white/50 mt-1">
                    {event.capacity}席（車椅子席あり）
                  </p>
                </div>
              </div>

              {/* Tickets */}
              <div>
                <h3 className="text-sm text-white/50 mb-4">チケット料金</h3>
                <ul className="space-y-3">
                  {event.prices.map((price) => (
                    <li
                      key={price.label}
                      className="flex items-baseline justify-between border-b border-white/10 pb-3"
                    >
                      <span className="text-white/80">{price.label}</span>
                      <div className="text-right">
                        <span className="text-lg">
                          {price.price === 0
                            ? "無料"
                            : `¥${price.price.toLocaleString()}`}
                        </span>
                        {price.note && (
                          <span className="block text-xs text-white/50">
                            {price.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 px-8 py-3 bg-primary text-black font-medium hover:bg-primary-dark transition-colors"
                  >
                    チケットを購入する
                  </a>
                ) : (
                  <p className="mt-8 text-white/50">
                    チケット情報は近日公開予定
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {siteConfig.crowdfundingUrl && (
          <section className="py-24 md:py-32 px-6">
            <div className="max-w-4xl mx-auto">
              <a
                href={siteConfig.crowdfundingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/campfire.png"
                  alt="クラウドファンディング - ネクストゴール60万円に挑戦中"
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
