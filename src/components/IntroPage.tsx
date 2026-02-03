"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCurtainOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        // ✅ 따뜻한 웜그레이 배경 + 살짝 베이지
        background:
          "radial-gradient(1200px 600px at 50% 20%, #F6F2ED 0%, #E8E6E1 55%, #E3E1DB 100%)",
      }}
    >
      {/* ✅ 종이 질감(아주 은은하게) */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(124, 109, 92, 0.45) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* ✅ 은은한 비네팅 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 520px at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* 작은 연극장 프레임 */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-[290px] h-[390px] rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.18)] overflow-hidden"
        style={{
          // ✅ 카드도 완전 흰색 대신 아이보리
          background:
            "linear-gradient(180deg, #FAF6F0 0%, #F6F2ED 45%, #F3EFE9 100%)",
          border: "1px solid rgba(181, 166, 149, 0.35)",
        }}
      >
        {/* 무대 상단 장식 */}
        <div
          className="absolute top-0 left-0 right-0 h-9 z-40 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(to bottom, #5F735D 0%, #4A5D4E 65%, #3F5144 100%)",
          }}
        >
          {/* 무대 커튼 레일 */}
          <div
            className="w-20 h-[14px] rounded-b-full"
            style={{
              background: "linear-gradient(180deg, #D9CABB 0%, #C9B7A6 100%)",
              opacity: 0.95,
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* ✅ 커튼 - 왼쪽 */}
{/* 커튼 - 왼쪽 */}
        <motion.div
          initial={{
            x: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          animate={
            curtainOpen
              ? {
                  // ✅ 전체적으로 왼쪽으로 빠지면서,
                  x: "-115%",
                  // ✅ 안쪽(오른쪽) 경계가 위보다 아래가 더 많이 열리게(사다리꼴)
                  clipPath: [
                    "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // 닫힘
                    "polygon(0 0, 80% 0, 45% 100%, 0 100%)",  // 중간: 아래가 더 열림
                    "polygon(0 0, 65% 0, 25% 100%, 0 100%)",  // 끝: 아래가 크게 열림
                  ],
                }
              : {
                  x: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }
          }
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            times: [0, 0.6, 1], // clipPath keyframe 진행 타이밍
          }}
          className="absolute left-0 top-9 w-1/2 h-[calc(100%-36px)] z-30"
          style={{
            background:
              "linear-gradient(90deg, #3E5346 0%, #4A5D4E 35%, #5E7560 60%, #3E5346 100%)",
            boxShadow: "inset -16px 0 26px rgba(0,0,0,0.28)",
          }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 10px, transparent 18px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </motion.div>

        {/* ✅ 커튼 - 오른쪽 */}
{/* 커튼 - 오른쪽 */}
        <motion.div
          initial={{
            x: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          animate={
            curtainOpen
              ? {
                  x: "115%",
                  // ✅ 안쪽(왼쪽) 경계가 위보다 아래가 더 많이 열리게(사다리꼴)
                  clipPath: [
                    "polygon(0 0, 100% 0, 100% 100%, 0 100%)",  // 닫힘
                    "polygon(20% 0, 100% 0, 100% 100%, 55% 100%)", // 중간: 아래가 더 열림
                    "polygon(35% 0, 100% 0, 100% 100%, 75% 100%)", // 끝: 아래가 크게 열림
                  ],
                }
              : {
                  x: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }
          }
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
          className="absolute right-0 top-9 w-1/2 h-[calc(100%-36px)] z-30"
          style={{
            background:
              "linear-gradient(270deg, #3E5346 0%, #4A5D4E 35%, #5E7560 60%, #3E5346 100%)",
            boxShadow: "inset 16px 0 26px rgba(0,0,0,0.28)",
          }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "repeating-linear-gradient(270deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 10px, transparent 18px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </motion.div>

        {/* 무대 안쪽 */}
        <div className="absolute inset-0 top-9 flex flex-col items-center justify-center px-7 text-center">
          {/* ✅ 무대 중앙에 아주 은은한 빛 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(220px 170px at 50% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 70%)",
              opacity: 0.75,
            }}
          />

          <AnimatePresence>
            {curtainOpen && (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="text-sm mb-6 leading-relaxed"
                  style={{
                    fontFamily: "'Gowun Batang', serif",
                    color: "#3E3D3A",
                    letterSpacing: "0.02em",
                  }}
                >
                  소중한 분들을 모시고자 합니다.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.75, duration: 0.7 }}
                  className="text-base mb-5 tracking-wide leading-relaxed"
                  style={{
                    fontFamily: "'Gowun Batang', serif",
                    color: "#1F1E1C",
                    letterSpacing: "0.06em",
                  }}
                >
                  이주강 김은지의<br />
                  결혼식에 초대합니다.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.6 }}
                  className="text-sm mb-1"
                  style={{
                    fontFamily: "'Gowun Batang', serif",
                    color: "#2E2D2A",
                    letterSpacing: "0.04em",
                  }}
                >
                  2026. 5. 16 (토) 14:00
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.45, duration: 0.6 }}
                  className="text-sm mb-10"
                  style={{
                    fontFamily: "'Gowun Batang', serif",
                    color: "#2E2D2A",
                    letterSpacing: "0.04em",
                  }}
                >
                  비렌티 베르테홀
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.85, duration: 0.65 }}
                  onClick={onEnter}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="
                    px-6 py-3 text-sm
                    rounded-xl
                    border
                    transition
                    min-h-0 min-w-0
                  "
                  style={{
                    fontFamily: "'Gowun Batang', serif",
                    color: "#1F1E1C",
                    borderColor: "rgba(74, 93, 78, 0.55)",
                    background: "linear-gradient(180deg, #FBF7F1 0%, #F3EFE9 100%)",
                    boxShadow:
                      "0 10px 22px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
                    letterSpacing: "0.14em",
                  }}
                >
                  청첩장 보기
                </motion.button>

              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
