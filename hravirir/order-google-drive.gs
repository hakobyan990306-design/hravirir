/* HRAVIRIR.AM — պատվերներ + նկարներ → Google Drive և Google Sheets + email ծանուցում

   ԿԱՐԳԱՎՈՐՈՒՄ (մեկ անգամ, ~5 րոպե).
   1. Բացեք sheets.new → անվանեք «HRAVIRIR պատվերներ»
   2. Extensions → Apps Script → ջնջեք եղածը և տեղադրեք այս ամբողջ կոդը → Save
   3. Deploy → New deployment → ⚙ Select type: Web app
      Execute as: Me   ·   Who has access: Anyone   → Deploy → Authorize (թույլ տվեք)
   4. Պատճենեք https://script.google.com/macros/s/.../exec հղումը
   5. hravirir/invites/order.js ֆայլում դրեք այն՝  var ORDER_ENDPOINT = "…/exec";
   Այսուհետ ամեն պատվեր կլինի աղյուսակում, նկարները՝ Drive-ի «HRAVIRIR պատվերներ» թղթապանակում,
   իսկ Ձեր email-ին կգա նամակ՝ պատվերի տեքստով և թղթապանակի հղումով։ */

var NOTIFY_EMAIL = Session.getEffectiveUser().getEmail();   // կամ գրեք Ձեր email-ը

/* TELEGRAM. պատվերն ու նկարները կգան անմիջապես Ձեր Telegram-ին
   1. @BotFather → /newbot → ստացեք TOKEN-ը և դրեք ներքևի TG_TOKEN տողում (չակերտների մեջ)
   2. Ձեր բոտին գրեք /start (token-ը պահվում է՝ կոդը հետագայում թարմացնելիս կարող եք TG_TOKEN-ը դատարկ թողնել)
   3. Վերևում ընտրեք setupTelegram ֆունկցիան և սեղմեք «Выполнить» (Run). բոտը կգրի «Միացված է ✓»
   4. Начать развертывание → Управление развертываниями → ✏️ → Версия: Новая версия → Начать развертывание */
var TG_TOKEN = "";
var TG_CHAT = "";   // պետք չէ լրացնել. setupTelegram-ը ինքը կգտնի և կպահի

function tgToken_() { return TG_TOKEN || PropertiesService.getScriptProperties().getProperty("TG_TOKEN") || ""; }
function tgChat_() { return TG_CHAT || PropertiesService.getScriptProperties().getProperty("TG_CHAT") || ""; }

// մեկ անգամ գործարկեք խմբագրիչից. գտնում է Ձեր չաթը (բոտին /start գրելուց հետո) և ուղարկում ստուգման հաղորդագրություն
function setupTelegram() {
  if (!TG_TOKEN) throw new Error("Նախ դրեք TG_TOKEN-ը");
  PropertiesService.getScriptProperties().setProperty("TG_TOKEN", TG_TOKEN);   // պահվում է, որ կոդը թարմացնելիս նորից չդնեք
  var res = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + TG_TOKEN + "/getUpdates").getContentText());
  var ups = (res.result || []).filter(function (u) { return u.message && u.message.chat; });
  if (!ups.length) throw new Error("Բոտը հաղորդագրություն չի ստացել. գրեք նրան /start և նորից գործարկեք");
  var chat = String(ups[ups.length - 1].message.chat.id);
  PropertiesService.getScriptProperties().setProperty("TG_CHAT", chat);
  UrlFetchApp.fetch("https://api.telegram.org/bot" + TG_TOKEN + "/sendMessage", { method: "post", payload: { chat_id: chat, text: "HRAVIRIR պատվերները միացված են ✓" } });
}

function toTelegram_(data) {
  var TG_CHAT = tgChat_(), TG_TOKEN = tgToken_(); if (!TG_TOKEN || !TG_CHAT) return;
  var api = "https://api.telegram.org/bot" + TG_TOKEN;
  UrlFetchApp.fetch(api + "/sendMessage", { method: "post", payload: { chat_id: TG_CHAT, text: (data.text || "").slice(0, 4000) } });
  (data.photos || []).forEach(function (p) {
    UrlFetchApp.fetch(api + "/sendDocument", { method: "post", payload: { chat_id: TG_CHAT, document: Utilities.newBlob(Utilities.base64Decode(p.data), p.type || "image/jpeg", p.name) } });
  });
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var root = getFolder_("HRAVIRIR պատվերներ", DriveApp.getRootFolder());
  var stamp = Utilities.formatDate(new Date(), "Asia/Yerevan", "yyyy-MM-dd HH-mm");
  var folder = root.createFolder(stamp + " " + (data.insta || data.phone || "պատվեր"));
  folder.createFile("պատվեր.txt", data.text || "", MimeType.PLAIN_TEXT);
  (data.photos || []).forEach(function (p) {
    folder.createFile(Utilities.newBlob(Utilities.base64Decode(p.data), p.type || "image/jpeg", p.name));
  });
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(["Ժամանակ", "Instagram", "Հեռախոս", "Նկարներ", "Թղթապանակ", "Պատվեր"]);
  sh.appendRow([new Date(), data.insta || "", data.phone || "", (data.photos || []).length, folder.getUrl(), data.text || ""]);
  try { toTelegram_(data); } catch (err) {}
  MailApp.sendEmail(NOTIFY_EMAIL, "Նոր պատվեր HRAVIRIR.AM — " + (data.insta || ""), (data.text || "") + "\n\nՆկարներ՝ " + folder.getUrl());
  return ContentService.createTextOutput("ok");
}

function getFolder_(name, parent) {
  var it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

// Ստուգում. հղումը բրաուզերում բացելիս պետք է գրի «HRAVIRIR պատվերները աշխատում են ✓»
function doGet() {
  return ContentService.createTextOutput("HRAVIRIR պատվերները աշխատում են ✓");
}
