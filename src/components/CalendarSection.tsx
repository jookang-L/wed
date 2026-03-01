"use client";

import { useEffect, useState } from "react";

export default function CalendarSection() {
  const [dDay, setDDay] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date("2026-05-16T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    setDDay(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  // 2026년 5월 전체 달력 (1일=금요일, 달력은 일요일부터 시작)
  const calendarDays = [
    [null, null, null, null, null, 1, 2],       // 1주차: 1일(금), 2일(토)
    [3, 4, 5, 6, 7, 8, 9],                      // 2주차: 3일(일)부터
    [10, 11, 12, 13, 14, 15, 16],               // 3주차: 16일(토) 결혼식
    [17, 18, 19, 20, 21, 22, 23],               // 4주차
    [24, 25, 26, 27, 28, 29, 30],               // 5주차
    [31, null, null, null, null, null, null],   // 6주차: 31일(일)
  ];

  return (
    <section 
      className="relative px-4 py-12"
      style={{ backgroundColor: '#1A2A23' }}
    >
      {/* 날짜/시간 헤더 */}
      <div className="text-center mb-6">
        <p className="text-sm font-korean text-gray-400 mb-1">
          2026. <span className="text-3xl font-light text-white tracking-tight">5.16</span> SAT. PM 2:00
        </p>
      </div>

      {/* 달력 그리드 */}
      <div className="w-full max-w-[320px] mx-auto">
        {/* 요일 헤더 */}
        <div 
          className="grid grid-cols-7 pb-3 mb-2 text-[11px] text-gray-400 tracking-tighter font-korean"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
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
                borderBottom: weekIdx < calendarDays.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
              }}
            >
              {week.map((day, dayIdx) => (
                <div 
                  key={`${weekIdx}-${dayIdx}`}
                  className={`relative flex items-center justify-center py-2 ${dayIdx === 0 ? 'text-red-400' : 'text-gray-300'}`}
                >
                  {day === null ? (
                    <span></span>
                  ) : day === 16 ? (
                    <div className="relative flex items-center justify-center">
                      <svg 
                        width="34" 
                        height="34" 
                        viewBox="0 0 24 24" 
                        className="absolute"
                      >
                        <path 
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="#C74B5B"
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

      {/* D-day */}
      <div className="mt-10 text-center">
        <p className="text-sm leading-relaxed font-korean font-light text-gray-400">
          주강 <span style={{ color: '#C74B5B' }} className="mx-1">❤️</span> 은지의 결혼식이<br />
          <span className="text-lg font-normal text-white mt-1 block font-korean">
            {dDay !== null ? (
              dDay > 0 ? `${dDay}일 남았습니다` : dDay === 0 ? "오늘입니다!" : `${Math.abs(dDay)}일 지났습니다`
            ) : "계산 중..."}
          </span>
        </p>
      </div>
    </section>
  );
}
