import type { Block } from "@/lib/types";

type Variant = Extract<Block, { type: "callout" }>["variant"];

const variants: Record<
  Variant,
  { label: string; icon: string; bg: string; border: string; text: string }
> = {
  info: {
    label: "資訊",
    icon: "ℹ️",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
  },
  warning: {
    label: "注意",
    icon: "⚠️",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-900",
  },
  tip: {
    label: "提示",
    icon: "💡",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
  },
  important: {
    label: "重要",
    icon: "📌",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-900",
  },
  note: {
    label: "備註",
    icon: "📝",
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-800",
  },
};

export default function Callout({
  variant,
  title,
  text,
}: {
  variant: Variant;
  title?: string;
  text: string;
}) {
  const v = variants[variant];
  return (
    <div
      className={`not-prose my-5 rounded-lg border ${v.border} ${v.bg} px-4 py-3`}
    >
      <div className="flex items-start gap-3">
        <div className="text-lg leading-6">{v.icon}</div>
        <div className={`flex-1 ${v.text}`}>
          <div className="font-semibold mb-1">
            {title ?? v.label}
          </div>
          <div className="text-sm leading-6 whitespace-pre-wrap">{text}</div>
        </div>
      </div>
    </div>
  );
}
