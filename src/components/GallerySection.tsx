"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// wed1.webp ~ wed29.webp까지 29장의 이미지 (WebP 최적화)
const IMAGES = Array.from({ length: 29 }, (_, i) => `/wed${i + 1}.webp`);

// 가변 그리드 레이아웃 패턴 (각 줄마다 다른 칸 수)
// 자유롭고 감성적인 비대칭 배치
const GRID_LAYOUT = [
  1,  // 1줄: 1장 - 시작을 강조
  2,  // 2줄: 2장
  3,  // 3줄: 3장
  2,  // 4줄: 2장
  1,  // 5줄: 1장 - 포인트
  4,  // 6줄: 4장
  2,  // 7줄: 2장
  3,  // 8줄: 3장
  1,  // 9줄: 1장 - 포인트
  3,  // 10줄: 3장
  2,  // 11줄: 2장
  1,  // 12줄: 1장 - 포인트
  4,  // 13줄: 4장
  2   // 14줄: 2장 - 마무리
]; // 총 29장

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

  // 이미지를 그리드 레이아웃에 맞게 분할
  let imageIndex = 0;
  const rows = GRID_LAYOUT.map(colCount => {
    const rowImages = IMAGES.slice(imageIndex, imageIndex + colCount);
    imageIndex += colCount;
    return { colCount, images: rowImages };
  });

  return (
    <section className="bg-white px-4">
      <h2 className="mb-10 italic">We, Within the Frame</h2>

      <div className="flex flex-col gap-1 w-full">
        {rows.map((row, rowIdx) => (
          <div 
            key={rowIdx} 
            className={`grid gap-1`}
            style={{ gridTemplateColumns: `repeat(${row.colCount}, 1fr)` }}
          >
            {row.images.map((src, colIdx) => {
              const globalIdx = GRID_LAYOUT.slice(0, rowIdx).reduce((sum, count) => sum + count, 0) + colIdx;
              return (
                <div 
                  key={globalIdx} 
                  className="aspect-square bg-gray-100 cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(globalIdx)}
                >
                  <img 
                    src={src} 
                    alt={`gallery-${globalIdx + 1}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              );
            })}
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

