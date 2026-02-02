"use client";

import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// wed1.webp ~ wed20.webp까지 20장의 이미지
const IMAGES = Array.from({ length: 20 }, (_, i) => `/wed${i + 1}.webp`);

// 총합 20장으로 맞춘 비대칭 그리드 (랜덤/감성 느낌 유지)
const GRID_LAYOUT = [
  1, // 1
  2, // 3
  3, // 6
  2, // 8
  1, // 9  -> 여기까지 "초기 9장" 자연스럽게 딱 떨어짐
  4, // 13
  2, // 15
  3, // 18
  2, // 20
];

export default function GallerySection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleCount = showAll ? IMAGES.length : 9;
  const visibleImages = IMAGES.slice(0, visibleCount);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null)
      setSelectedIdx((selectedIdx - 1 + visibleImages.length) % visibleImages.length);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null)
      setSelectedIdx((selectedIdx + 1) % visibleImages.length);
  };

  // 현재 "보이는 이미지(9 or 20)" 기준으로 레이아웃 적용
  const rows = useMemo(() => {
    let imageIndex = 0;
    const out: { colCount: number; images: string[]; startIndex: number }[] = [];

    for (const colCount of GRID_LAYOUT) {
      if (imageIndex >= visibleImages.length) break;

      const rowImages = visibleImages.slice(imageIndex, imageIndex + colCount);
      if (rowImages.length === 0) break;

      out.push({ colCount, images: rowImages, startIndex: imageIndex });
      imageIndex += colCount;
    }

    return out;
  }, [visibleImages]);

  return (
    <section className="bg-white px-4">
      <h2 className="mb-10 italic">We, Within the Frame</h2>

      <div className="flex flex-col gap-1 w-full">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${row.colCount}, 1fr)` }}
          >
            {row.images.map((src, colIdx) => {
              const globalIdx = row.startIndex + colIdx; // visibleImages 기준 인덱스
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
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {!showAll && IMAGES.length > 9 && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="px-5 py-2 border border-black/20 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            더보기
          </button>
        </div>
      )}

      {/* 라이트박스 */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X size={28} strokeWidth={1} />
          </button>

          <button className="absolute left-4 text-white/50 p-2" onClick={prevImg}>
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          <img
            src={visibleImages[selectedIdx]}
            alt="full"
            className="max-w-full max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="absolute right-4 text-white/50 p-2" onClick={nextImg}>
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      )}
    </section>
  );
}