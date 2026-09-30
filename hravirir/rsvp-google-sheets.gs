/* Մասնակցության հաստատում → Google Sheets
   1. Բացեք sheets.new, ստեղծեք աղյուսակ հաճախորդի համար
   2. Extensions → Apps Script, ջնջեք եղածը և տեղադրեք այս կոդը
   3. Deploy → New deployment → Web app
      Execute as: Me · Who has access: Anyone → Deploy
   4. Ստացված https://script.google.com/macros/s/.../exec հղումը դրեք
      հրավերում՝ rsvp: { endpoint: "..." }
   5. Աղյուսակի հղումը տվեք հաճախորդին (Share → Viewer) */
function doPost(e) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Ժամանակ", "Անուն", "Կգա՞", "Քանակ", "Կողմ", "Նշում"]);
    sh.getRange(1, 1, 1, 6).setFontWeight("bold");
  }
  var p = e.parameter;
  sh.appendRow([new Date(), p.name || "", p.attend === "yes" ? "Այո" : "Ոչ", Number(p.guests || 1), p.side || "", p.note || ""]);
  return ContentService.createTextOutput("ok");
}
