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

{/*               <div className="mt-8 space-y-4 text-lg">
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
                  鎌倉市/横須賀市/藤沢市（予定）/葉山町（予定）
                </p>
                <Image
                  src="/images/fmy_logo.svg"
                  alt="横浜エフエム放送"
                  width={128}
                  height={128}
                  className="h-10 w-auto"
                />
                <p>
                  <span className="text-white/80">助成：</span>
                  神奈川県マグカル展開促進助成
                </p>
                <p>
                  <span className="text-white/80">協力：</span>
                  湘南ミュージックハイスクール
                </p>
                <div className="flex gap-6 items-center mt-4">
                  <Image
                    src="/images/mag-cul.jpg"
                    alt="神奈川文化プログラム マグカル"
                    width={128}
                    height={128}
                    className="h-32 w-auto"
                  />
                  <Image
                    src="/images/smh_logo.jpg"
                    alt="湘南ミュージックハイスクール"
                    width={128}
                    height={128}
                    className="h-12 w-auto"
                  />
                </div>
              </div> */}
            </div>
          </section>

          {/* Preschool Children Policy */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">未就学児の対応につきまして</h2>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                これまで、実行委員の中で、「インクルーシブを名乗っているのに、対象が小学生以上というのは矛盾しているのではないか？」と自問を続けてきました。
              </p>
              <p>
                最も重視すべきは、2時間の音楽コンサートを「楽しめる」年齢はいくつからなのかということで、もちろんこれには明確な答えはないものの、実行委員会で議論を重ね、過去2回に引き続き「小学生以上」としました。音量などの面から小さなお子様には負担になる可能性があると判断した結果です。
              </p>
              <p>
                インクルーシブとは、全員が心地よくなるだけでなく、互いに少しずつ譲り合うことでもあると考えます。この基準が正解と断じることはできませんが、寛容で認め合える社会の在り方を今後も模索してまいります。
              </p>
              <p>ご理解のほどよろしくお願いいたします。</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
