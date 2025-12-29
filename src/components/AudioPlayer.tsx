"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // 자동재생 실패 시 무시
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* 오디오 요소 (숨김) */}
      <audio
        ref={audioRef}
        src="/walking.mp3"
        loop
        preload="auto"
      />

      {/* 플로팅 음악 버튼 */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        aria-label={isPlaying ? "음악 끄기" : "음악 켜기"}
      >
        {isPlaying ? (
          <Volume2 size={18} className="text-primary" />
        ) : (
          <VolumeX size={18} className="text-gray-400" />
        )}
      </button>
    </>
  );
}
