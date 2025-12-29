"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CalendarSection from "@/components/CalendarSection";
import MapSection from "@/components/MapSection";
import VideoSection from "@/components/VideoSection";
import GallerySection from "@/components/GallerySection";
import GuestbookSection from "@/components/GuestbookSection";
import AccountSection from "@/components/AccountSection";
import AudioPlayer from "@/components/AudioPlayer";
import IntroPage from "@/components/IntroPage";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [startMusic, setStartMusic] = useState(false);

  const handleEnter = () => {
    setShowIntro(false);
    setStartMusic(true);
  };

  return (
    <>
      {showIntro && <IntroPage onEnter={handleEnter} />}
      
      <div className={`flex flex-col w-full ${showIntro ? 'invisible' : 'visible'}`}>
        <AudioPlayer autoPlay={startMusic} />
        <Hero />
        <CalendarSection />
        <MapSection />
        <VideoSection />
        <GallerySection />
        <GuestbookSection />
        <AccountSection />
        <footer className="py-16 text-center text-[10px] text-gray-400 tracking-widest bg-white">
          COPYRIGHT © 2025 JUKANG & EUNJI. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </>
  );
}
