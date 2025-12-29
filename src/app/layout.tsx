import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "이주강 ❤️ 김은지 결혼식에 초대합니다",
  description: "2026년 5월 16일 토요일 오후 2시, 비렌티 베르테홀",
  openGraph: {
    title: "이주강 ❤️ 김은지 결혼식 초대장",
    description: "2026.05.16 14:00 비렌티",
    images: ["/wed1.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Gowun+Batang:wght@400;700&family=Nanum+Myeongjo:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
        {/* 네이버 지도 스크립트 (신규 API) */}
        <Script
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=qhsn30jt44`}
        />
      </head>
      <body>
        <main className="mobile-container">
          {children}
        </main>
      </body>
    </html>
  );
}
