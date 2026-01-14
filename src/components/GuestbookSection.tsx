"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface Message {
  name: string;
  content: string;
  timestamp: string;
}

// Google Apps Script 웹 앱 URL (설정 후 여기에 입력하세요)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbc9HxbdJLf-rp9KBCdE3PbSJp3NxKFILDskgMBX2zaPgIxbzKJG_NfzcaJy77tizK1w/exec";

const MESSAGES_PER_PAGE = 5; // 페이지당 메시지 수

export default function GuestbookSection() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 메시지 목록 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages.reverse()); // 최신 메시지가 위로
      }
    } catch (error) {
      console.error("메시지 로딩 실패:", error);
      // 에러 발생 시 빈 배열 유지
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      alert("성함과 메시지를 모두 입력해주세요.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const newMessage: Message = {
        name: name.trim(),
        content: content.trim(),
        timestamp: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).replace(/\. /g, ".").replace(/\.$/, "")
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage)
      });

      // no-cors 모드에서는 응답을 확인할 수 없으므로 낙관적 업데이트
      setMessages([newMessage, ...messages]);
      setCurrentPage(1); // 첫 페이지로 이동
      setName("");
      setContent("");
      alert("축하 메시지가 등록되었습니다! 감사합니다 💕");

      // 약간의 지연 후 새로고침
      setTimeout(fetchMessages, 2000);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
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
              maxLength={20}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 tracking-widest block mb-1">MESSAGE</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-b border-gray-100 py-2 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px] resize-none"
              placeholder="축하의 메시지를 남겨주세요"
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded text-sm font-light flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                전송 중...
              </>
            ) : (
              <>
                <Send size={14} />
                메시지 남기기
              </>
            )}
          </button>
        </form>

        {/* 메시지 목록 */}
        <div className="space-y-6 text-left">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-400">
                첫 번째 축하 메시지를 남겨주세요 💕
              </div>
            ) : (
              (() => {
                // 페이지네이션 계산
                const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
                const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
                const endIndex = startIndex + MESSAGES_PER_PAGE;
                const currentMessages = messages.slice(startIndex, endIndex);

                return (
                  <>
                    {currentMessages.map((message, index) => (
                      <div key={startIndex + index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{message.name}</span>
                          <span className="text-[10px] text-gray-300">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-light whitespace-pre-wrap">{message.content}</p>
                      </div>
                    ))}
                  </>
                );
              })()
            )}
          </div>

          {/* 페이지네이션 */}
          {!isLoading && messages.length > MESSAGES_PER_PAGE && (
            <div className="flex items-center justify-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={16} className="text-gray-600" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(messages.length / MESSAGES_PER_PAGE) }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`!w-6 !h-6 !min-w-0 !min-h-0 !p-0 rounded-full text-[10px] flex items-center justify-center transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(messages.length / MESSAGES_PER_PAGE), prev + 1))}
                disabled={currentPage === Math.ceil(messages.length / MESSAGES_PER_PAGE)}
                className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="다음 페이지"
              >
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

