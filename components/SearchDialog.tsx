"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { chapters } from "@/lib/chapters";
import type { Chapter, Section, Block } from "@/lib/types";

/* ── 建立搜尋索引（靜態，只跑一次）── */
interface SearchEntry {
  chapterSlug: string;
  chapterNumber: string;
  chapterTitle: string;
  sectionId: string;
  sectionHeading: string;
  text: string; // 可搜尋的純文字
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const ch of chapters) {
    for (const sec of ch.sections) {
      const texts: string[] = [sec.heading, sec.source ?? ""];
      for (const b of sec.blocks) {
        switch (b.type) {
          case "paragraph":
            texts.push(b.text);
            break;
          case "heading":
            texts.push(b.text);
            break;
          case "list":
            texts.push(...b.items);
            break;
          case "table":
            texts.push(...b.headers);
            for (const row of b.rows) texts.push(...row);
            break;
          case "callout":
            texts.push(b.title ?? "", b.text);
            break;
        }
      }
      entries.push({
        chapterSlug: ch.slug,
        chapterNumber: ch.number,
        chapterTitle: ch.title,
        sectionId: sec.id,
        sectionHeading: sec.heading,
        text: texts.join(" "),
      });
    }
  }
  return entries;
}

/* ── 搜尋按鈕 + 彈窗 ── */
export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  // 鍵盤快捷鍵 Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    if (!open) setQuery("");
  }, [open]);

  // 搜尋邏輯
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    const keywords = q.split(/\s+/);
    return index
      .filter((entry) =>
        keywords.every((kw) => entry.text.toLowerCase().includes(kw))
      )
      .slice(0, 20);
  }, [query, index]);

  // 高亮片段
  function getSnippet(text: string, q: string): string {
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q.split(/\s+/)[0] || "");
    if (idx === -1) return text.slice(0, 80) + "...";
    const start = Math.max(0, idx - 30);
    const end = Math.min(text.length, idx + 50);
    return (
      (start > 0 ? "..." : "") +
      text.slice(start, end) +
      (end < text.length ? "..." : "")
    );
  }

  return (
    <>
      {/* 搜尋按鈕 */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-brand-300 text-sm text-gray-500 transition"
      >
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="flex-1 text-left">搜尋...</span>
        <kbd className="hidden sm:inline text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
          Ctrl+K
        </kbd>
      </button>

      {/* 搜尋彈窗 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={() => setOpen(false)}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* 彈窗主體 */}
          <div
            className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 搜尋輸入 */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="輸入關鍵字搜尋（如：薪資、排班、加班）"
                className="flex-1 text-base outline-none bg-transparent placeholder:text-gray-400"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-100"
              >
                ESC
              </button>
            </div>

            {/* 搜尋結果 */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim().length > 0 && results.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  找不到「{query}」的相關結果
                </div>
              )}
              {results.length > 0 && (
                <ul className="py-2">
                  {results.map((r, i) => (
                    <li key={i}>
                      <Link
                        href={`/chapters/${r.chapterSlug}#${r.sectionId}`}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 hover:bg-brand-50 transition"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                            {r.chapterNumber}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {r.sectionHeading}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-5 line-clamp-2">
                          {getSnippet(r.text, query.trim().toLowerCase())}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {query.trim().length === 0 && (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">
                  輸入關鍵字開始搜尋全部章節內容
                </div>
              )}
            </div>

            {/* 底部提示 */}
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-4">
              <span>↑↓ 瀏覽</span>
              <span>↵ 前往</span>
              <span>ESC 關閉</span>
              <span className="ml-auto">
                {results.length > 0 && `找到 ${results.length} 筆結果`}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
