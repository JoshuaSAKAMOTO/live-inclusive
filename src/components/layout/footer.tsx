import Link from "next/link";
import { siteConfig, navItems } from "@/data/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Site Info */}
          <div>
            <h2 className="text-lg font-medium mb-4">{siteConfig.name}</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {siteConfig.description}
            </p>
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
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
