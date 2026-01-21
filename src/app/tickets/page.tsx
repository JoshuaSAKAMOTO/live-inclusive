import { Header, Footer } from "@/components/layout";
import { event } from "@/data/event";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "チケット",
  description: "逗子ライブインクルーシブのチケット情報",
};

export default function TicketsPage() {
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

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              TICKETS
            </h1>
            <p className="text-white/60">チケット情報</p>
          </div>

          {/* Event Info */}
          <section className="mb-16">
            <div className="bg-white/5 p-8 md:p-12">
              <h2 className="text-2xl font-medium mb-8">{event.title}</h2>

              <dl className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <dt className="text-white/50 sm:w-32 shrink-0">日時</dt>
                  <dd>
                    <p>{formattedDate}</p>
                    <p className="text-white/70">
                      開場 {event.doorTime} / 開演 {event.startTime}
                    </p>
                  </dd>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <dt className="text-white/50 sm:w-32 shrink-0">会場</dt>
                  <dd>
                    <p>{event.venue}</p>
                    <p className="text-white/70">{event.address}</p>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Ticket Prices */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-8">チケット料金</h2>

            <div className="space-y-4">
              {event.prices.map((price) => (
                <div
                  key={price.label}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/10"
                >
                  <div>
                    <h3 className="text-lg font-medium">{price.label}</h3>
                    {price.note && (
                      <p className="text-sm text-white/50 mt-1">{price.note}</p>
                    )}
                  </div>
                  <p className="text-2xl font-medium">
                    {price.price === 0
                      ? "無料"
                      : `¥${price.price.toLocaleString()}`}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/50 text-right">※価格は税込</p>
          </section>

          {/* Purchase Button */}
          <section className="text-center">
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-primary text-black text-lg font-medium hover:bg-primary-dark transition-colors"
              >
                チケットを購入する
              </a>
            ) : (
              <div className="py-12 bg-white/5 border border-white/10">
                <p className="text-xl text-white/60 mb-2">Coming Soon</p>
                <p className="text-white/40">
                  2026年1月24日より、チケットぴあ/イープラスにて販売開始予定
                </p>
              </div>
            )}
          </section>

          {/* Advance Ticket */}
          <section className="mt-12 text-center">
            <div className="py-12 bg-white/5 border border-white/10">
              <h2 className="text-xl font-medium mb-4">公式サイトチケット受付</h2>
              <p className="text-white/60 mb-6">
                一般販売に先駆けて、公式サイトからお申し込みいただけます
                <br />
                お支払いは銀行振込のみとなります
              </p>
              <a
                href="https://forms.gle/eqGM2xYkWof4qLLL6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-primary text-black text-lg font-medium hover:bg-primary-dark transition-colors"
              >
                チケットを申し込む
              </a>
            </div>
          </section>

          {/* Notes */}
          <section className="mt-16">
            <h2 className="text-lg font-medium mb-4">ご注意</h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>・未就学児のご入場はご遠慮いただいております</li>
              <li>・車椅子席をご希望の方は事前にお問い合わせください</li>
              <li>・チケットの発券時に別途手数料が発生することがあります</li>
              <li>・チケットの転売は固くお断りいたします</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
