import { Header, Footer } from "@/components/layout";
import { event } from "@/data/event";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会場",
  description: "逗子ライブインクルーシブの会場・アクセス情報",
};

export default function VenuePage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              LOCATION
            </h1>
            <p className="text-white/60">会場・アクセス</p>
          </div>

          {/* Venue Info */}
          <section className="mb-16">
            <div className="bg-white/5 p-8 md:p-12">
              <h2 className="text-2xl font-medium mb-2">{event.venue}</h2>
              <p className="text-white/60 mb-8">{event.address}</p>

              <dl className="space-y-4">
                <div className="flex gap-4">
                  <dt className="text-white/50 w-24 shrink-0">座席数</dt>
                  <dd>{event.capacity}席</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-white/50 w-24 shrink-0">車椅子席</dt>
                  <dd>あり（事前予約制）</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Map */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">アクセスマップ</h2>
            <div className="aspect-video bg-white/5 border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.8901234567!2d139.5791234!3d35.2951234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6YCX5a2Q5paH5YyW44OX44Op44K2!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="会場マップ"
              />
            </div>
          </section>

          {/* Access */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">アクセス方法</h2>

            <div className="space-y-8">
              <div className="bg-white/5 p-6 border border-white/10">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  電車でお越しの方
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>JR横須賀線「逗子駅」より徒歩5分</li>
                  <li>京急逗子線「逗子・葉山駅」より徒歩7分</li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 border border-white/10">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h8m-8 4h8m-6 4h4m-6-4v4m6-4v4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                  お車でお越しの方
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>横浜横須賀道路「逗子IC」より約10分</li>
                  <li>
                    ※専用駐車場はございません。近隣のコインパーキングをご利用ください
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Barrier Free */}
          <section>
            <h2 className="text-xl font-medium mb-6">バリアフリー情報</h2>

            <div className="bg-white/5 p-6 border border-white/10">
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  車椅子席あり（事前予約が必要です）
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  エレベーター完備
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  多目的トイレあり
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  補助犬同伴可
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
