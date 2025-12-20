import Link from "next/link";
import Image from "next/image";
import { siteConfig, navItems } from "@/data/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-6">
          {/* Site Info */}
          <div>
            <div className="text-sm text-white/60 leading-relaxed space-y-2 mb-6">
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
              <p>
                <span className="text-white/80">助成：</span>
                神奈川県マグカル展開促進助成
              </p>
              <p>
                <span className="text-white/80">協力：</span>
                湘南ミュージックハイスクール
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Image
                src="/images/mag-cul.jpg"
                alt="神奈川文化プログラム マグカル"
                width={128}
                height={128}
                className="h-32 w-auto"
              />
              <Image
                src="/images/fmy_logo.svg"
                alt="横浜エフエム放送"
                width={128}
                height={128}
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-white/80">MENU</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-white/80">CONTACT</h3>
            <div className="text-sm text-white/60">
              <p>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  お問い合わせフォーム
                </Link>
              </p>
            </div>
            <div className="mt-6">
              <SocialLinks links={siteConfig.socialLinks} />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
