/* HRAVIRIR.AM — պատվերի ձև, որի դաշտերը փոխվում են ըստ միջոցառման տեսակի, երկու լեզվով (ՀԱՅ / РУС)
   window.HravirirOrder.mount(element, { design: "id", designs: [{id,name}], lang: "hy"|"ru" })  — էջի մեջ (գլխավոր էջ)
   window.HravirirOrder.open("id", "Անուն", "Հարսանիք")                                       — պատուհանով (հրավերի էջ) */
(function () {
  "use strict";
  var PHONE = "37499741574";
  var TG_USER = "champagne_wall";  // Ձեր Telegram username-ը
  var TG_NAME = "@" + TG_USER;     // հաճախորդին ասում ենք՝ որ չաթն ընտրել
  // Google Apps Script-ի հղումը (տես order-google-drive.gs). երբ դրված է, պատվերն ու նկարները պահվում են Google Drive-ում
  var ORDER_ENDPOINT = "";
  var BASE = 8000;
  var EXTRA_PRICES = [2000, 2000, 3000, 5000, 2000];
  var LANG_PRICES = [0, 5000, 9000];

  // բոլոր տեքստերը՝ երկու լեզվով
  var T = {
    hy: {
      title: "Հրավիրատոմսի պատրաստման ինֆորմացիա", sub: "Լրացրեք այն ինֆորմացիան, որը կցանկանաք տեսնել հրավիրատոմսում",
      type: "Միջոցառման տեսակը", design: "Հավանած դիզայնը", choose: "— Ընտրեք —",
      main: "Գլխավոր նկար", mainBtn: "+ Ընտրել գլխավոր նկարը", more: "Մնացած նկարները (մինչև 10)", moreBtn: "+ Ավելացնել նկարներ",
      wish: "Բարեմաղթանք (տեքստ հրավերի համար)", wishPh: "Եթե ունեք Ձեր տեքստը, գրեք այստեղ, եթե ոչ՝ կառաջարկենք մենք", notes: "Լրացուցիչ նշումներ",
      phone: "Հեռախոսահամար", langs: "Հրավերի լեզուները", extras: "Լրացուցիչ ծառայություններ", total: "Ընդհանուր արժեք",
      tg: "Ուղարկել Telegram-ով", pay: "Վճարումը՝ պատվերը հաստատելուց հետո", req: "Լրացրեք պարտադիր դաշտերը (*)",
      date: "Միջոցառման օր", day: "Օր", month: "Ամիս", year: "Տարի", time: "Ժամ", at: ", ժամը ",
      months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
      types: { wedding: "Հարսանիք", engagement: "Նշանադրություն", baptism: "Մկրտություն", birthday: "Ծնունդ", corporate: "Կորպորատիվ", other: "Այլ" },
      extraNames: ["Պատրաստել 24 ժամում", "Դրեսկոդ", "Մասնակցության հաստատում", "Հյուրերի ցուցակը ըստ սեղանների", "Նախընտրած երաժշտություն"],
      langNames: ["Միայն հայերեն", "Երկլեզու", "Եռալեզու"],
      f: {
        groom: "Փեսայի անուն", bride: "Հարսի անուն", groomHome: "Փեսայի տան հասցե", groomHomeT: "Փեսայի տան ժամ", brideHome: "Հարսի տան հասցե", brideHomeT: "Հարսի տան ժամ",
        zags: "ՔԿԱԳ-ի (ԶԱԳՍ) արարողության վայր", zagsT: "ՔԿԱԳ-ի ժամ", church: "Եկեղեցի", churchT: "Եկեղեցու ժամ", rest: "Ռեստորան", restT: "Ռեստորանի ժամ",
        child: "Մկրտվողի անուն(ներ)", hero: "Հոբելյարի անուն", title: "Միջոցառման վերնագիր"
      },
      m: { hello: "Բարև Ձեզ, պատվեր HRAVIRIR.AM-ից", event: "Միջոցառում", photos: "Նկարներ", pcs: "հատ", drive: " (ուղարկված են Google Drive)", design: "Դիզայն", wish: "Բարեմաղթանք",
        notes: "Նշումներ", lang: "Լեզու", extra: "Լրացուցիչ", phone: "Հեռախոս", total: "Ընդհանուր արժեք", form: "Ձևի լեզուն" },
      sending: "Պատվերն ուղարկվում է…", sent: "Պատվերը և նկարները ստացվել են ✓ Շուտով կկապվենք Ձեզ հետ", fail: "Չստացվեց. խնդրում ենք ուղարկել Telegram-ով",
      pickTg: "Ընտրեք Telegram և " + TG_NAME + " չաթը", pickChat: "Ընտրեք " + TG_NAME + " չաթը", photosToo: ", իսկ նկարները ուղարկեք նույն չաթում",
      copied: "Հաղորդագրությունը պատճենված է. տեղադրեք այն Viber-ում", order: "Պատվեր", close: "Փակել"
    },
    ru: {
      title: "Информация для приглашения", sub: "Заполните то, что хотите видеть в приглашении",
      type: "Тип мероприятия", design: "Понравившийся дизайн", choose: "— Выберите —",
      main: "Главное фото", mainBtn: "+ Выбрать главное фото", more: "Остальные фото (до 10)", moreBtn: "+ Добавить фото",
      wish: "Пожелание (текст для приглашения)", wishPh: "Если у вас есть свой текст, напишите здесь; если нет — мы предложим", notes: "Дополнительные пожелания",
      phone: "Номер телефона", langs: "Языки приглашения", extras: "Дополнительные услуги", total: "Итого",
      tg: "Отправить в Telegram", pay: "Оплата — после подтверждения заказа", req: "Заполните обязательные поля (*)",
      date: "Дата мероприятия", day: "День", month: "Месяц", year: "Год", time: "Время", at: ", в ",
      months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
      types: { wedding: "Свадьба", engagement: "Помолвка", baptism: "Крестины", birthday: "День рождения", corporate: "Корпоратив", other: "Другое" },
      extraNames: ["Готовность за 24 часа", "Дресс-код", "Подтверждение присутствия", "Список гостей по столам", "Своя музыка"],
      langNames: ["Только армянский", "Два языка", "Три языка"],
      f: {
        groom: "Имя жениха", bride: "Имя невесты", groomHome: "Адрес дома жениха", groomHomeT: "Время", brideHome: "Адрес дома невесты", brideHomeT: "Время",
        zags: "Место регистрации (ЗАГС)", zagsT: "Время", church: "Церковь", churchT: "Время", rest: "Ресторан", restT: "Время",
        child: "Имя крещаемого", hero: "Имя именинника", title: "Название мероприятия"
      },
      m: { hello: "Здравствуйте, заказ с HRAVIRIR.AM", event: "Мероприятие", photos: "Фото", pcs: "шт.", drive: " (отправлены в Google Drive)", design: "Дизайн", wish: "Пожелание",
        notes: "Примечания", lang: "Языки", extra: "Дополнительно", phone: "Телефон", total: "Итого", form: "Язык формы" },
      sending: "Отправляем заказ…", sent: "Заказ и фото получены ✓ Скоро свяжемся с вами", fail: "Не получилось. Пожалуйста, отправьте через Telegram",
      pickTg: "Выберите Telegram и чат " + TG_NAME, pickChat: "Выберите чат " + TG_NAME, photosToo: ", а фото отправьте в тот же чат",
      copied: "Сообщение скопировано — вставьте его в Viber", order: "Заказ", close: "Закрыть"
    },
    en: {
      title: "Invitation details", sub: "Fill in what you'd like to see in your invitation",
      type: "Type of event", design: "Chosen design", choose: "— Choose —",
      main: "Main photo", mainBtn: "+ Choose the main photo", more: "Other photos (up to 10)", moreBtn: "+ Add photos",
      wish: "Wishes (text for the invitation)", wishPh: "If you have your own text, write it here; if not, we'll suggest one", notes: "Additional notes",
      phone: "Phone number", langs: "Invitation languages", extras: "Extra services", total: "Total",
      tg: "Send via Telegram", pay: "Payment after the order is confirmed", req: "Please fill in the required fields (*)",
      date: "Date of the event", day: "Day", month: "Month", year: "Year", time: "Time", at: ", at ",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      types: { wedding: "Wedding", engagement: "Engagement", baptism: "Baptism", birthday: "Birthday", corporate: "Corporate", other: "Other" },
      extraNames: ["Ready in 24 hours", "Dress code", "RSVP", "Seating list", "Your own music"],
      langNames: ["Armenian only", "Two languages", "Three languages"],
      f: {
        groom: "Groom's name", bride: "Bride's name", groomHome: "Groom's home address", groomHomeT: "Time", brideHome: "Bride's home address", brideHomeT: "Time",
        zags: "Civil registration venue", zagsT: "Time", church: "Church", churchT: "Time", rest: "Restaurant", restT: "Time",
        child: "Child's name", hero: "Celebrant's name", title: "Event title"
      },
      m: { hello: "Hello, an order from HRAVIRIR.AM", event: "Event", photos: "Photos", pcs: "pcs", drive: " (sent to Google Drive)", design: "Design", wish: "Wishes",
        notes: "Notes", lang: "Languages", extra: "Extras", phone: "Phone", total: "Total", form: "Form language" },
      sending: "Sending your order…", sent: "Order and photos received ✓ We'll contact you soon", fail: "Something went wrong. Please send it via Telegram",
      pickTg: "Choose Telegram and the " + TG_NAME + " chat", pickChat: "Choose the " + TG_NAME + " chat", photosToo: ", and send the photos to the same chat",
      copied: "The message is copied — paste it in Viber", order: "Order", close: "Close"
    }
  };  // Հին կանչերը տեսակը փոխանցում են հայերեն անունով
  var TYPE_ALIAS = { "Հարսանիք": "wedding", "Նշանադրություն": "engagement", "Նշանդրեք": "engagement", "Մկրտություն": "baptism", "Կնունք": "baptism", "Ծնունդ": "birthday", "Կորպորատիվ": "corporate", "Այլ": "other" };
  var TIME_F = { groomHomeT: 1, brideHomeT: 1, zagsT: 1, churchT: 1, restT: 1 };
  var TYPES = {
    wedding: [["groom", "bride"], ["groomHome", "groomHomeT"], ["brideHome", "brideHomeT"], "DATE", ["zags", "zagsT"], ["church", "churchT"], ["rest", "restT"]],
    engagement: [["groom", "bride"], "DATE", ["rest", "restT"]],
    baptism: ["child", "DATE", ["church", "churchT"], ["rest", "restT"]],
    birthday: ["hero", "DATE", ["rest", "restT"]],
    corporate: ["title", "DATE", ["rest", "restT"]],
    other: ["title", "DATE", ["rest", "restT"]]
  };
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ֏"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function startLang(opt) {
    if (opt.lang && T[opt.lang]) return opt.lang;
    try { var s = localStorage.getItem("ho-lang") || localStorage.getItem("site-lang"); if (T[s]) return s; } catch (e) {}
    return T[document.documentElement.lang] ? document.documentElement.lang : "hy";
  }

  var CSS = '.hof{font:15px/1.5 "Noto Sans Armenian",system-ui,sans-serif;color:#2b2622;text-align:left}' +
    '.hof h3{font:600 20px/1.3 "Noto Sans Armenian",sans-serif;margin:0 40px 2px 0}.hof .sub{color:#7a6f66;font-size:13px;margin-bottom:10px}' +
    '.hof .lbl{display:block;font-size:12.5px;font-weight:600;margin:14px 0 5px}.hof .lbl i{color:#b23a48;font-style:normal}' +
    '.hof input,.hof select,.hof textarea{width:100%;padding:11px 12px;border:1px solid #dcd2c6;border-radius:10px;background:#fff;font:16px "Noto Sans Armenian",sans-serif;color:#2b2622;box-sizing:border-box}' +
    '.hof textarea{min-height:74px;resize:vertical}.hof input:focus,.hof select:focus,.hof textarea:focus{outline:2px solid #e8d5b0;border-color:#b8904f}' +
    '.hof .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.hof .row.t{grid-template-columns:1fr 110px}' +
    '.hof .types{display:flex;flex-wrap:wrap;gap:6px}.hof .types label{position:relative}.hof .types input{position:absolute;opacity:0;pointer-events:none}' +
    '.hof .types span{display:inline-block;padding:9px 14px;border:1px solid #dcd2c6;border-radius:999px;background:#fff;font-size:14px;cursor:pointer}' +
    '.hof .types input:checked+span{background:#7a2437;border-color:#7a2437;color:#fff}.hof .types input:focus-visible+span{outline:2px solid #b8904f}' +
    '.hof .ck{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e3d9cc;border-radius:10px;margin-top:6px;cursor:pointer;background:#fff;font-size:14px}' +
    '.hof .ck em{margin-left:auto;font-style:normal;font-weight:600;color:#7a2437;white-space:nowrap}.hof .ck input{width:18px;height:18px;accent-color:#7a2437;flex:none;padding:0}' +
    '.hof .tot{display:flex;justify-content:space-between;align-items:baseline;margin:16px 0 4px;padding-top:12px;border-top:1px solid #e3d9cc}.hof .tot b{font-size:24px;color:#7a2437}' +
    '.hof .bt{display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;border:0;border-radius:999px;margin-top:8px;font:600 15px "Noto Sans Armenian",sans-serif;color:#fff;cursor:pointer}' +
    '.hof .wa{background:#25d366}.hof .vb{background:#7360f2}.hof .tg{background:#2aabee}.hof .two{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
    '.hof .nt{font-size:12px;color:#7a6f66;text-align:center;margin-top:8px}.hof .err{color:#b23a48;font-size:13px;margin-top:8px;text-align:center}.hof .bad{border-color:#b23a48}' +
    '.hof .row3{display:grid;grid-template-columns:82px 1fr 90px;gap:8px}' +
    '.hof .up{display:block;position:relative;border:1.5px dashed #c9b28a;border-radius:12px;background:#fff;text-align:center;padding:16px 10px;cursor:pointer;color:#7a2437;font-weight:600;font-size:14px}' +
    '.hof .up.main{padding:22px 10px}.hof .up input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}' +
    '.hof .thumbs{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.hof .thumbs i{position:relative;width:74px;height:74px;border-radius:10px;background:#eee center/cover}' +
    '.hof .tm i{width:110px;height:140px}.hof .thumbs b{position:absolute;top:-6px;right:-6px;width:24px;height:24px;border-radius:50%;background:#2b2622;color:#fff;font-size:12px;display:grid;place-items:center;cursor:pointer}' +
    '.hof .lg{display:inline-flex;border:1px solid #dcd2c6;border-radius:999px;padding:3px;background:#fff;margin-bottom:6px}' +
    '.hof .lg button{border:0;background:none;border-radius:999px;padding:6px 14px;font:600 12.5px "Noto Sans Armenian",sans-serif;letter-spacing:.06em;color:#7a6f66;cursor:pointer;min-height:32px}' +
    '.hof .lg button.on{background:#2b2622;color:#fff}' +
    '@media(max-width:400px){.hof .row{grid-template-columns:1fr}.hof .row.t{grid-template-columns:1fr 100px}}' +
    '.ho-ov{position:fixed;inset:0;z-index:1000;background:rgba(20,16,14,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .3s}' +
    '.ho-ov.on{opacity:1}.ho{position:relative;width:100%;max-width:520px;max-height:92svh;overflow:auto;background:#fbf8f3;border-radius:22px 22px 0 0;padding:22px 18px calc(20px + env(safe-area-inset-bottom,0px));transform:translateY(40px);transition:transform .35s cubic-bezier(.2,.8,.2,1);box-shadow:0 -20px 50px rgba(0,0,0,.25)}' +
    '.ho-ov.on .ho{transform:none}@media(min-width:600px){.ho-ov{align-items:center}.ho{border-radius:22px}}' +
    '.ho .x{position:absolute;right:14px;top:14px;width:36px;height:36px;border:0;border-radius:50%;background:#efe8de;font-size:18px;cursor:pointer;color:#2b2622}';

  function mount(root, opt) {
    opt = opt || {};
    var designs = opt.designs || [];
    var lang = startLang(opt), L = T[lang];
    var curType = TYPE_ALIAS[opt.type] || (TYPES[opt.type] ? opt.type : "wedding");
    var saved = {};                          // դինամիկ դաշտերի արժեքները (տեսակը կամ լեզուն փոխելիս չեն կորչում)
    var photos = { main: null, more: [] };   // { name, blob, url }
    root.classList.add("hof");

    var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };

    function build() {
      root.innerHTML = '<div class="lg" role="group" aria-label="Language"><button type="button" data-lg="hy"' + (lang === "hy" ? ' class="on"' : "") + '>ՀԱՅ</button><button type="button" data-lg="ru"' + (lang === "ru" ? ' class="on"' : "") + ">РУС</button><button type=\"button\" data-lg=\"en\"" + (lang === "en" ? ' class=\"on\"' : "") + ">ENG</button></div>" +
        (opt.title === false ? "" : "<h3>" + L.title + '</h3><div class="sub">' + L.sub + "</div>") +
        '<label class="lbl">' + L.type + '</label><div class="types">' + Object.keys(TYPES).map(function (k) {
          return '<label><input type="radio" name="hoType" value="' + k + '"' + (k === curType ? " checked" : "") + "><span>" + L.types[k] + "</span></label>";
        }).join("") + "</div>" +
        '<div class="dyn"></div>' +
        '<label class="lbl">' + L.design + " <i>*</i></label>" +
        (designs.length ? '<select name="design"><option value="">' + L.choose + "</option>" + designs.map(function (d) { return '<option value="' + esc(d.name) + '"' + (d.id === opt.design ? " selected" : "") + ">" + esc(d.name) + "</option>"; }).join("") + "</select>"
          : '<input name="design" value="' + esc(opt.designName || opt.design || "") + '">') +
        '<label class="lbl">' + L.main + '</label><label class="up main"><input type="file" name="mainPhoto" accept="image/*"><span>' + L.mainBtn + '</span></label><div class="thumbs tm"></div>' +
        '<label class="lbl">' + L.more + '</label><label class="up"><input type="file" name="morePhotos" accept="image/*" multiple><span>' + L.moreBtn + '</span></label><div class="thumbs tx"></div>' +
        '<label class="lbl">' + L.wish + '</label><textarea name="wish" placeholder="' + esc(L.wishPh) + '"></textarea>' +
        '<label class="lbl">' + L.notes + '</label><textarea name="notes"></textarea>' +
        '<div class="row"><div><label class="lbl">Instagram <i>*</i></label><input name="insta" placeholder="@anun"></div><div><label class="lbl">' + L.phone + ' <i>*</i></label><input name="phone" type="tel" placeholder="+374 ..."></div></div>' +
        '<label class="lbl">' + L.langs + "</label>" + LANG_PRICES.map(function (p, i) { return '<label class="ck"><input type="radio" name="hoLang" value="' + i + '"' + (i ? "" : " checked") + ">" + L.langNames[i] + (p ? "<em>+" + money(p) + "</em>" : "") + "</label>"; }).join("") +
        '<label class="lbl">' + L.extras + "</label>" + EXTRA_PRICES.map(function (p, i) { return '<label class="ck"><input type="checkbox" name="hoEx" value="' + i + '">' + L.extraNames[i] + "<em>+" + money(p) + "</em></label>"; }).join("") +
        '<div class="tot"><span>' + L.total + '</span><b class="sum">' + money(BASE) + "</b></div>" +
        '<button type="button" class="bt tg">' + L.tg + '</button><div class="two"><button type="button" class="bt wa">WhatsApp</button><button type="button" class="bt vb">Viber</button></div>' +
        '<div class="err" hidden></div><div class="nt">' + L.pay + "</div>";
      renderDyn(); drawThumbs(); calc();
    }
    // լեզուն փոխելիս պահում ենք լրացված ամեն ինչը
    function snapshot() {
      var s = {};
      qa("input, select, textarea").forEach(function (i) {
        if (i.type === "file" || i.closest(".dyn")) return;
        if (i.type === "radio" || i.type === "checkbox") { if (i.checked) (s[i.name] = s[i.name] || []).push(i.value); }
        else s[i.name] = i.value;
      });
      qa(".dyn input, .dyn select").forEach(function (i) { saved[i.name] = i.value; });
      return s;
    }
    function restore(s) {
      qa("input, select, textarea").forEach(function (i) {
        if (i.type === "file" || i.closest(".dyn") || !(i.name in s)) return;
        if (i.type === "radio" || i.type === "checkbox") i.checked = s[i.name].indexOf(i.value) > -1;
        else i.value = s[i.name];
      });
      calc();
    }
    function setLang(l) {
      if (l === lang || !T[l]) return;
      var s = snapshot(); lang = l; L = T[l];
      try { localStorage.setItem("ho-lang", l); } catch (e) {}
      build(); restore(s);
    }

    // նկարը փոքրացնում ենք մինչև 1600px, որ արագ ուղարկվի
    function shrink(file) {
      return new Promise(function (res) {
        var img = new Image(), url = URL.createObjectURL(file);
        img.onload = function () {
          var k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement("canvas");
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) { URL.revokeObjectURL(url); res({ name: file.name.replace(/\.\w+$/, "") + ".jpg", blob: b, url: URL.createObjectURL(b) }); }, "image/jpeg", .85);
        };
        img.onerror = function () { res(null); };
        img.src = url;
      });
    }
    function drawThumbs() {
      q(".tm").innerHTML = photos.main ? '<i style="background-image:url(' + photos.main.url + ')"><b data-rm="main">✕</b></i>' : "";
      q(".tx").innerHTML = photos.more.map(function (p, i) { return '<i style="background-image:url(' + p.url + ')"><b data-rm="' + i + '">✕</b></i>'; }).join("");
    }
    function onFiles(input) {
      var files = [].slice.call(input.files || []);
      Promise.all(files.map(shrink)).then(function (list) {
        list = list.filter(Boolean);
        if (input.name === "mainPhoto") photos.main = list[0] || photos.main;
        else photos.more = photos.more.concat(list).slice(0, 10);
        input.value = ""; drawThumbs();
      });
    }
    function type() { return (q('input[name="hoType"]:checked') || {}).value || "wedding"; }
    // ժամ և ամսաթիվ՝ ընտրացանկերով (զննարկիչի input[type=date]-ը ցույց է տալիս համակարգչի լեզուն)
    function opts(list, sel, first) { return '<option value="">' + first + "</option>" + list.map(function (o) { var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o; return '<option value="' + v + '"' + (String(v) === String(sel) ? " selected" : "") + ">" + t + "</option>"; }).join(""); }
    var TIMES = []; for (var h = 8; h < 24; h++) for (var m = 0; m < 60; m += 15) TIMES.push((h < 10 ? "0" : "") + h + ":" + (m ? m : "00"));
    var DAYS = []; for (var d = 1; d <= 31; d++) DAYS.push(d);
    var YEAR = new Date().getFullYear(), YEARS = [YEAR, YEAR + 1, YEAR + 2];
    function field(k) {
      var v = saved[k] || "";
      if (TIME_F[k]) return '<div><label class="lbl">' + L.f[k] + '</label><select name="' + k + '">' + opts(TIMES, v, L.time) + "</select></div>";
      return '<div><label class="lbl">' + L.f[k] + '</label><input name="' + k + '" value="' + esc(v) + '"></div>';
    }
    function dateRow() {
      return '<label class="lbl">' + L.date + '</label><div class="row3"><select name="dd">' + opts(DAYS, saved.dd, L.day) + '</select><select name="mm">' +
        opts(L.months.map(function (n, i) { return [i + 1, n]; }), saved.mm, L.month) + '</select><select name="yy">' + opts(YEARS, saved.yy, L.year) + "</select></div>";
    }
    function renderDyn() {
      qa(".dyn input, .dyn select").forEach(function (i) { saved[i.name] = i.value; });
      curType = type();
      q(".dyn").innerHTML = TYPES[curType].map(function (it) {
        if (it === "DATE") return dateRow();
        if (Array.isArray(it)) return '<div class="row' + (TIME_F[it[1]] ? " t" : "") + '">' + field(it[0]) + field(it[1]) + "</div>";
        return field(it);
      }).join("");
    }
    function calc() {
      var li = +(q('input[name="hoLang"]:checked') || { value: 0 }).value;
      var ex = qa('input[name="hoEx"]:checked').map(function (c) { return +c.value; });
      var total = BASE + LANG_PRICES[li] + ex.reduce(function (s, i) { return s + EXTRA_PRICES[i]; }, 0);
      q(".sum").textContent = money(total);
      return { l: L.langNames[li], ex: ex.map(function (i) { return L.extraNames[i]; }), total: total };
    }
    function val(n) { var e = q('[name="' + n + '"]'); return e ? e.value.trim() : ""; }
    function check() {
      var bad = ["insta", "phone", "design"].filter(function (n) { return !val(n); });
      qa(".bad").forEach(function (e) { e.classList.remove("bad"); });
      bad.forEach(function (n) { var e = q('[name="' + n + '"]'); if (e) e.classList.add("bad"); });
      var er = q(".err"); er.hidden = !bad.length; er.textContent = L.req;
      return !bad.length;
    }
    function msg() {
      var s = calc(), M = L.m, out = [M.hello, "", M.event + ": " + L.types[type()]];
      qa(".dyn input, .dyn select").forEach(function (i) {
        var v = i.value.trim(), k = i.name;
        if (!v || /^(dd|mm|yy)$/.test(k)) return;
        if (TIME_F[k + "T"]) { var t = val(k + "T"); out.push(L.f[k] + ": " + v + (t ? L.at + t : "")); return; }
        if (TIME_F[k]) { if (!val(k.slice(0, -1))) out.push(L.f[k] + ": " + v); return; }
        out.push(L.f[k] + ": " + v);
      });
      if (val("dd") || val("mm") || val("yy")) out.push(L.date + ": " + (val("dd") || "?") + " " + (val("mm") ? L.months[val("mm") - 1] : "?") + " " + (val("yy") || ""));
      var np = (photos.main ? 1 : 0) + photos.more.length;
      if (np) out.push(M.photos + ": " + np + " " + M.pcs + (ORDER_ENDPOINT ? M.drive : ""));
      out.push(M.design + ": " + val("design"));
      if (val("wish")) out.push(M.wish + ": " + val("wish"));
      if (val("notes")) out.push(M.notes + ": " + val("notes"));
      out.push(M.lang + ": " + s.l);
      if (s.ex.length) out.push(M.extra + ": " + s.ex.join(", "));
      out.push("Instagram: " + val("insta"), M.phone + ": " + val("phone"), "", M.total + ": " + money(s.total));
      return out.join("\n");
    }
    function copy() { try { navigator.clipboard.writeText(msg()); } catch (e) {} }
    function allPhotos() { return (photos.main ? [photos.main] : []).concat(photos.more); }
    function b64(blob) { return new Promise(function (r) { var fr = new FileReader(); fr.onload = function () { r(String(fr.result).split(",")[1]); }; fr.readAsDataURL(blob); }); }
    // Google Drive-ի պահոց (եթե ORDER_ENDPOINT-ը դրված է)
    function toDrive(text) {
      var list = allPhotos();
      return Promise.all(list.map(function (p) { return b64(p.blob); })).then(function (data) {
        return fetch(ORDER_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ text: text, insta: val("insta"), phone: val("phone"), photos: list.map(function (p, i) { return { name: (i === 0 && photos.main ? "01-glkhavor-" : "") + p.name, data: data[i] }; }) }) });
      });
    }
    // ԳԼԽԱՎՈՐԸ՝ Telegram. բացվում է պատրաստի տեքստով, հաճախորդն ընտրում է HRAVIRIR.AM-ի չաթը
    function tgShare(text) { return "https://t.me/share/url?url=" + encodeURIComponent("https://hravirir.am") + "&text=" + encodeURIComponent(text); }
    function sendTg() {
      if (!check()) return;
      var text = msg(), list = allPhotos(), note = q(".nt");
      copy();
      if (ORDER_ENDPOINT) {
        note.textContent = L.sending;
        toDrive(text).then(function () { note.textContent = L.sent; }, function () { note.textContent = L.fail; window.open(tgShare(text), "_blank"); });
        return;
      }
      // հեռախոսում՝ «Կիսվել» ընտրացանկով տեքստը և նկարները միասին
      var files = list.map(function (p) { return new File([p.blob], p.name, { type: "image/jpeg" }); });
      if (files.length && navigator.canShare && navigator.canShare({ files: files })) {
        navigator.share({ files: files, text: text }).catch(function () {});
        note.textContent = L.pickTg;
        return;
      }
      window.open(tgShare(text), "_blank");
      note.textContent = L.pickChat + (files.length ? L.photosToo : "");
    }

    // իրադարձությունները կապված են root-ին, որ լեզուն փոխելիս (build) չկորչեն
    root.addEventListener("click", function (e) {
      var t = e.target.closest("[data-rm], [data-lg], .tg, .wa, .vb"); if (!t) return;
      if (t.dataset.rm) { if (t.dataset.rm === "main") photos.main = null; else photos.more.splice(+t.dataset.rm, 1); drawThumbs(); }
      else if (t.dataset.lg) setLang(t.dataset.lg);
      else if (t.classList.contains("tg")) sendTg();
      else if (t.classList.contains("wa")) { if (check()) window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg()), "_blank"); }
      else if (t.classList.contains("vb")) { if (!check()) return; copy(); q(".nt").textContent = L.copied; location.href = "viber://chat?number=%2B" + PHONE; }
    });
    root.addEventListener("change", function (e) {
      if (e.target.type === "file") { onFiles(e.target); return; }
      if (e.target.name === "hoType") renderDyn();
      calc();
    });
    build();
    return { setDesign: function (name) { var s = q('[name="design"]'); if (s) { s.value = name; } }, setLang: setLang };
  }

  function open(id, name, type) {
    var ov = document.createElement("div"), L = T[startLang({})];
    ov.className = "ho-ov";
    ov.innerHTML = '<div class="ho" role="dialog" aria-modal="true" aria-label="' + L.order + '"><button class="x" aria-label="' + L.close + '">✕</button><div class="body"></div></div>';
    document.body.appendChild(ov);
    // եթե տեսակը չի փոխանցվել, գուշակում ենք դիզայնի id-ից
    if (!type) type = /baptism/.test(id) ? "baptism" : /engage|ring/.test(id) ? "engagement" : /kids|birthday|gift|jubilee/.test(id) ? "birthday" : "wedding";
    mount(ov.querySelector(".body"), { design: id, designName: name, type: type });
    function close() { ov.classList.remove("on"); setTimeout(function () { ov.remove(); }, 300); document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    ov.querySelector(".x").onclick = close;
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(function () { ov.classList.add("on"); });
  }

  if (!document.getElementById("ho-css")) { var st = document.createElement("style"); st.id = "ho-css"; st.textContent = CSS; document.head.appendChild(st); }
  window.HravirirOrder = { open: open, mount: mount };
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-order]");
    if (!a || a.closest(".hof")) return;
    e.preventDefault();
    open(a.getAttribute("data-order"), a.getAttribute("data-name") || document.title, a.getAttribute("data-type"));
  });
})();
