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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 5; // 2026년 5월 1일은 금요일
  const calendar = [...Array(startDay).fill(null), ...days];

  return (
    <section className="bg-white">
      <div className="mb-12">
        <p className="text-xs text-primary tracking-[0.3em] mb-3">SAVE THE DATE</p>
        <h2 className="text-2xl font-myeongjo mb-1 font-light">2026. 05. 16</h2>
        <p className="text-sm text-gray-400 font-light">토요일 오후 2시</p>
      </div>

      <div className="w-full max-w-[300px]">
        <div className="grid grid-cols-7 mb-6 text-[11px] text-gray-400 tracking-tighter">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <div key={d} className={i === 0 ? 'text-red-400' : ''}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-4 text-sm font-light">
          {calendar.map((day, i) => (
            <div key={i} className={`relative flex items-center justify-center h-10 ${i % 7 === 0 ? 'text-red-400' : ''}`}>
              {day === 16 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 -rotate-12" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="animate-draw"
                    />
                  </svg>
                </div>
              )}
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm leading-relaxed font-light text-gray-600">
          주강 <span className="text-red-400 mx-1">❤️</span> 은지의 결혼식이<br />
          <span className="text-lg font-normal text-primary mt-1 block">
            {dDay !== null ? (
              dDay > 0 ? `${dDay}일 남았습니다` : dDay === 0 ? "오늘입니다!" : `${Math.abs(dDay)}일 지났습니다`
            ) : "계산 중..."}
          </span>
        </p>
      </div>
    </section>
  );
}
