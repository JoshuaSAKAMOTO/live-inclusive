import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { performers } from "@/data/performers";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return performers.map((performer) => ({
    id: performer.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const performer = performers.find((p) => p.id === id);

  if (!performer) {
    return { title: "出演者が見つかりません" };
  }

  return {
    title: performer.name,
    description: `${performer.name} - ${performer.role}`,
  };
}

const snsIcons: Record<string, React.ReactNode> = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  website: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
};

export default async function PerformerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const performer = performers.find((p) => p.id === id);

  if (!performer) {
    notFound();
  }

  const currentIndex = performers.findIndex((p) => p.id === id);
  const prevPerformer = currentIndex > 0 ? performers[currentIndex - 1] : null;
  const nextPerformer =
    currentIndex < performers.length - 1 ? performers[currentIndex + 1] : null;

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/performers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            出演者一覧へ戻る
          </Link>

          {/* Performer Content */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Photo */}
            <div className="aspect-[3/4] relative bg-white/5 overflow-hidden">
              {performer.photo ? (
                <Image
                  src={performer.photo}
                  alt={performer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <svg
                    className="w-32 h-32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-sm text-primary mb-2">{performer.role}</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {performer.name}
              </h1>
              <p className="text-sm text-white/40 mb-8">{performer.nameKana}</p>

              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {performer.profile}
                </p>
              </div>

              {/* SNS Links */}
              {performer.sns && performer.sns.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-sm text-white/50 mb-4">SNS</h2>
                  <div className="flex gap-4">
                    {performer.sns.map((link) => (
                      <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.type}を開く（新しいタブ）`}
                        className="text-white/60 hover:text-primary transition-colors"
                      >
                        {snsIcons[link.type]}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-24 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center">
              {prevPerformer ? (
                <Link
                  href={`/performers/${prevPerformer.id}`}
                  className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>
                    <span className="block text-xs text-white/40">PREV</span>
                    <span className="group-hover:text-white transition-colors">
                      {prevPerformer.name}
                    </span>
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPerformer ? (
                <Link
                  href={`/performers/${nextPerformer.id}`}
                  className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors text-right"
                >
                  <span>
                    <span className="block text-xs text-white/40">NEXT</span>
                    <span className="group-hover:text-white transition-colors">
                      {nextPerformer.name}
                    </span>
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
