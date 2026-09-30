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

/* TELEGRAM (ըստ ցանկության). պատվերն ու նկարները կգան անմիջապես Ձեր Telegram-ին
   1. Telegram-ում գրեք @BotFather-ին → /newbot → ստացեք TOKEN-ը
   2. Գրեք Ձեր նոր բոտին ցանկացած հաղորդագրություն, հետո բացեք
      https://api.telegram.org/bot<TOKEN>/getUpdates և գտեք "chat":{"id": … } թիվը
   3. Լրացրեք ներքևի երկու տողը և նորից Deploy արեք (Manage deployments → Edit → New version) */
var TG_TOKEN = "";
var TG_CHAT = "";

function toTelegram_(data) {
  if (!TG_TOKEN || !TG_CHAT) return;
  var api = "https://api.telegram.org/bot" + TG_TOKEN;
  UrlFetchApp.fetch(api + "/sendMessage", { method: "post", payload: { chat_id: TG_CHAT, text: (data.text || "").slice(0, 4000) } });
  (data.photos || []).forEach(function (p) {
    UrlFetchApp.fetch(api + "/sendPhoto", { method: "post", payload: { chat_id: TG_CHAT, photo: Utilities.newBlob(Utilities.base64Decode(p.data), "image/jpeg", p.name) } });
  });
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var root = getFolder_("HRAVIRIR պատվերներ", DriveApp.getRootFolder());
  var stamp = Utilities.formatDate(new Date(), "Asia/Yerevan", "yyyy-MM-dd HH-mm");
  var folder = root.createFolder(stamp + " " + (data.insta || data.phone || "պատվեր"));
  folder.createFile("պատվեր.txt", data.text || "", MimeType.PLAIN_TEXT);
  (data.photos || []).forEach(function (p) {
    folder.createFile(Utilities.newBlob(Utilities.base64Decode(p.data), "image/jpeg", p.name));
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
