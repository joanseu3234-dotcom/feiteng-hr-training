import Link from "next/link";
import { chapters } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-8 lg:p-12 mb-10">
        <div className="relative z-10">
          <div className="inline-block text-xs font-medium bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-4">
            IB 交接專用版
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            飛騰人事系統
            <br />
            主管交接教育訓練
          </h1>
          <p className="text-white/90 text-base lg:text-lg leading-7 max-w-2xl">
            完整 SOP · 班別代碼 · 薪資作業 —
            直效行銷部主管、儲備主管、排班人員教育訓練專用。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/chapters/01-login"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-50 transition"
            >
              開始閱讀 →
            </Link>
            <a
              href="https://scsrwd.azurewebsites.net/scsweb/IPCC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/20 transition"
            >
              前往系統 ↗
            </a>
          </div>
        </div>
      </section>

      {/* Meta */}
      <section className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">適用系統</div>
          <div className="font-semibold text-gray-900">
            飛騰雲端人事系統 (IPCC)
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">資料截止日</div>
          <div className="font-semibold text-gray-900">2025 年 11 月 28 日</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">適用對象</div>
          <div className="font-semibold text-gray-900">
            主管 / 儲備主管 / 排班人員
          </div>
        </div>
      </section>

      {/* Chapter list */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-5">章節目錄</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {chapters.map((c, idx) => (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-400 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100">
                  {idx === chapters.length - 1 ? "附" : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-1">
                    {c.number}
                  </div>
                  <div className="font-semibold text-gray-900 group-hover:text-brand-700">
                    {c.title}
                  </div>
                  <p className="text-sm text-gray-600 mt-1.5 leading-6 line-clamp-2">
                    {c.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
        本手冊依「飛騰-人事系統」資料夾內所有檔案實際內容彙整製作，若有疑問請洽
        HR 部門。
      </footer>
    </div>
  );
}
