"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="p-0 h-screen relative overflow-hidden">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/wed1.jpg')" }}
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
      <div className="absolute inset-x-0 bottom-24 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: "min(18vw, 75px)",
            color: "#facc15",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
            fontWeight: 400,
            lineHeight: 0.95,
            textAlign: "left",
          }}
        >
          <div>Our First</div>
          <div>Anniversary</div>
        </motion.div>
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
