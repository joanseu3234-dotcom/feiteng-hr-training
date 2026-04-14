import type { Attachment } from "@/lib/types";

const typeMeta: Record<
  Attachment["type"],
  { label: string; icon: string; color: string }
> = {
  pdf: { label: "PDF", icon: "📄", color: "bg-rose-100 text-rose-700" },
  docx: { label: "Word", icon: "📝", color: "bg-blue-100 text-blue-700" },
  xlsx: { label: "Excel", icon: "📊", color: "bg-emerald-100 text-emerald-700" },
  pptx: {
    label: "PowerPoint",
    icon: "📽️",
    color: "bg-orange-100 text-orange-700",
  },
  video: { label: "影片", icon: "🎬", color: "bg-purple-100 text-purple-700" },
  link: { label: "連結", icon: "🔗", color: "bg-gray-100 text-gray-700" },
};

export default function AttachmentCard({ attachment }: { attachment: Attachment }) {
  const meta = typeMeta[attachment.type];
  const hasFile = attachment.filename.length > 0;
  const href = hasFile
    ? `/files/${encodeURIComponent(attachment.filename)}`
    : attachment.externalUrl;

  const content = (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-300 hover:shadow-sm transition">
      <div className="text-2xl">{meta.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${meta.color}`}>
            {meta.label}
          </span>
          {hasFile && (
            <span className="text-xs text-gray-400">點擊下載</span>
          )}
        </div>
        <div className="font-medium text-gray-900 truncate">
          {attachment.displayName}
        </div>
        {attachment.description && (
          <div className="text-sm text-gray-600 mt-1">
            {attachment.description}
          </div>
        )}
        {attachment.note && (
          <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded whitespace-pre-wrap break-all">
            {attachment.note}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }
  return content;
}
