import { Header, Footer } from "@/components/layout";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "逗子ライブインクルーシブへのお問い合わせ",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              CONTACT
            </h1>
            <p className="text-white/60">お問い合わせ</p>
          </div>

          {/* Contact Info */}
          <section className="mb-16">
            <div className="bg-white/5 p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-sm text-white/50 mb-2">お電話</h2>
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="text-2xl hover:text-primary transition-colors"
                >
                  {siteConfig.contactPhone}
                </a>
              </div>

              <div>
                <h2 className="text-sm text-white/50 mb-2">メール</h2>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-lg hover:text-primary transition-colors break-all"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-xl font-medium mb-8">
              お問い合わせフォーム
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-white/70 mb-2"
                >
                  お名前 <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-white/70 mb-2"
                >
                  メールアドレス <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-white/70 mb-2"
                >
                  お電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm text-white/70 mb-2"
                >
                  お問い合わせ種別 <span className="text-primary">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">選択してください</option>
                  <option value="ticket">チケットについて</option>
                  <option value="wheelchair">車椅子席について</option>
                  <option value="sponsorship">協賛・後援について</option>
                  <option value="media">取材・メディアについて</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-white/70 mb-2"
                >
                  お問い合わせ内容 <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-black font-medium hover:bg-primary-dark transition-colors"
                >
                  送信する
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-white/50">
              ※お問い合わせの内容によっては、返信にお時間をいただく場合がございます。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
