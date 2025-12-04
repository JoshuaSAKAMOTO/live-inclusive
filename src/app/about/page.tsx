import { Header, Footer } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "逗子ライブインクルーシブについて - コンセプトと理念",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              ABOUT
            </h1>
            <p className="text-white/60">逗子ライブインクルーシブについて</p>
          </div>

          {/* Main Statement */}
          <section className="mb-20">
            <blockquote className="text-2xl md:text-3xl font-medium text-center leading-relaxed">
              「音楽は、最初からずっと、
              <br />
              インクルーシブだ」
            </blockquote>
          </section>

          {/* Content */}
          <section className="space-y-8 text-white/80 leading-loose">
            <p>
              海と山に囲まれた、穏やかな空気が流れる逗子。
              この地で、誰もが楽しめる音楽コンサートを開催します。
            </p>

            <p>
              「逗子ライブインクルーシブ」は、障がい者アーティストと
              トップアーティストが共演するインクルーシブなコンサートです。
            </p>

            <p>
              ジャンルの垣根はありません。
              主役も脇役もありません。
              ステージの上では、すべてのアーティストが対等に、
              それぞれの音楽を奏でます。
            </p>

            <p>
              ミュージカル、ポップス、タンゴ、ブルース——
              さまざまなジャンルのアーティストたちが、
              ひとつのステージで共演する。
              それは、音楽の本質的な姿だと私たちは考えています。
            </p>

            <p>
              音楽は、聴く人を選びません。
              音楽は、演奏する人を選びません。
              音楽は、最初からずっと、インクルーシブなのです。
            </p>

            <p>
              私たちは、この逗子から、
              誰もが楽しめる音楽の形を発信していきます。
            </p>
          </section>

          {/* Team */}
          <section className="mt-20 pt-16 border-t border-white/10">
            <h2 className="text-xl font-medium mb-8">主催</h2>

            <div className="space-y-6">
              <div>
                <p className="text-white/50 text-sm mb-1">実行委員長</p>
                <p className="text-lg">宮澤久美</p>
              </div>
              <div>
                <p className="text-white/50 text-sm mb-1">プロデューサー</p>
                <p className="text-lg">坂本淳</p>
              </div>
            </div>
          </section>

          {/* Supporters */}
          <section className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-xl font-medium mb-8">後援・協力</h2>

            <div className="text-white/60 space-y-2">
              <p>神奈川県「マグカル」採択事業</p>
              <p>逗子市</p>
              <p>逗子市教育委員会</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
