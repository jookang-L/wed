const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 85; // 85% 품질 (화질 유지하면서 용량 절감)

async function convertToWebP() {
  console.log('🖼️  WebP 변환 시작...\n');
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (let i = 1; i <= 29; i++) {
    const jpgPath = path.join(PUBLIC_DIR, `wed${i}.jpg`);
    const webpPath = path.join(PUBLIC_DIR, `wed${i}.webp`);
    
    // 파일 존재 확인
    if (!fs.existsSync(jpgPath)) {
      console.log(`⚠️  wed${i}.jpg 파일을 찾을 수 없습니다.`);
      continue;
    }
    
    try {
      // 원본 파일 크기
      const originalStats = fs.statSync(jpgPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;
      
      // WebP로 변환
      await sharp(jpgPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      
      // 변환된 파일 크기
      const webpStats = fs.statSync(webpPath);
      const webpSize = webpStats.size;
      totalWebPSize += webpSize;
      
      // 크기 비교
      const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
      console.log(`✅ wed${i}.jpg → wed${i}.webp (${formatBytes(originalSize)} → ${formatBytes(webpSize)}, -${reduction}%)`);
      
    } catch (error) {
      console.log(`❌ wed${i}.jpg 변환 실패:`, error.message);
    }
  }
  
  // main.jpg도 변환
  const mainJpgPath = path.join(PUBLIC_DIR, 'main.jpg');
  if (fs.existsSync(mainJpgPath)) {
    try {
      const mainWebpPath = path.join(PUBLIC_DIR, 'main.webp');
      const originalStats = fs.statSync(mainJpgPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;
      
      await sharp(mainJpgPath)
        .webp({ quality: QUALITY })
        .toFile(mainWebpPath);
      
      const webpStats = fs.statSync(mainWebpPath);
      const webpSize = webpStats.size;
      totalWebPSize += webpSize;
      
      const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
      console.log(`✅ main.jpg → main.webp (${formatBytes(originalSize)} → ${formatBytes(webpSize)}, -${reduction}%)`);
    } catch (error) {
      console.log(`❌ main.jpg 변환 실패:`, error.message);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 총 결과:`);
  console.log(`   원본 크기: ${formatBytes(totalOriginalSize)}`);
  console.log(`   WebP 크기: ${formatBytes(totalWebPSize)}`);
  console.log(`   절감률: ${((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
  console.log('\n🎉 WebP 변환 완료!');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

convertToWebP().catch(console.error);
