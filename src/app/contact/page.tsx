import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/components/contact-form";
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

            <ContactForm />

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
