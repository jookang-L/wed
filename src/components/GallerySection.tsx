"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  "/wed1.jpg", "/web5.JPG", "/web6.JPG",
  "/web7.JPG", "/web8.JPG", "/web9.JPG",
  "/web10.JPG", "/poster.png", "/wed2.png"
];

export default function GallerySection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) setSelectedIdx((selectedIdx - 1 + IMAGES.length) % IMAGES.length);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) setSelectedIdx((selectedIdx + 1) % IMAGES.length);
  };

  return (
    <section className="bg-white px-4">
      <p className="text-xs tracking-[0.3em] text-primary mb-2">GALLERY</p>
      <h2 className="mb-10">소중한 순간들</h2>

      <div className="grid grid-cols-3 gap-1 w-full">
        {IMAGES.map((src, i) => (
          <div 
            key={i} 
            className="aspect-square bg-gray-100 cursor-pointer overflow-hidden"
            onClick={() => openLightbox(i)}
          >
            <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </div>

      {/* 라이트박스 */}
      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-white p-2">
            <X size={28} strokeWidth={1} />
          </button>
          
          <button 
            className="absolute left-4 text-white/50 p-2"
            onClick={prevImg}
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          <img 
            src={IMAGES[selectedIdx]} 
            alt="full" 
            className="max-w-full max-h-[80vh] object-contain"
          />

          <button 
            className="absolute right-4 text-white/50 p-2"
            onClick={nextImg}
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      )}
    </section>
  );
}

