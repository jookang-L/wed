"use client";

import { useState } from "react";
import { ChevronDown, Copy, Heart } from "lucide-react";

interface AccountInfoProps {
  owner: string;
  bank: string;
  number: string;
}

function AccountItem({ owner, bank, number }: AccountInfoProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    alert(`${owner}님의 계좌번호가 복사되었습니다.`);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="text-left">
        <p className="text-sm font-normal text-gray-700">{bank} {number}</p>
        <p className="text-xs text-gray-400 font-light mt-0.5">{owner}</p>
      </div>
      <button 
        onClick={handleCopy}
        className="px-3 py-1.5 bg-gray-50 rounded text-[10px] text-gray-500 hover:bg-gray-100 transition-colors flex items-center gap-1"
      >
        <Copy size={12} />
        복사
      </button>
    </div>
  );
}

export default function AccountSection() {
  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);

  return (
    <section className="bg-white">
      <Heart size={20} className="text-primary/30 mb-4" />
      <p className="text-xs tracking-[0.3em] text-primary mb-2">GIFT</p>
      <h2 className="mb-6">마음 전하실 곳</h2>
      <p className="text-sm text-gray-500 font-light leading-relaxed mb-10">
        축복해 주시는 따뜻한 마음<br />
        오래토록 잊지 않고 잘 살겠습니다.
      </p>

      <div className="w-full space-y-4">
        {/* 신랑측 */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <button 
            onClick={() => setOpenGroom(!openGroom)}
            className="w-full px-6 py-4 bg-[#FAF9F7] flex items-center justify-between text-sm"
          >
            <span className="font-light tracking-widest text-gray-600">신랑측 계좌번호</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${openGroom ? 'rotate-180' : ''}`} />
          </button>
          {openGroom && (
            <div className="px-6 bg-white animate-in slide-in-from-top-2 duration-300">
              <AccountItem owner="이주강" bank="농협" number="312-6795-0233-31" />
            </div>
          )}
        </div>

        {/* 신부측 */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <button 
            onClick={() => setOpenBride(!openBride)}
            className="w-full px-6 py-4 bg-[#FAF9F7] flex items-center justify-between text-sm"
          >
            <span className="font-light tracking-widest text-gray-600">신부측 계좌번호</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${openBride ? 'rotate-180' : ''}`} />
          </button>
          {openBride && (
            <div className="px-6 bg-white animate-in slide-in-from-top-2 duration-300">
              <AccountItem owner="김은지" bank="농협" number="302-1946-9250-01" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}