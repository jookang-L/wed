"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [showVideo, setShowVideo] = useState(false);
  
  // Google Drive 영상 ID
  const videoId = "1mnpolP03EoXPhd_2PELl-Tnui4GPMar7";
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <section 
      className="py-16 px-0"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* 타이틀 */}
      <p className="text-xs tracking-[0.5em] text-amber-200/80 mb-8 text-center font-light">
        WEDDING THEATER
      </p>

      {/* 시네마 스크린 프레임 */}
      <div className="relative mx-2">
        {/* 스크린 테두리 (골드) */}
        <div 
          className="absolute -inset-1 rounded-sm"
          style={{ 
            background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
            opacity: 0.6
          }}
        />
        
        {/* 스크린 영역 - 21:9 시네마 비율 */}
        <div 
          className="relative bg-black overflow-hidden"
          style={{ aspectRatio: '21/9' }}
        >
          {showVideo ? (
            /* Google Drive 영상 임베드 */
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 'none' }}
            />
          ) : (
            /* 썸네일 + 재생 버튼 */
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url("/wed1.jpg")',
                  filter: 'brightness(0.6)'
                }}
              />
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ 
                    background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
                    boxShadow: '0 0 30px rgba(218, 165, 32, 0.4)'
                  }}
                >
                  <Play size={32} className="text-black fill-black ml-1" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 극장 조명 효과 */}
      <div className="flex justify-center gap-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-1 h-1 rounded-full bg-amber-200/40"
          />
        ))}
      </div>
    </section>
  );
}
