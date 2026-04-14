import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "飛騰人事系統 主管交接教育訓練",
  description:
    "直效行銷部主管交接手冊 — 飛騰雲端人事系統（IPCC）完整 SOP、班別代碼、薪資作業教育訓練網站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="min-h-screen flex flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
