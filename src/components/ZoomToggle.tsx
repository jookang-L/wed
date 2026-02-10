"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ZoomToggle() {
  const [zoomed, setZoomed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !zoomed;
    setZoomed(next);

    const container = document.querySelector(".mobile-container");
    if (container) {
      if (next) {
        container.classList.add("zoom-mode");
      } else {
        container.classList.remove("zoom-mode");
      }
    }

    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링 (zoom 영향 안 받음)
  return createPortal(
    <>
      {/* 확대 모드 토글 버튼 */}
      <button
        onClick={toggle}
        className="fixed bottom-5 left-5 z-[9999] flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg border transition-all active:scale-95"
        style={{
          backgroundColor: zoomed ? "#4A5D4E" : "rgba(255,255,255,0.95)",
          borderColor: zoomed ? "#3a4d3e" : "#e5e7eb",
        }}
        aria-label={zoomed ? "기본 크기로 보기" : "크게 보기"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={zoomed ? "white" : "#555"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          {zoomed ? (
            <line x1="8" y1="11" x2="14" y2="11" />
          ) : (
            <>
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </>
          )}
        </svg>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: zoomed ? "white" : "#555",
          }}
        >
          {zoomed ? "기본" : "크게"}
        </span>
      </button>

      {/* 토스트 알림 */}
      {showToast && (
        <div
          className="fixed bottom-20 left-1/2 z-[9999]"
          style={{
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 20px",
            borderRadius: "9999px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            animation: "fadeInUp 0.3s ease-out",
          }}
        >
          {zoomed ? "🔍 확대 모드 켜짐" : "🔍 기본 모드로 전환"}
        </div>
      )}
    </>,
    document.body
  );
}
