// Google Apps Script 코드
// 이 코드를 구글 스프레드시트의 Apps Script 에디터에 복사하세요

// 스프레드시트 설정
const SHEET_NAME = "시트1"; // 시트 이름 (필요시 변경)

// GET 요청 처리 (메시지 목록 조회)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "시트를 찾을 수 없습니다."
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    
    // 헤더 행 제외하고 메시지 추출
    const messages = data.slice(1).map(row => ({
      name: row[0] || "",
      content: row[1] || "",
      timestamp: row[2] || ""
    })).filter(msg => msg.name && msg.content); // 빈 행 제외
    
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        messages: messages
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// POST 요청 처리 (새 메시지 추가)
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "시트를 찾을 수 없습니다."
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    const { name, content, timestamp } = data;
    
    // 데이터 유효성 검사
    if (!name || !content) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "성함과 메시지는 필수입니다."
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["성함", "메시지", "작성일시"]);
    }
    
    // 새 행 추가
    sheet.appendRow([
      name,
      content,
      timestamp || new Date().toLocaleDateString("ko-KR")
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "메시지가 저장되었습니다."
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
