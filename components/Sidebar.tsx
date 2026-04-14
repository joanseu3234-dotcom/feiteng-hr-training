"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { chapters } from "@/lib/chapters";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <Link href="/" className="font-bold text-brand-700">
          飛騰人事教育訓練
        </Link>
        <button
          aria-label="切換選單"
          className="p-2 rounded border border-gray-300 text-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } lg:block lg:sticky lg:top-0 lg:h-screen w-full lg:w-72 flex-shrink-0 bg-white border-r border-gray-200`}
      >
        <div className="h-full overflow-y-auto sidebar-scroll">
          <div className="px-5 py-6 border-b border-gray-100">
            <Link href="/" onClick={() => setOpen(false)}>
              <div className="text-xs text-brand-600 font-medium mb-1">
                IB 直效行銷部
              </div>
              <div className="text-lg font-bold text-gray-900 leading-tight">
                飛騰人事系統
                <br />
                主管交接教育訓練
              </div>
            </Link>
            <div className="mt-3 text-xs text-gray-500">
              適用系統：飛騰雲端 IPCC
              <br />
              資料截止：2025-11-28
            </div>
          </div>

          <nav className="px-3 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded text-sm font-medium mb-1 ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              🏠 首頁 / 總覽
            </Link>

            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              章節
            </div>

            <ul className="space-y-0.5">
              {chapters.map((c) => {
                const href = `/chapters/${c.slug}`;
                const active = pathname === href;
                return (
                  <li key={c.slug}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded text-sm leading-snug ${
                        active
                          ? "bg-brand-50 text-brand-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-xs text-gray-500 mr-2">
                        {c.number}
                      </span>
                      {c.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 py-4 border-t border-gray-100 text-xs text-gray-500">
            若有疑問請洽 HR 部門
          </div>
        </div>
      </aside>
    </>
  );
}
