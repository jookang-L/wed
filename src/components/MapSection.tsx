"use client";

import { Copy, ExternalLink, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function MapSection() {
  const address = "충청남도 천안시 서북구 천안대로 1198-30";
  const placeName = "비렌티 3층 베르테홀";
  const searchQuery = "비렌티 천안 웨딩홀";

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

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/?q=${encodeURIComponent(searchQuery)}`,
      "_blank"
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
          <h3 className="text-lg font-korean font-normal mb-1">{placeName}</h3>
          <p className="text-sm text-gray-500 font-light">{address}</p>
        </div>

        {/* 웨딩홀 이미지 - 클릭 시 네이버 지도로 이동 */}
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
              <span className="text-sm font-korean text-gray-700">지도 보기</span>
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={openNaverMap}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/20 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            네이버 지도
          </button>
          <button
            onClick={openKakaoMap}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/20 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            카카오 지도
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/20 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Copy size={14} />
            주소 복사
          </button>
        </div>
      </div>

      {/* 오시는 길 상세 */}
      <div className="mt-12 text-center w-full space-y-6 text-sm font-light text-gray-600">
        {/* 셔틀버스 (요약 + 펼치기) */}
        <div className="space-y-4">
          <p className="font-normal text-primary font-korean">🚌 셔틀버스 안내</p>

          {/* 노선 표시를 맨 위로 */}
          <p className="text-xs font-korean text-gray-800">
            천안종합터미널 ↔ 두정역 ↔ 비렌티
          </p>

          {/* 요약 */}
          <div className="mx-auto w-fit grid grid-cols-[auto_auto] gap-x-3 gap-y-2 text-xs font-korean text-gray-700">
            <span className="font-normal text-gray-800 text-right">터미널</span>
            <span className="text-left">정각부터 30분 간격</span>

            <span className="font-normal text-gray-800 text-right">두정역</span>
            <span className="text-left">7분부터 30분 간격</span>

            <span className="font-normal text-gray-800 text-right">비렌티</span>
            <span className="text-left">정각부터 30분 간격</span>
          </div>

          {/* 펼치기 버튼 */}
          <button
            type="button"
            onClick={() => setIsShuttleOpen((v) => !v)}
            className="mx-auto flex w-fit items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-black/20 bg-white text-xs font-korean text-gray-700 hover:bg-gray-50 transition-colors"
            aria-expanded={isShuttleOpen}
          >
            {isShuttleOpen ? "셔틀버스 상세 접기" : "셔틀버스 상세 보기"}
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isShuttleOpen ? "rotate-180" : ""}`}
            />
          </button>


          {/* 상세 영역 (딱 1개만) */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isShuttleOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-3 space-y-3 text-xs font-korean">
              {/* 카드 1: 터미널 */}
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left">
                <p className="font-normal text-gray-800">
                  📍 천안 종합터미널{" "}
                  <span className="text-gray-500">(정각부터 30분 간격)</span>
                </p>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  신세계백화점(아라리오 갤러리) 올리브영 & 스타벅스 건물 앞
                  횡단보도
                </p>
                <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-[11px] text-gray-600 leading-relaxed">
                  ※ 터미널 올리브영 2곳 주의!{" "}
                  <b className="text-gray-700">
                    아라리오 갤러리 스타벅스와 함께 있는 올리브영
                  </b>{" "}
                  앞에서 탑승
                </div>
              </div>

              {/* 카드 2: 두정역 */}
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left">
                <p className="font-normal text-gray-800">
                  📍 두정역{" "}
                  <span className="text-gray-500">(매시 7분부터 30분 간격)</span>
                </p>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  1번 출구 → 오른쪽 50m, 파란색 유원대학교 셔틀버스 승강장
                </p>
                <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-[11px] text-gray-600">
                  ※ 출구 2곳 → <b className="text-gray-700">반드시 1번 출구</b> 이용
                </div>
              </div>

              {/* 카드 3: 비렌티 출발 */}
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left">
                <p className="font-normal text-gray-800">📍 비렌티 출발 셔틀</p>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  비렌티 → 터미널/두정역 방향{" "}
                  <span className="text-gray-500">(정각부터 30분 간격)</span>
                </p>
                <p className="mt-1 text-gray-600">탑승지: 본관 1층 건물 앞</p>
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                ※ 도로 사정에 따라 출발/도착 시간이 변동될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
