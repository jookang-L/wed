"use client";

import { Copy, ExternalLink, MapPin } from "lucide-react";

export default function MapSection() {
  const address = "충청남도 천안시 서북구 천안대로 1198-30";
  const placeName = "비렌티 3층 베르테홀";
  const searchQuery = "비렌티 천안 웨딩홀";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다.");
  };

  const openNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`, "_blank");
  };

  const openKakaoMap = () => {
    window.open(`https://map.kakao.com/?q=${encodeURIComponent(searchQuery)}`, "_blank");
  };

  return (
    <section className="bg-white">
      <p className="text-xs tracking-[0.3em] text-primary mb-2">LOCATION</p>
      <h2 className="mb-8 font-korean font-light">오시는 길</h2>

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
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            네이버 지도
          </button>
          <button 
            onClick={openKakaoMap}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            카카오 지도
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Copy size={14} />
            주소 복사
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-left w-full space-y-6 text-sm font-light text-gray-600">
        <div>
          <p className="font-normal text-primary mb-1 font-korean">지하철</p>
          <p className="leading-relaxed text-xs font-korean">두정역 1번 출구에서 셔틀버스 운행 (15분 간격)</p>
        </div>
        <div>
          <p className="font-normal text-primary mb-1 font-korean">버스</p>
          <p className="leading-relaxed text-xs font-korean">비렌티 웨딩홀 앞 정류장 하차 (11번, 100번)</p>
        </div>
      </div>
    </section>
  );
}
