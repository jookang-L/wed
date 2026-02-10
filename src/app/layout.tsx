import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Alex_Brush } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// ✅ 본문용 폰트: Gowun Batang (고운바탕)
const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// ✅ 영문 필기체: Alex Brush
const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  // ✅ 배포 도메인 (상대경로 OG 이미지가 절대경로로 변환됨)
  metadataBase: new URL("https://wed-amber-sigma.vercel.app/"),

  title: "이주강 ❤️ 김은지 결혼식에 초대합니다",
  description: "2026년 5월 16일 토요일 오후 2시, 비렌티 베르테홀",

  openGraph: {
    title: "이주강 ❤️ 김은지 결혼식 초대장",
    description: "2026.05.16 14:00 비렌티",
    url: "/", // (선택이지만 안정적)
    type: "website",
    images: [
      {
        url: "/og.jpg", // ✅ public/og.jpg
        width: 800,
        height: 400,
        alt: "이주강 ❤️ 김은지 결혼식 초대장",
      },
    ],
  },

  // ✅ 트위터/기타 공유 미리보기 안정화
  twitter: {
    card: "summary_large_image",
    title: "이주강 ❤️ 김은지 결혼식 초대장",
    description: "2026.05.16 14:00 비렌티",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${gowunBatang.variable} ${alexBrush.variable}`}
    >
      <head>
        {/* 네이버 지도 스크립트 (신규 API) */}
        <Script
          strategy="beforeInteractive"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=qhsn30jt44"
        />
      </head>
      <body className={gowunBatang.className}>
        <main className="mobile-container">{children}</main>
      </body>
    </html>
  );
}
