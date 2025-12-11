import { Header, Footer } from "@/components/layout";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このコンサートについて",
  description: "逗子ライブインクルーシブについて",
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
          </div>

          {/* Statement */}
          <section className="mb-16">
            <div className="space-y-8 text-white/80 leading-relaxed text-lg">
              <p>
                逗子ライブインクルーシブはさまざまなジャンルの音楽が体験できる、新しいスタイルのコンサートです。お客様には、ご自身の好きなジャンルを楽しむことと、これまで少し縁遠かったジャンルとの出会いという、二つの要素をご体験いただけます。
              </p>
              <p>
                コンサートは出演者それぞれが選んだ曲を演奏する「ソリストパート」と、アーティスト同士が共演することで新たな魅力を引き出す「コラボパート」の二部構成となります。ポップス、ロック、ジャズ、そしてアニメの名曲や雄々しい太鼓の響きまで、垣根を越えた音楽の魅力をどうぞお楽しみください。
              </p>
            </div>

            <div className="mt-12 text-white/70">
              <p>逗子ライブインクルーシブ実行委員会</p>
              <p>実行委員長　宮澤久美</p>

              <div className="mt-8 space-y-4 text-lg">
                <p>
                  <span className="text-white/80">主催：</span>
                  逗子ライブインクルーシブ実行委員会/逗子文化プラザ市民交流センター
                </p>
                <p>
                  <span className="text-white/80">共催：</span>
                  逗子文化プラザホール(指定管理者:逗子文化プラザパートナーズ)/逗子市
                </p>
                <p>
                  <span className="text-white/80">後援：</span>
                  神奈川県/逗子市教育委員会/逗子市社会福祉協議会
                  <br />
                  <span className="text-white/80 invisible">後援：</span>
                  鎌倉市（予定）/横須賀市/藤沢市（予定）/葉山町（予定）
                </p>
                <p>
                  <span className="text-white/80">助成：</span>
                  神奈川県マグカル展開促進助成
                </p>
                <Image
                  src="/images/mag-cul.jpg"
                  alt="神奈川文化プログラム マグカル"
                  width={128}
                  height={128}
                  className="h-32 w-auto mt-4"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
