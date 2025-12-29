"use client";

import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="bg-white">
      <p className="text-xs tracking-[0.3em] text-primary mb-2">WEDDING VIDEO</p>
      <h2 className="mb-8">식중 영상</h2>

      <div className="w-full aspect-video bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-200">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Play size={20} className="text-primary fill-primary" />
        </div>
        <p className="text-sm font-light text-gray-400">영상은 추후 공개됩니다</p>
      </div>
    </section>
  );
}

