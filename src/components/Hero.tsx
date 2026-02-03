"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="p-0 h-screen relative overflow-hidden sm:overflow-visible">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main.webp')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* 상단 신랑신부 이름 */}
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

      {/* 메인 타이틀 */}
      <div className="absolute inset-x-0 bottom-28 z-20">
        {/* ✅ 모바일 컨테이너(400px) 안에서 좌우 여백 확보 + 잘림 방지 */}
        <div className="mx-auto w-full max-w-[360px] px-5 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-block -translate-x-2 sm:-translate-x-4"
            style={{
              fontFamily: "'Alex Brush', cursive",

              // ✅ 모바일에서 더 크게: min을 올리고 vw도 소폭 증가
              // - 모바일: 더 시원하게 커짐
              // - 컨테이너 폭 제한 + translate로 잘림 방지
              fontSize: "clamp(38px, 15vw, 74px)",

              color: "#facc15",
              textShadow:
                "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
              fontWeight: 400,
              lineHeight: 0.95,
              textAlign: "left",

              // ✅ 회전 기준 고정(튀어나옴 완화)
              transformOrigin: "left center",
            }}
          >
            <div>Welcome</div>

            {/* ✅ 무조건 한 줄 */}
            <div style={{ whiteSpace: "nowrap" }}>to our Wedding</div>
          </motion.div>
        </div>
      </div>

      {/* 날짜 정보 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-center opacity-90 z-20"
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