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
  // հյուրերի պատասխան (հրավերի հարցաթերթիկից)
  if (e.parameter && e.parameter.kind === "rsvp") return ContentService.createTextOutput(rsvp_(e.parameter));
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


/* ===================== ՀՅՈՒՐԵՐԻ ՊԱՏԱՍԽԱՆՆԵՐ =====================
   Յուրաքանչյուր հրավեր (զույգ) ունի իր աղյուսակը Drive-ի «HRAVIRIR հյուրեր» թղթապանակում։
   Եթե հրավերում նշված է զույգի Gmail-ը (INVITE.rsvp.email), աղյուսակը ինքնաշխատ կիսվում է նրանց հետ (միայն դիտելու)։ */
function rsvp_(p) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var key = String(p.key || "invite").replace(/[^\w-]/g, "").slice(0, 60) || "invite";
    var props = PropertiesService.getScriptProperties(), id = props.getProperty("RSVP_" + key), ss = null;
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; } }
    if (!ss) {
      ss = SpreadsheetApp.create("Հյուրեր — " + (p.invite || key));
      DriveApp.getFileById(ss.getId()).moveTo(getFolder_("HRAVIRIR հյուրեր", DriveApp.getRootFolder()));
      var s0 = ss.getSheets()[0];
      s0.setName("Պատասխաններ");
      s0.getRange("A1:F1").setValues([["Ժամանակ", "Անուն, ազգանուն", "Կգա՞", "Քանի հոգի", "Ում կողմից", "Նշում"]]).setFontWeight("bold").setBackground("#f3e9dc");
      s0.setFrozenRows(1); s0.setColumnWidth(2, 220); s0.setColumnWidth(6, 260);
      s0.getRange("H1:H5").setValues([["Ընդամենը կգան (հոգի)"], [""], [""], ["Չեն գա (պատասխան)"], [""]]).setFontWeight("bold");
      s0.getRange("H2").setFormula('=SUMIF(C2:C,"Կգա",D2:D)'); s0.getRange("H5").setFormula('=COUNTIF(C2:C,"Չի գա")');
      s0.getRange("H2").setFontSize(18); s0.setColumnWidth(8, 200);
      props.setProperty("RSVP_" + key, ss.getId());
      if (p.email) { try { ss.addViewer(String(p.email).trim()); } catch (err) {} }
      var msg = "Նոր հյուրերի աղյուսակ — " + (p.invite || key) + "\n" + ss.getUrl() + (p.email ? "\nԿիսված է՝ " + p.email : "");
      try { toTelegram_({ text: msg }); } catch (err) {}
      try { MailApp.sendEmail(NOTIFY_EMAIL, "Հյուրերի աղյուսակ — " + (p.invite || key), msg); } catch (err) {}
    }
    if (p.setup) return ss.getUrl();   // միայն աղյուսակը ստեղծելու համար (առանց պատասխանի)
    var att = p.attend === "yes" ? "Կգա" : p.attend === "maybe" ? "Կտեղեկացնի" : "Չի գա";
    ss.getSheets()[0].appendRow([new Date(), p.name || "", att, p.attend === "yes" ? (Number(p.guests) || 1) : 0, p.side || "", p.note || ""]);
    return "ok";
  } finally { lock.releaseLock(); }
}
