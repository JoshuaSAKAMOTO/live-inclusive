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
                逗子文化プラザホール/逗子市
              </p>
              <p>
                <span className="text-white/80">後援：</span>
                逗子市教育委員会/逗子市社会福祉協議会/神奈川県
                <br />
                <span className="text-white/80 invisible">後援：</span>
                鎌倉市（予定）/横須賀市/葉山町（予定）
              </p>
              <p>
                <span className="text-white/80">助成：</span>
                神奈川県マグカル展開促進助成
              </p>
            </div>
            <Image
              src="/images/mag-cul.jpg"
              alt="神奈川文化プログラム マグカル"
              width={128}
              height={128}
              className="h-32 w-auto"
            />
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
            <div className="space-y-2 text-sm text-white/60">
              <p>
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contactPhone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
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
