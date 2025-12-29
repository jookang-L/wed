"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

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
          {/* 비디오 */}
          <video
            ref={videoRef}
            src="/wedmovie.mp4"
            className="w-full h-full object-cover"
            playsInline
            onEnded={handleVideoEnd}
            onClick={togglePlay}
          />

          {/* 재생 버튼 오버레이 */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
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
          )}

          {/* 재생 중 일시정지 */}
          {isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center border border-amber-200/50">
                <Pause size={24} className="text-amber-200" />
              </div>
            </div>
          )}

          {/* 영화 필름 그레인 효과 (미세한 노이즈) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
            }}
          />
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
