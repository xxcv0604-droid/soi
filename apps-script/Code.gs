// Apps Script Web App that appends one preorder submission as a row.
// Setup: open the target Google Sheet -> Extensions -> Apps Script,
// paste this file's contents in as Code.gs, then Deploy -> New deployment
// -> type "Web app" -> Execute as "Me" -> Who has access "Anyone" -> Deploy.
// Copy the resulting /exec URL into index.html's APPS_SCRIPT_URL constant.

const SPREADSHEET_ID = "1r3kq01GL3xN3bz2enA1qZESJwQ5T6C9KJbCLU_J_m0M";

const HEADERS = ["제출 시각", "이름", "이메일", "선택한 향"];

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    Array.isArray(data.scents) && data.scents.length ? data.scents.join(", ") : "(선택 안 함)"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
