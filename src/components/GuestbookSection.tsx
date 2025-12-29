"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

export default function GuestbookSection() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;
    
    // 구글 시트 연동 전 데모 알림
    alert("구글 시트 연동 설정 후 정상 작동합니다!");
    setName("");
    setContent("");
  };

  return (
    <section className="bg-[#FAF9F7]">
      <p className="text-xs tracking-[0.3em] text-primary mb-2">GUESTBOOK</p>
      <h2 className="mb-10">축복의 한마디</h2>

      <div className="w-full space-y-8">
        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4 text-left">
          <div>
            <label className="text-[10px] text-gray-400 tracking-widest block mb-1">NAME</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-100 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="성함을 입력해주세요"
              maxLength={10}
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 tracking-widest block mb-1">MESSAGE</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-b border-gray-100 py-2 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px] resize-none"
              placeholder="축하의 메시지를 남겨주세요"
              maxLength={100}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded text-sm font-light flex items-center justify-center gap-2"
          >
            <Send size={14} />
            메시지 남기기
          </button>
        </form>

        {/* 예시 메시지 */}
        <div className="space-y-4 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">관리자</span>
              <span className="text-[10px] text-gray-300">2025.12.26</span>
            </div>
            <p className="text-sm text-gray-600 font-light">두 분의 결혼을 진심으로 축하드립니다! 행복하세요.</p>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center">
          * 작성된 메시지는 구글 스프레드시트에 안전하게 보관됩니다.
        </p>
      </div>
    </section>
  );
}

