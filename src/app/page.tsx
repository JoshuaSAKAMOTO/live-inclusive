import { Header, Footer } from "@/components/layout";
import { siteConfig } from "@/data/site";
import { event } from "@/data/event";
import { performers } from "@/data/performers";
import { InstagramEmbed } from "@/components/instagram-embed";
import { NewsSection } from "@/components/news-section";
import Link from "next/link";
import Image from "next/image";

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
          <div className="absolute inset-0">
            <Image
              src={siteConfig.heroImage}
              alt="ライブインクルーシブ2025フィナーレの画像。グリーンのTシャツを着たバンドメンバー含めた16人が舞台に横に並ぶ"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">
              ZUSHI LIVE INCLUSIVE
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              <span className="block md:inline">{formattedDate}</span>
              <span className="hidden md:inline">　</span>
              <span className="block md:inline">{event.venue}</span>
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

        {/* Statement Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 leading-relaxed">
              「音楽は、最初からずっと、
              <br />
              インクルーシブだ」
            </h2>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                2024年に産声を上げた「逗子ライブインクルーシブ」は、さまざまな背景を持つアーティストが結集し、共演する、これまでにないコンセプトのコンサートです。
              </p>

              <p>
                ジャンルの垣根はありません。ステージの上では、主役も脇役もなく、すべてのアーティストが対等に、それぞれの音楽を奏でます。そしてそれがシナジーを生み、大きな感動へとつながっていくのです。
              </p>

              <p>
                ミュージカル、ポップス、ジャズ、ロック——
                さまざまなジャンルのアーティストたちが、
                ひとつのステージで共演する。
                それは、音楽の本質的な姿だと私たちは考えています。
              </p>

              <p>
                音楽は、聴く人を選びません。
                <br />
                音楽は、演奏する人を選びません。
                <br />
                音楽は、最初からずっと、インクルーシブなのです。
              </p>

              <p>
                私たちは、この逗子から、
                誰もが楽しめる音楽の形を発信していきます。
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative h-screen flex items-end justify-start pb-24 md:pb-32">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/statement.jpg"
              alt="A Whole New Worldを手話で表現する　石井一孝さん　麻生かほ里さん"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-left px-8 md:px-16">
            <p className="text-white font-bold text-2xl md:text-3xl mb-4">
              これは、聴くだけではない、コンサート。
            </p>
            <p className="text-white/90 leading-relaxed text-lg md:text-xl">
              手話パフォーマンスやLED字幕を活用して、「音」が届きにくい方にも楽しんでいただけるよう、さまざまな工夫にトライしています。
            </p>
          </div>
        </section>

        {/* Performers Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-16">
              PERFORMERS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {performers.map((performer) => (
                <Link
                  key={performer.id}
                  href={`/performers/${performer.id}`}
                  className="group"
                >
                  <div className="aspect-square relative overflow-hidden bg-white/5 mb-2">
                    <Image
                      src={performer.thumbnail}
                      alt={performer.name}
                      fill
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${performer.thumbnailPosition === "top" ? "object-top" : ""}`}
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-medium group-hover:text-white/80 transition-colors">
                    {performer.name}
                  </h3>
                  <p className="text-sm text-white/50">{performer.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ticket Section */}
        <section className="py-24 md:py-32 px-6 bg-white/5">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
              TICKETS
            </h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-white/80">一般</span>
                <span className="text-lg">¥5,000</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-white/80">中高生</span>
                <span className="text-lg">¥3,500</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-white/80">障がい者手帳保持者および付添1名</span>
                <span className="text-lg">¥3,000</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-white/80">小学生</span>
                <span className="text-lg">¥2,500</span>
              </li>
            </ul>
            <div className="text-center text-white/70 space-y-1">
              <p>チケットぴあ/イープラスにて発売予定</p>
              <p>一般発売予定日：2026年1月24日（一部先行あり）</p>
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* CTA Section */}
        {siteConfig.crowdfundingUrl && (
          <section className="py-24 md:py-32 px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
              CLOUD FUNDING
            </h2>
            <div className="max-w-4xl mx-auto mb-8">
              <a
                href={siteConfig.crowdfundingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/campfire.png"
                  alt="ZUSHI LIVE INCLUSIVE 2026 クラウドファンディング実施中。たくさんのご支援ありがとうございます。現在、ネクストゴール60万円に挑戦中！音楽の軌跡に逗子でまた会える。"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <a
              href={siteConfig.crowdfundingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-white/30 hover:border-white hover:bg-white/5 transition-all"
            >
              クラウドファンディングを見る
            </a>
          </section>
        )}

        {/* Location Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
              LOCATION
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-medium mb-2">{event.venue}</h3>
                <p className="text-white/60 mb-6">{event.address}</p>
                <div className="space-y-1 text-sm text-white/70">
                  <p>JR横須賀線「逗子駅」より徒歩5分</p>
                  <p>京急逗子線「逗子・葉山駅」より徒歩7分</p>
                </div>
              </div>
              <div className="aspect-square md:aspect-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1628.2253724492516!2d139.582397!3d35.29478!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601846ec27a449d1%3A0x81abc818032f36c3!2z6YCX5a2Q5paH5YyW44OX44Op44K244Ob44O844Or!5e0!3m2!1sja!2sus!4v1765114643056!5m2!1sja!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="会場マップ"
                  className="bg-white/5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 justify-items-center">
              <InstagramEmbed postUrl="https://www.instagram.com/p/DRt03J6EtUs/" />
              <InstagramEmbed postUrl="https://www.instagram.com/p/DR83qIqkhzF/" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
