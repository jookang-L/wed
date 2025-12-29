"use client";

import { motion } from "framer-motion";

export default function InvitationMessage() {
  return (
    <section 
      className="py-20 px-6 text-center relative pb-20 overflow-hidden"
      style={{ backgroundColor: '#1A2A23' }}
    >
      {/* 제목 */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-white text-lg tracking-[0.3em] mb-12 font-korean"
      >
        모시는 글
      </motion.h2>

      {/* 본문 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-300 leading-[2.2] text-[15px] font-korean space-y-6"
      >
        <p>
          결혼은<br />
          누군가의 이야기라고만 생각했습니다.
        </p>

        <p>
          하지만 은지를 만난 순간,<br />
          그리고 주강을 바라본 그 순간<br />
          삶의 방향이 조용히 바뀌었습니다.
        </p>

        <p>
          서로의 마음이 머물 곳을 찾았고<br />
          이제 같은 이름으로 불리고자 합니다.<br />
          부디 귀한 발걸음으로 함께하시어<br />
          저희의 시작을 축복해 주시길 바랍니다.
        </p>
      </motion.div>

      {/* 작약(Peony) 꽃 장식 */}
      <div className="my-10 flex justify-center">
        <svg 
          width="36" 
          height="36" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-60"
        >
          {/* 작약 꽃잎들 - 겹겹이 쌓인 둥근 꽃잎 */}
          {/* 바깥쪽 꽃잎 */}
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(0 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(45 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(90 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(135 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(180 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(225 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(270 50 50)"/>
          <ellipse cx="50" cy="25" rx="12" ry="20" fill="#D4C3B3" fillOpacity="0.3" transform="rotate(315 50 50)"/>
          
          {/* 안쪽 꽃잎 */}
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(22.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(67.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(112.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(157.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(202.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(247.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(292.5 50 50)"/>
          <ellipse cx="50" cy="32" rx="8" ry="14" fill="#D4C3B3" fillOpacity="0.5" transform="rotate(337.5 50 50)"/>
          
          {/* 중심 */}
          <circle cx="50" cy="50" r="8" fill="#D4C3B3" fillOpacity="0.7"/>
        </svg>
      </div>

      {/* 부모님 및 이름 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-300 text-[14px] font-korean leading-[2]"
      >
        <p>
          <span className="text-gray-400">이재순 · 조효정</span>의 장남 <span className="text-white font-medium">주강</span>
        </p>
        <p>
          <span className="text-gray-400">김정태 · 정혜경</span>의 장녀 <span className="text-white font-medium">은지</span>
        </p>
      </motion.div>

      {/* 하단 펀치 구멍 - 커버에서 잘라낸 효과 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-7 overflow-hidden">
        {[...Array(11)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 rounded-full translate-y-1/2"
            style={{ 
              backgroundColor: '#F7F7F5',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15), inset 0 -1px 2px rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>
    </section>
  );
}

