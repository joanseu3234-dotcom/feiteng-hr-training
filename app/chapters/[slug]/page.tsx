import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getAllSlugs, getChapterBySlug } from "@/lib/chapters";
import BlockRenderer from "@/components/BlockRenderer";
import AttachmentCard from "@/components/AttachmentCard";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) return { title: "找不到章節" };
  return {
    title: `${chapter.number} ${chapter.title} — 飛騰人事系統教育訓練`,
    description: chapter.summary,
  };
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) notFound();

  const idx = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-700">
          首頁
        </Link>
        <span className="mx-2">/</span>
        <span>{chapter.number}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-6 border-b border-gray-200">
        <div className="text-sm font-medium text-brand-600 mb-2">
          {chapter.number}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          {chapter.title}
        </h1>
        <p className="text-gray-600 leading-7 text-base lg:text-lg">
          {chapter.summary}
        </p>
      </header>

      {/* TOC（若 section 較多才顯示） */}
      {chapter.sections.length > 1 && (
        <div className="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            本章目錄
          </div>
          <ul className="space-y-1.5">
            {chapter.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-gray-700 hover:text-brand-700"
                >
                  · {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections */}
      {chapter.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mb-12 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {section.heading}
          </h2>
          {section.source && (
            <div className="text-xs text-gray-500 mb-4 italic">
              來源：{section.source}
            </div>
          )}

          <BlockRenderer blocks={section.blocks} />

          {section.attachments && section.attachments.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                📎 相關附件
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {section.attachments.map((a, i) => (
                  <AttachmentCard key={i} attachment={a} />
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Prev / Next */}
      <nav className="mt-16 pt-8 border-t border-gray-200 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm transition"
          >
            <div className="text-xs text-gray-500 mb-1">← 上一章</div>
            <div className="font-medium text-gray-900">
              {prev.number} {prev.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm transition sm:text-right"
          >
            <div className="text-xs text-gray-500 mb-1">下一章 →</div>
            <div className="font-medium text-gray-900">
              {next.number} {next.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
