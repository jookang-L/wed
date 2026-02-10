"use client";

import { Copy, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function MapSection() {
  const address = "충청남도 천안시 서북구 천안대로 1198-30";
  const placeName = "비렌티 3층 베르테홀";
  const searchQuery = "비렌티 천안 웨딩홀";

  // 비렌티 좌표
  const latitude = 36.8478295;
  const longitude = 127.1591438;

  const [isShuttleOpen, setIsShuttleOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다.");
  };

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`,
      "_blank"
    );
  };

  // 티맵 앱 열기
  const openTmap = () => {
    window.open(
      `tmap://search?name=${encodeURIComponent(
        "비렌티"
      )}&lon=${longitude}&lat=${latitude}`
    );
  };

  // 카카오내비 앱 열기
  const openKakaoNavi = () => {
    window.open(
      `kakaonavi://navigate?latitude=${latitude}&longitude=${longitude}&name=${encodeURIComponent(
        "비렌티"
      )}`
    );
  };

  return (
    <section className="bg-white">
      <p className="text-xs tracking-[0.3em] text-primary mb-2 text-center">
        LOCATION
      </p>
      <h2 className="mb-8 font-korean font-light text-center">오시는 길</h2>

      <div className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-korean font-normal mb-1">
            {placeName}
          </h3>
          <p className="text-sm text-gray-500 font-light">{address}</p>
        </div>

        {/* 이미지 클릭 시 지도 이동 */}
        <div
          onClick={openNaverMap}
          className="w-full aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer relative group"
        >
          <img
            src="/virenti.jpg"
            alt="비렌티 베르테홀"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-korean text-gray-700">
                지도 보기
              </span>
            </div>
          </div>
        </div>

        {/* 지도 버튼 - 한 줄에 3개 */}
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* 티맵 */}
          <button
            onClick={openTmap}
            className="flex flex-col items-center gap-2 px-3 py-3 hover:opacity-80 transition"
          >
            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center">
              <img
                src="/tmap-icon.png"
                alt="티맵"
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
            <span className="text-xs font-korean text-gray-800">티맵</span>
          </button>

          {/* 네이버지도 */}
          <button
            onClick={openNaverMap}
            className="flex flex-col items-center gap-2 px-3 py-3 hover:opacity-80 transition"
          >
            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center">
              <img
                src="/naver-map-icon.png"
                alt="네이버 지도"
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
            <span className="text-xs font-korean text-gray-800">
              네이버지도
            </span>
          </button>

          {/* 카카오내비 */}
          <button
            onClick={openKakaoNavi}
            className="flex flex-col items-center gap-2 px-3 py-3 hover:opacity-80 transition"
          >
            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center">
              <img
                src="/kakao-navi-icon.png"
                alt="카카오내비"
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
            <span className="text-xs font-korean text-gray-800">
              카카오내비
            </span>
          </button>
        </div>

        {/* 주소 복사 버튼 */}
        <div className="flex justify-center mt-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 shadow-sm hover:bg-gray-50 transition"
          >
            <Copy size={14} className="text-gray-600" />
            <span className="text-sm font-korean text-gray-800">
              주소 복사
            </span>
          </button>
        </div>
      </div>

      {/* 오시는 길 상세 */}
      <div className="mt-12 text-center w-full space-y-6 text-sm font-light text-gray-600">
        {/* 셔틀버스 (요약 + 펼치기) */}
        <div className="space-y-4">
          <p className="font-normal text-primary font-korean">
            🚌 셔틀버스 안내
          </p>

          {/* 노선 표시를 맨 위로 */}
          <p className="text-xs font-korean text-gray-800">
            천안종합터미널 ↔ 두정역 ↔ 비렌티
          </p>

          {/* 요약 */}
          <div className="mx-auto w-fit grid grid-cols-[auto_auto] gap-x-3 gap-y-2 text-xs font-korean text-gray-700">
            <span className="font-normal text-gray-800 text-right">
              터미널
            </span>
            <span className="text-left">정각부터 30분 간격</span>

            <span className="font-normal text-gray-800 text-right">
              두정역
            </span>
            <span className="text-left">7분부터 30분 간격</span>

            <span className="font-normal text-gray-800 text-right">
              비렌티
            </span>
            <span className="text-left">정각부터 30분 간격</span>
          </div>
        </div>
      </div>
    </section>
  );
}