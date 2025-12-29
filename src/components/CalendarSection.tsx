"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CalendarSection() {
  const [dDay, setDDay] = useState<number | null>(null);
  const [showSlot, setShowSlot] = useState(false);

  useEffect(() => {
    const target = new Date("2026-05-16T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    setDDay(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  // 5월 3일(일)부터 23일(토)까지 - 3주
  const calendarDays = [
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
  ];

  // 슬롯머신 롤링 효과
  const SlotNumber = ({ value, delay }: { value: string; delay: number }) => (
    <div className="overflow-hidden h-[40px] relative">
      <motion.div
        initial={{ y: -100 }}
        animate={showSlot ? { y: 0 } : { y: -100 }}
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="text-3xl font-korean font-light text-gray-700"
      >
        {value}
      </motion.div>
    </div>
  );

  return (
    <section 
      className="relative px-4 py-12"
      style={{ 
        backgroundColor: '#F9F8F6',
        boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.05), 0 -1px 3px rgba(0,0,0,0.03)'
      }}
    >
      {/* 월/년 헤더 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-korean font-light tracking-[0.3em] text-gray-700">
          MAY
        </h2>
      </div>

      {/* 달력 그리드 */}
      <div className="w-full max-w-[320px] mx-auto">
        {/* 요일 헤더 */}
        <div 
          className="grid grid-cols-7 pb-3 mb-2 text-[11px] text-gray-400 tracking-tighter font-korean"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        >
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <div key={d} className={`text-center ${i === 0 ? 'text-red-400' : ''}`}>{d}</div>
          ))}
        </div>

        {/* 달력 날짜 - 그리드 셀 스타일 */}
        <div>
          {calendarDays.map((week, weekIdx) => (
            <div 
              key={weekIdx} 
              className="grid grid-cols-7 text-sm font-korean font-light"
              style={{ 
                borderBottom: weekIdx < calendarDays.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none'
              }}
            >
              {week.map((day, dayIdx) => (
                <div 
                  key={day} 
                  className={`relative flex items-center justify-center py-4 ${dayIdx === 0 ? 'text-red-400' : 'text-gray-600'}`}
                >
                  {day === 16 ? (
                    <div className="relative flex items-center justify-center">
                      <svg 
                        width="34" 
                        height="34" 
                        viewBox="0 0 24 24" 
                        className="absolute"
                      >
                        <path 
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="#E53E3E"
                        />
                      </svg>
                      <span className="relative z-10 text-white font-medium text-[12px]">{day}</span>
                    </div>
                  ) : (
                    day
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 손그림 테두리 박스 - 날짜 + 시간 + 장소 */}
      <motion.div 
        className="mt-10 relative inline-block px-8 py-5"
        onViewportEnter={() => setShowSlot(true)}
        viewport={{ once: true }}
      >
        {/* 손그림 테두리 SVG */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 200 100" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M4 8 Q1 3 10 4 L190 5 Q198 3 197 12 L195 88 Q198 96 188 95 L12 94 Q3 97 4 86 Z"
            stroke="#555"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-2">
          {/* 날짜 슬롯머신 */}
          <div className="flex items-center gap-1">
            <SlotNumber value="2026" delay={0} />
            <span className="text-2xl font-korean text-gray-400 mx-1">.</span>
            <SlotNumber value="05" delay={0.2} />
            <span className="text-2xl font-korean text-gray-400 mx-1">.</span>
            <SlotNumber value="16" delay={0.4} />
          </div>

          {/* 시간 + 장소 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showSlot ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="text-sm font-korean text-gray-500"
          >
            토요일 오후 2시 · 비렌티
          </motion.p>
        </div>
      </motion.div>

      {/* D-day */}
      <div className="mt-10 text-center">
        <p className="text-sm leading-relaxed font-korean font-light text-gray-500">
          주강 <span className="text-red-400 mx-1">❤️</span> 은지의 결혼식이<br />
          <span className="text-lg font-normal text-gray-700 mt-1 block font-korean">
            {dDay !== null ? (
              dDay > 0 ? `${dDay}일 남았습니다` : dDay === 0 ? "오늘입니다!" : `${Math.abs(dDay)}일 지났습니다`
            ) : "계산 중..."}
          </span>
        </p>
      </div>
    </section>
  );
}
