"use client";

import { useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// thumbs(그리드용) / large(라이트박스용)
const THUMBS = Array.from({ length: 20 }, (_, i) => `/thumbs/wed${i + 1}.jpg`);
const LARGE = Array.from({ length: 20 }, (_, i) => `/large/wed${i + 1}.jpg`);

// 총합 20장으로 맞춘 비대칭 그리드 (랜덤/감성 느낌 유지)
const GRID_LAYOUT = [1, 2, 3, 2, 1, 4, 2, 3, 2];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ 스와이프 상태
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const visibleCount = showAll ? THUMBS.length : 9;
  const visibleThumbs = THUMBS.slice(0, visibleCount);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const prev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + visibleThumbs.length) % visibleThumbs.length);
  };

  const next = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % visibleThumbs.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    prev();
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    next();
  };

  const handleCollapse = () => {
    setSelectedIdx(null);
    setShowAll(false);

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // ✅ 스와이프 핸들러 (모바일)
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    isSwiping.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;

    // 세로 스크롤이 더 크면 스와이프 취급 안 함
    if (Math.abs(dy) > Math.abs(dx)) return;

    // 가로로 일정 이상 움직이면 스와이프 중으로 표시
    if (Math.abs(dx) > 10) isSwiping.current = true;

    // 가로 스와이프 중엔 페이지 스크롤/바운스 방지 (iOS에서 도움 됨)
    if (isSwiping.current) e.preventDefault();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;

    // 초기화
    touchStartX.current = null;
    touchStartY.current = null;

    // 세로가 더 크면 무시
    if (Math.abs(dy) > Math.abs(dx)) return;

    // 스와이프 임계값 (너무 민감하지 않게)
    const THRESHOLD = 45;

    if (dx > THRESHOLD) {
      // 오른쪽으로 스와이프 = 이전
      prev();
    } else if (dx < -THRESHOLD) {
      // 왼쪽으로 스와이프 = 다음
      next();
    }
  };

  // 현재 "보이는 이미지(9 or 20)" 기준으로 레이아웃 적용
  const rows = useMemo(() => {
    let imageIndex = 0;
    const out: { colCount: number; images: string[]; startIndex: number }[] =
      [];

    for (const colCount of GRID_LAYOUT) {
      if (imageIndex >= visibleThumbs.length) break;

      const rowImages = visibleThumbs.slice(imageIndex, imageIndex + colCount);
      if (rowImages.length === 0) break;

      out.push({ colCount, images: rowImages, startIndex: imageIndex });
      imageIndex += colCount;
    }

    return out;
  }, [visibleThumbs]);

  return (
    <section ref={sectionRef} className="bg-white px-4">
      <h2 className="mb-10 italic">We, Within the Frame</h2>

      <div className="flex flex-col gap-1 w-full">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${row.colCount}, 1fr)` }}
          >
            {row.images.map((src, colIdx) => {
              const globalIdx = row.startIndex + colIdx;
              return (
                <div
                  key={globalIdx}
                  className="aspect-square bg-gray-100 cursor-pointer overflow-hidden [transform:translateZ(0)]"
                  onClick={() => openLightbox(globalIdx)}
                >
                  <img
                    src={src}
                    alt={`gallery-${globalIdx + 1}`}
                    className="w-full h-full object-cover md:hover:scale-110 transition-transform duration-500 will-change-transform"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 33vw, 220px"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 버튼 영역: 더보기 / 접기 */}
      {THUMBS.length > 9 && (
        <div className="flex justify-center mt-6">
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/20 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
            >
              더보기
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCollapse}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/20 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
            >
              접기
            </button>
          )}
        </div>
      )}

      {/* 라이트박스: large 사용 + 스와이프 */}
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

          <button
            className="absolute left-4 text-white/60 p-2"
            onClick={prevImg}
            aria-label="Previous"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          {/* ✅ 이미지 컨테이너에서 터치 스와이프 처리 */}
          <div
            className="max-w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "pan-y" }} // 세로 스크롤은 허용, 가로는 우리가 처리
          >
            <img
              src={LARGE[selectedIdx]}
              alt="full"
              className="max-w-full max-h-[80vh] object-contain select-none"
              draggable={false}
              decoding="async"
            />
          </div>

          <button
            className="absolute right-4 text-white/60 p-2"
            onClick={nextImg}
            aria-label="Next"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      )}
    </section>
  );
}
