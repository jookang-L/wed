"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="p-0 h-screen relative overflow-hidden">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main.webp')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* 상단 신랑신부 이름 - 고운바탕 폰트 */}
      <div className="absolute top-6 left-0 right-0 text-white z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
          style={{ 
            fontFamily: "'Gowun Batang', serif",
            fontSize: "14px",
            letterSpacing: "0.1em",
            fontWeight: 400,
          }}
        >
          이주강 김은지
        </motion.div>
      </div>

      {/* 메인 타이틀 - Our First Anniversary (Alex Brush) */}
      <div className="absolute inset-x-0 bottom-28 z-20">
        {/* 폭 제한은 하되, 잘림 방지 */}
        <div className="mx-auto w-full max-w-[360px] px-5 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-block -translate-x-2"   // ✅ 살짝 왼쪽으로 당겨서 오른쪽 잘림 방지
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: "clamp(32px, 13.5vw, 70px)",   // ✅ 아주 살짝만 줄여서 안정화
              color: "#facc15",
              textShadow:
                "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
              fontWeight: 400,
              lineHeight: 0.95,
              textAlign: "left",
              transformOrigin: "left center",
              whiteSpace: "nowrap", // ✅ Wedding 줄바꿈/쪼개짐 방지(전체에 적용)
            }}
          >
            <div style={{ whiteSpace: "normal" }}>Welcome</div>
            <div>to our Wedding</div>
          </motion.div>
        </div>
      </div>


      {/* 날짜 정보 - 고운바탕 폰트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-center opacity-90"
        style={{ 
          fontFamily: "'Gowun Batang', serif",
          fontSize: "14px",
          letterSpacing: "0.1em",
          fontWeight: 400,
        }}
      >
        2026.05.16
      </motion.div>
    </section>
  );
}
