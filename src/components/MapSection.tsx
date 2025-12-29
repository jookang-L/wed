"use client";

import { useEffect, useRef } from "react";
import { Copy, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const address = "충청남도 천안시 서북구 천안대로 1198-30";
  const placeName = "비렌티 3층 베르테홀";

  useEffect(() => {
    // 네이버 지도 초기화 로직
    if (typeof window !== "undefined" && window.naver && mapRef.current) {
      const location = new window.naver.maps.LatLng(36.852028, 127.1512);
      const mapOptions = {
        center: location,
        zoom: 16,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      new window.naver.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다.");
  };

  const openNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(placeName)}`, "_blank");
  };

  return (
    <section className="bg-[#FAF9F7]">
      <p className="text-xs tracking-[0.3em] text-primary mb-2">LOCATION</p>
      <h2 className="mb-8 font-myeongjo font-light">오시는 길</h2>

      <div className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-normal mb-1">{placeName}</h3>
          <p className="text-sm text-gray-500 font-light">{address}</p>
        </div>

        {/* 네이버 지도 실제 표시 영역 */}
        <div 
          ref={mapRef}
          className="w-full aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-gray-100"
        >
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            지도를 불러오고 있습니다...
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button 
            onClick={openNaverMap}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-light text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            네이버 지도로 보기
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
          <p className="font-normal text-primary mb-1 italic">Subway</p>
          <p className="leading-relaxed text-xs">두정역 1번 출구에서 셔틀버스 운행 (15분 간격)</p>
        </div>
        <div>
          <p className="font-normal text-primary mb-1 italic">Bus</p>
          <p className="leading-relaxed text-xs">비렌티 웨딩홀 앞 정류장 하차 (11번, 100번)</p>
        </div>
      </div>
    </section>
  );
}
