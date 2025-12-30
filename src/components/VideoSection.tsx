"use client";

export default function VideoSection() {
  // YouTube 영상 ID
  const videoId = "wIScQ_3XIK4";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <section 
      className="py-16 px-0"
      style={{ backgroundColor: '#000000' }}
    >
      {/* 타이틀 */}
      <p className="text-xs tracking-[0.5em] text-amber-200/80 mb-8 text-center font-light px-4">
        WEDDING THEATER
      </p>

      {/* 영상 영역 - max-width 400px 제한 */}
      <div className="w-full" style={{ backgroundColor: '#000000', maxWidth: '400px', margin: '0 auto' }}>
        <div className="relative w-full aspect-video">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* 극장 조명 효과 */}
      <div className="flex justify-center gap-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-1 h-1 rounded-full bg-amber-200/40"
          />
        ))}
      </div>
    </section>
  );
}
