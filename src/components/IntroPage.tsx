"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [curtainOpen, setCurtainOpen] = useState(false);

  const handleOpenCurtain = () => {
    setCurtainOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#E8E6E1" }}
    >
      {/* 배경 패턴 - 은은한 도트 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, #D4C3B3 1px, transparent 0)",
          backgroundSize: "30px 30px"
        }}
      />

      {/* 작은 연극장 프레임 */}
      <div className="relative w-[280px] h-[380px] bg-white rounded-lg shadow-xl overflow-hidden border border-[#E5DDD5]">
        
        {/* 무대 상단 장식 */}
        <div 
          className="absolute top-0 left-0 right-0 h-8 z-40 flex items-center justify-center"
          style={{
            background: "linear-gradient(to bottom, #5C6F5A 0%, #4A5D4E 100%)",
          }}
        >
          <div className="w-16 h-4 bg-[#D4C3B3] rounded-b-full opacity-90" />
        </div>

        {/* 커튼 - 왼쪽 */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: curtainOpen ? "-100%" : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-0 top-8 w-1/2 h-[calc(100%-32px)] z-30"
          style={{
            background: "linear-gradient(to right, #4A5D4E 0%, #5C6F5A 50%, #4A5D4E 100%)",
            boxShadow: "inset -10px 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{
              background: "repeating-linear-gradient(to right, transparent 0px, transparent 15px, rgba(0,0,0,0.15) 15px, rgba(0,0,0,0.15) 18px)"
            }}
          />
        </motion.div>

        {/* 커튼 - 오른쪽 */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: curtainOpen ? "100%" : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute right-0 top-8 w-1/2 h-[calc(100%-32px)] z-30"
          style={{
            background: "linear-gradient(to left, #4A5D4E 0%, #5C6F5A 50%, #4A5D4E 100%)",
            boxShadow: "inset 10px 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{
              background: "repeating-linear-gradient(to left, transparent 0px, transparent 15px, rgba(0,0,0,0.15) 15px, rgba(0,0,0,0.15) 18px)"
            }}
          />
        </motion.div>

        {/* 무대 안쪽 (커튼 뒤) */}
        <div className="absolute inset-0 top-8 bg-[#FAF9F7] flex flex-col items-center justify-center px-6 text-center">
          <AnimatePresence>
            {curtainOpen && (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-xs mb-6 leading-relaxed"
                  style={{ fontFamily: "'Gowun Batang', serif", color: "#7A7A7A" }}
                >
                  소중한 분들을 모시고자 합니다.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="text-sm mb-5 tracking-wide"
                  style={{ fontFamily: "'Gowun Batang', serif", color: "#2D2A26" }}
                >
                  이주강 김은지의<br />결혼식에 초대합니다.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="text-xs mb-1"
                  style={{ fontFamily: "'Gowun Batang', serif", color: "#9A9A9A" }}
                >
                  2026. 5. 16 (토) 14:00
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="text-xs mb-10"
                  style={{ fontFamily: "'Gowun Batang', serif", color: "#9A9A9A" }}
                >
                  비렌티 베르테홀
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  onClick={onEnter}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 border rounded-full text-xs tracking-wider transition-colors"
                  style={{ 
                    fontFamily: "'Gowun Batang', serif",
                    borderColor: "#4A5D4E",
                    color: "#4A5D4E",
                    backgroundColor: "transparent"
                  }}
                >
                  청첩장 보기
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* 커튼 열기 버튼 (커튼 위에) */}
        <AnimatePresence>
          {!curtainOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 top-8 flex items-center justify-center z-50"
            >
              <motion.button
                onClick={handleOpenCurtain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-white/80 backdrop-blur-sm border rounded-full text-xs tracking-wider transition-colors shadow-sm"
                style={{ 
                  fontFamily: "'Gowun Batang', serif",
                  borderColor: "#D4C3B3",
                  color: "#4A5D4E"
                }}
              >
                커튼 열기
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
