/*
 * Ձմեռ Պապի տեքստերի գեներատոր (հայերեն)
 * Այս նույն ֆայլն աշխատում է և՛ բրաուզերում (tools/generator.html),
 * և՛ Google Apps Script-ում (պատճենեք որպես SantaText.gs)։
 *
 * Ծնողի դաշտերը գրվում են այնպես, որ նախադասությունը շարունակեն.
 *   interests   → «Դու սիրում ես …»            օր.՝ «նկարել և դինոզավրեր»
 *   achievement → «Այս տարի դու …»              օր.՝ «սովորեցիր կարդալ»
 *   gift        → «Դու ուզում ես …»             օր.՝ «կարմիր հեծանիվ»
 *   advice      → «Խնդրում եմ, որ դու …»        օր.՝ «ժամանակին քնես»
 *   family      → «Բարևներս փոխանցիր …»         օր.՝ «մայրիկին ու տատիկին»
 *
 * Քառակուսի փակագծերում՝ [warmly], [laughs] և այլն, Eleven v3-ի «audio tags»-երն են.
 * դրանք չեն արտասանվում, այլ փոխում են ձայնի տոնը (ջերմ, ծիծաղով, շշուկով)։
 */
var SantaText = (function () {
  var AGE_WORDS = ['', 'մեկ', 'երկու', 'երեք', 'չորս', 'հինգ', 'վեց', 'յոթ', 'ութ', 'ինը', 'տասը',
    'տասնմեկ', 'տասներկու', 'տասներեք', 'տասնչորս', 'տասնհինգ', 'տասնվեց'];

  var T = {
    intro: [
      '[cheerfully] Հո-հո-հո՜։ Բարև՛, {name}։ Ճանաչեցի՞ր ինձ։ Ես Ձմեռ Պապն եմ, և խոսում եմ հենց քեզ հետ՝ հեռու-հեռավոր Հյուսիսից։',
      '[warmly] Բարև քեզ, սիրելի՛ {name}։ [chuckles] Այո, այո, չես սխալվում, ես Ձմեռ Պապն եմ։ Այս ուղերձը միայն քեզ համար եմ պատրաստել։',
      '[cheerfully] Հո-հո-հո՜։ {name}, բարև՛, իմ փոքրիկ բարեկամ։ Ես Ձմեռ Պապն եմ։ Ուզո՞ւմ ես մի գաղտնիք իմանալ. ես քեզ շատ լավ եմ ճանաչում։'
    ],
    age: [
      'Գիտեմ, որ դու արդեն {age} տարեկան ես։ Ինչքա՜ն ես մեծացել այս տարի։',
      'Արդեն {age} տարեկան ես։ [laughs] Վա՜յ, ինչ արագ ես մեծանում։',
      'Իմ մեծ գրքում գրված է, որ դու արդեն {age} տարեկան ես։ Ճի՞շտ է։ [chuckles] Ձմեռ Պապը երբեք չի սխալվում։'
    ],
    interests: [
      'Իմ էլֆերն ինձ պատմել են, որ դու շատ ես սիրում {interests}։ Դա հրաշալի է։',
      'Ես գիտեմ, որ դու սիրում ես {interests}։ Ասեմ մի գաղտնիք՝ ես նույնպես դա շատ եմ սիրում։',
      'Նույնիսկ իմ հյուսիսային եղջերուները գիտեն, որ դու սիրում ես {interests}։'
    ],
    achievement: [
      'Իսկ այս տարի դու {achievement}։ [warmly] Ես շատ եմ հպարտանում քեզնով։',
      'Գիտե՞ս՝ ինչն ինձ շատ ուրախացրեց։ Այս տարի դու {achievement}։ Ապրե՛ս, {name}։',
      'Ես լսել եմ, որ այս տարի դու {achievement}։ Դու իսկական հերոս ես։'
    ],
    kind: [
      'Ես ամբողջ տարին հետևում էի քեզ և տեսնում էի, թե ինչքան բարի ու խելացի երեխա ես։',
      'Ամբողջ տարի ես տեսնում էի, թե ինչպես ես օգնում մեծերին ու ուրախացնում քո ընտանիքին։'
    ],
    giftPromise: [
      'Ես ստացել եմ քո նամակը և գիտեմ, որ ուզում ես {gift}։ [whispers] Ոչ ոքի մի՛ ասա, բայց իմ էլֆերն արդեն աշխատում են դրա վրա։',
      'Ինձ ասացին, որ շատ ես ուզում {gift}։ [chuckles] Իմ սահնակում արդեն առանձին տեղ կա քո նվերի համար։'
    ],
    giftMaybe: [
      'Գիտեմ, որ ուզում ես {gift}։ Ես քո ցանկությունը գրել եմ իմ մեծ գրքում և կփորձեմ այն կատարել։',
      'Ինձ ասացին, որ ուզում ես {gift}։ Ես կմտածեմ դրա մասին, իսկ դու շարունակի՛ր բարի լինել։'
    ],
    advice: [
      'Բայց մի փոքրիկ խնդրանք ունեմ քեզնից։ Խնդրում եմ, որ դու {advice}։ Լա՞վ։ Ես գիտեմ, որ դու կկարողանաս։',
      'Իսկ հիմա մի գաղտնի խնդրանք՝ միայն մեր միջև։ [whispers] Ուզում եմ, որ դու {advice}։ Պայմանավորվեցի՞նք։'
    ],
    family: [
      'Իմ ջերմ բարևները փոխանցիր {family}։',
      'Ու չմոռանաս իմ կողմից պինդ գրկել {family}։'
    ],
    closing: [
      'Շնորհավոր Նոր տարի և Սուրբ Ծնունդ, {name}։ Թող քո բոլոր երազանքներն իրականանան։ [laughs] Հո-հո-հո՜։',
      '[warmly] Սիրում եմ քեզ, {name}։ Շնորհավոր Նոր տարի։ Մինչև նոր հանդիպում։ Հո-հո-հո՜։',
      'Դե, ժամանակն է վերադառնալ իմ էլֆերի մոտ, նրանք ինձ սպասում են։ Շնորհավո՛ր Նոր տարի, {name}։ Հո-հո-հո՜։'
    ],
    // «Տե՛ս, ահա այն» բառերի պահին վիդեոյում հայտնվում է երեխայի նամակը/նկարը
    letter: [
      'Ես ստացել եմ քո նամակը։ [warmly] Տե՛ս, ահա այն։ Կարդացի այն մի քանի անգամ և շատ ուրախացա։',
      'Գիտե՞ս՝ ինչ բերեց ինձ իմ փոստատար եղջերուն։ Քո նամակը։ [warmly] Տե՛ս, ահա այն։ Այն պահում եմ իմ սեղանի վրա։'
    ],
    drawing: [
      'Ես ստացել եմ քո հրաշալի նկարը։ [warmly] Տե՛ս, ահա այն։ Կախել եմ այն իմ տնակի ամենապատվավոր տեղում։',
      'Իմ էլֆերը բերեցին քո նկարը։ [warmly] Տե՛ս, ահա այն։ Ինչքա՜ն գեղեցիկ է։ Բոլոր էլֆերը հիացած են։'
    ],
    // ծնողի ուղարկած լուսանկարը Ձմեռ Պապի ձեռքի ոսկե շրջանակում (առանձին տեսարան, Lip sync)
    photo: [
      '[warmly] Տե՛ս, ահա քո լուսանկարը։ [chuckles] Ինչքա՜ն սիրուն ես։',
      '[warmly] Տե՛ս, ահա քո լուսանկարը։ Ինչքա՜ն ես մեծացել այս տարի։'
    ],
    // ասվում է ամենավերջում, որից հետո վիդեոյում բացվում է «Բարի երեխաների ցուցակը»
    niceList: [
      '[whispers] Իսկ հիմա նայի՛ր, թե ում անունն է գրված իմ բարի երեխաների ցուցակում։',
      '[whispers] Եվ վերջում մի գաղտնիք։ Նայի՛ր իմ բարի երեխաների ցուցակին։'
    ]
  };
  var LETTER_MARK = 'Տե՛ս, ահա այն';

  function clean(s) {
    return String(s == null ? '' : s).replace(/\s+/g, ' ').trim().replace(/[։.,!]+$/, '');
  }

  function pick(arr, rnd) {
    return arr[Math.floor(rnd() * arr.length) % arr.length];
  }

  // պարզ «սերմով» պատահական թիվ՝ նույն սերմը → նույն տեքստը
  function rng(seed) {
    if (seed == null) return Math.random;
    var x = (Number(seed) || 1) >>> 0;
    return function () {
      x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
      return (x % 100000) / 100000;
    };
  }

  function ageWord(age) {
    var n = parseInt(age, 10);
    return AGE_WORDS[n] || (n ? String(n) : '');
  }

  /**
   * order = { name, age, interests, achievement, gift, giftPromise (true/false),
   *           advice, family, letter ('letter' | 'drawing' | ''), niceList (true/false) }
   * opts  = { tags: true/false, seed: թիվ }
   */
  function generate(order, opts) {
    opts = opts || {};
    var rnd = rng(opts.seed);
    var o = {
      name: clean(order.name),
      age: ageWord(order.age),
      interests: clean(order.interests),
      achievement: clean(order.achievement),
      gift: clean(order.gift),
      advice: clean(order.advice),
      family: clean(order.family)
    };
    var promise = order.giftPromise === true || order.giftPromise === 'true' ||
      order.giftPromise === 'Այո' || order.giftPromise === 'yes';

    var parts = [pick(T.intro, rnd)];
    if (o.age) parts.push(pick(T.age, rnd));
    if (o.interests) parts.push(pick(T.interests, rnd));
    if (o.achievement) parts.push(pick(T.achievement, rnd));
    else parts.push(pick(T.kind, rnd));
    if (order.letter === 'letter') parts.push(pick(T.letter, rnd));
    if (order.letter === 'drawing') parts.push(pick(T.drawing, rnd));
    if (o.gift) parts.push(pick(promise ? T.giftPromise : T.giftMaybe, rnd));
    if (o.advice) parts.push(pick(T.advice, rnd));
    if (o.family) parts.push(pick(T.family, rnd));
    parts.push(pick(T.closing, rnd));
    if (order.niceList) parts.push(pick(T.niceList, rnd));

    var text = parts.join('\n\n').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || ''; });
    if (opts.tags === false) text = stripTags(text);
    return text;
  }

  function stripTags(text) {
    return String(text).replace(/\[[a-z ]+\]\s*/gi, '');
  }

  // մոտավոր տևողություն վայրկյաններով (դանդաղ, ջերմ խոսք ≈ 2.2 բառ/վրկ)
  function estimateSeconds(text) {
    var words = stripTags(text).split(/\s+/).filter(Boolean).length;
    return Math.round(words / 2.2);
  }

  // մոտավորապես որ վայրկյանին է Ձմեռ Պապն ասում «Տե՛ս, ահա այն» (նամակը ցույց տալու պահը)
  function letterSeconds(text) {
    var i = String(text).indexOf(LETTER_MARK);
    return i < 0 ? null : estimateSeconds(String(text).slice(0, i));
  }

  // լուսանկարի տեսարանի առանձին կարճ նախադասությունը (առանձին mp3 է դառնում)
  function photoLine(seed) { return pick(T.photo, rng(seed)); }

  return { generate: generate, stripTags: stripTags, estimateSeconds: estimateSeconds,
    ageWord: ageWord, letterSeconds: letterSeconds, photoLine: photoLine };
})();
/**
 * ՁՄԵՌ ՊԱՊԻ ՍՏՈՒԴԻԱ — Google Sheets + Apps Script
 *
 * Ինչ է անում.
 *  1) Ընդունում է պատվերները կայքից (doPost) → նոր տող «Պատվերներ» թերթում
 *     + ինքնաշխատ գրում է Ձմեռ Պապի տեքստը (SantaText.gs ֆայլից)։
 *  2) «🎅 Ձմեռ Պապ» մենյուից. ElevenLabs-ով ստեղծում է ձայնը (mp3 → Google Drive),
 *     HeyGen-ով ստեղծում է վիդեոն, 5 րոպեն մեկ ստուգում է՝ պատրաստ է թե ոչ,
 *     և պատրաստ mp4-ը պահում է Drive-ում՝ հղումով, որը կարող եք ուղարկել ծնողին։
 *  3) Ցանկության դեպքում ծանուցում է ուղարկում Telegram-ով։
 *
 * Բանալիները (API key) պահվում են միայն ձեր Google հաշվում (Script Properties),
 * ոչ թե կոդում։ Դրանք մուտքագրում եք մենյուից՝ «⚙️ Կարգավորումներ»։
 */

var SHEET = 'Պատվերներ';
var HEADERS = ['Ամսաթիվ', 'Կարգավիճակ', 'Երեխա', 'Տարիք', 'Սիրում է', 'Այս տարի',
  'Նվեր', 'Խոստանալ', 'Խնդրանք', 'Բարևներ', 'Այլ ցանկություններ', 'Ծնող', 'Հեռախոս',
  'Ուղարկել', 'ՏԵՔՍՏ (ստուգեք / ուղղեք)', 'Ձայն (mp3)', 'HeyGen ID', 'ՎԻԴԵՈ', 'Սխալ',
  'Նամակ/նկար', 'Նամակի տեսակ'];
var COL = {
  date: 1, status: 2, name: 3, age: 4, interests: 5, achievement: 6, gift: 7, promise: 8,
  advice: 9, family: 10, notes: 11, parent: 12, phone: 13, channel: 14, text: 15,
  audio: 16, heygenId: 17, video: 18, error: 19, letterImg: 20, letterType: 21
};
var ST = {
  NEW: '1. Ստուգել տեքստը',
  VOICE: '2. Ձայնը պատրաստ է',
  RENDER: '3. Վիդեոն պատրաստվում է…',
  DONE: '4. ✅ Պատրաստ է',
  SENT: '5. Ուղարկված է',
  ERR: '⚠️ Սխալ'
};

/* ---------------- մենյու ---------------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('🎅 Ձմեռ Պապ')
    .addItem('🎲 Նոր տեքստ (ընտրված տողի համար)', 'menuNewText')
    .addItem('🎙 Ստեղծել ձայնը', 'menuVoice')
    .addItem('🎬 Ստեղծել վիդեոն', 'menuVideo')
    .addItem('⚡ Ձայն + վիդեո միանգամից', 'menuVoiceAndVideo')
    .addItem('🔄 Ստուգել պատրաստ վիդեոները', 'checkVideos')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('⚙️ Կարգավորումներ')
      .addItem('1. Ստեղծել աղյուսակը', 'setupSheet')
      .addItem('2. ElevenLabs բանալի և ձայն', 'setupEleven')
      .addItem('3. HeyGen բանալի և ավատար', 'setupHeygen')
      .addItem('4. Telegram ծանուցումներ (ըստ ցանկության)', 'setupTelegram')
      .addItem('Ցույց տալ իմ ElevenLabs ձայները', 'listVoices')
      .addItem('Ցույց տալ իմ HeyGen ավատարները', 'listAvatars')
      .addItem('Միացնել ավտոմատ ստուգումը (5 րոպեն մեկ)', 'installTrigger'))
    .addToUi();
}

/* ---------------- պատվեր կայքից ---------------- */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    var sh = sheet_();
    // երեխայի նամակը/նկարը (base64 JPEG) → Google Drive
    var letterUrl = '', letterType = '';
    if (d.letterImage && /^data:image\//.test(d.letterImage)) {
      var m = d.letterImage.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
      if (m) {
        var blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1],
          (d.name || 'child') + '_namak_' + Date.now() + '.jpg');
        letterUrl = folder_().createFile(blob).getUrl();
        // 'photo' — լուսանկարը Ձմեռ Պապի շրջանակում (առանձին տեսարան), հիմնական տեքստում նախադասություն չի ավելանում
        letterType = d.letterType === 'letter' ? 'letter' : d.letterType === 'drawing' ? 'drawing' : 'photo';
      }
    }
    var order = {
      name: d.name, age: d.age, interests: d.interests, achievement: d.achievement,
      gift: d.gift, giftPromise: d.giftPromise === 'Այո', advice: d.advice, family: d.family,
      letter: letterType, niceList: false
    };
    var text = SantaText.generate(order, { tags: true });
    sh.appendRow([new Date(), ST.NEW, d.name, d.age, d.interests, d.achievement, d.gift,
      d.giftPromise, d.advice, d.family, d.notes, d.parent, d.phone ? "'" + d.phone : '', d.channel, text,
      '', '', '', '', letterUrl, letterType]);
    sh.getRange(sh.getLastRow(), COL.text).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    telegram_('🎅 Նոր պատվեր\n' + d.name + ', ' + d.age + ' տարեկան' +
      (letterUrl ? '\n✉ Կա նամակ/նկար՝ ' + letterUrl : '') + '\n' +
      'Ծնող՝ ' + d.parent + ' ' + d.phone + ' (' + d.channel + ')' +
      (d.notes ? '\nՑանկություն՝ ' + d.notes : ''));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'santa-orders' });
}

/* ---------------- մենյուի գործողություններ ---------------- */

function menuNewText() {
  eachSelectedRow_(function (sh, r) {
    var v = sh.getRange(r, 1, 1, HEADERS.length).getValues()[0];
    var order = {
      name: v[COL.name - 1], age: v[COL.age - 1], interests: v[COL.interests - 1],
      achievement: v[COL.achievement - 1], gift: v[COL.gift - 1],
      giftPromise: v[COL.promise - 1] === 'Այո', advice: v[COL.advice - 1], family: v[COL.family - 1],
      letter: v[COL.letterImg - 1] ? (v[COL.letterType - 1] || 'drawing') : '', niceList: true
    };
    sh.getRange(r, COL.text).setValue(SantaText.generate(order, { tags: true }));
    sh.getRange(r, COL.status).setValue(ST.NEW);
  });
}

function menuVoice() { eachSelectedRow_(makeVoice_); }
function menuVideo() { eachSelectedRow_(makeVideo_); }
function menuVoiceAndVideo() {
  eachSelectedRow_(function (sh, r) {
    if (makeVoice_(sh, r)) makeVideo_(sh, r);
  });
}

/* ---------------- ElevenLabs ---------------- */

function makeVoice_(sh, r) {
  var p = props_();
  try {
    need_(p.ELEVEN_KEY, 'ElevenLabs բանալին մուտքագրված չէ (⚙️ Կարգավորումներ → 2)');
    need_(p.ELEVEN_VOICE, 'ElevenLabs ձայնի ID-ն մուտքագրված չէ (⚙️ Կարգավորումներ → 2)');
    var text = String(sh.getRange(r, COL.text).getValue()).trim();
    need_(text, 'Տեքստը դատարկ է');
    var name = String(sh.getRange(r, COL.name).getValue() || 'child');

    var res = UrlFetchApp.fetch('https://api.elevenlabs.io/v1/text-to-speech/' +
      encodeURIComponent(p.ELEVEN_VOICE) + '?output_format=mp3_44100_128', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'xi-api-key': p.ELEVEN_KEY, accept: 'audio/mpeg' },
      payload: JSON.stringify({
        text: text,
        model_id: p.ELEVEN_MODEL || 'eleven_v3',
        // v3-ում stability-ն միայն 0.0 (Creative), 0.5 (Natural) կամ 1.0 (Robust) է
        voice_settings: { stability: Number(p.ELEVEN_STABILITY || 0.5) }
      }),
      muteHttpExceptions: true
    });
    if (res.getResponseCode() !== 200) {
      throw new Error('ElevenLabs ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
    }
    var file = folder_().createFile(res.getBlob().setName(name + '_' + r + '.mp3'));
    sh.getRange(r, COL.audio).setValue(file.getUrl());
    sh.getRange(r, COL.status).setValue(ST.VOICE);
    sh.getRange(r, COL.error).setValue('');
    return true;
  } catch (err) {
    fail_(sh, r, err);
    return false;
  }
}

/* ---------------- HeyGen ---------------- */

function makeVideo_(sh, r) {
  var p = props_();
  try {
    need_(p.HEYGEN_KEY, 'HeyGen բանալին մուտքագրված չէ (⚙️ Կարգավորումներ → 3)');
    need_(p.HEYGEN_AVATAR, 'HeyGen ավատարի ID-ն մուտքագրված չէ (⚙️ Կարգավորումներ → 3)');
    var audioUrl = String(sh.getRange(r, COL.audio).getValue());
    need_(audioUrl, 'Նախ ստեղծեք ձայնը (🎙)');
    var audio = DriveApp.getFileById(fileIdFromUrl_(audioUrl)).getBlob();

    // 1) ձայնը վերբեռնում ենք HeyGen
    var up = UrlFetchApp.fetch('https://upload.heygen.com/v1/asset', {
      method: 'post',
      contentType: 'audio/mpeg',
      headers: { 'X-Api-Key': p.HEYGEN_KEY },
      payload: audio.getBytes(),
      muteHttpExceptions: true
    });
    var upJson = parse_(up, 'HeyGen upload');
    var assetId = upJson.data && (upJson.data.id || upJson.data.asset_id);
    need_(assetId, 'HeyGen-ը չվերադարձրեց ձայնի ID: ' + up.getContentText().slice(0, 200));

    // 2) ստեղծում ենք վիդեոն
    var character = p.HEYGEN_AVATAR_TYPE === 'talking_photo'
      ? { type: 'talking_photo', talking_photo_id: p.HEYGEN_AVATAR }
      : { type: 'avatar', avatar_id: p.HEYGEN_AVATAR, avatar_style: 'normal' };
    var size = String(p.HEYGEN_SIZE || '1280x720').split('x');
    var body = {
      title: 'Santa — ' + sh.getRange(r, COL.name).getValue(),
      video_inputs: [{ character: character, voice: { type: 'audio', audio_asset_id: assetId } }],
      dimension: { width: Number(size[0]), height: Number(size[1]) }
    };
    var gen = UrlFetchApp.fetch('https://api.heygen.com/v2/video/generate', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'X-Api-Key': p.HEYGEN_KEY },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });
    var genJson = parse_(gen, 'HeyGen generate');
    var videoId = genJson.data && genJson.data.video_id;
    need_(videoId, 'HeyGen-ը չվերադարձրեց video_id: ' + gen.getContentText().slice(0, 300));

    sh.getRange(r, COL.heygenId).setValue(videoId);
    sh.getRange(r, COL.status).setValue(ST.RENDER);
    sh.getRange(r, COL.error).setValue('');
    return true;
  } catch (err) {
    fail_(sh, r, err);
    return false;
  }
}

/** Ստուգում է «պատրաստվում է» տողերը. աշխատում է մենյուից և ժամանակաչափով */
function checkVideos() {
  var p = props_();
  if (!p.HEYGEN_KEY) return;
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return;
  var rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  rows.forEach(function (v, i) {
    var r = i + 2;
    if (v[COL.status - 1] !== ST.RENDER || !v[COL.heygenId - 1]) return;
    try {
      var res = UrlFetchApp.fetch('https://api.heygen.com/v1/video_status.get?video_id=' +
        encodeURIComponent(v[COL.heygenId - 1]), {
        headers: { 'X-Api-Key': p.HEYGEN_KEY }, muteHttpExceptions: true
      });
      var d = (parse_(res, 'HeyGen status').data) || {};
      if (d.status === 'completed' && d.video_url) {
        var blob = UrlFetchApp.fetch(d.video_url).getBlob()
          .setName(v[COL.name - 1] + '_' + r + '.mp4');
        var file = folder_().createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        sh.getRange(r, COL.video).setValue(file.getUrl());
        sh.getRange(r, COL.status).setValue(ST.DONE);
        telegram_('✅ Վիդեոն պատրաստ է՝ ' + v[COL.name - 1] + '\n' + file.getUrl() +
          '\nՈւղարկել՝ ' + v[COL.parent - 1] + ' ' + v[COL.phone - 1] + ' (' + v[COL.channel - 1] + ')');
      } else if (d.status === 'failed') {
        throw new Error('HeyGen-ը չկարողացավ ստեղծել վիդեոն: ' + JSON.stringify(d.error || d));
      }
    } catch (err) {
      fail_(sh, r, err);
    }
  });
}

/* ---------------- կարգավորումներ ---------------- */

function setupSheet() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET, 0);
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#c8323a').setFontColor('#ffffff');
  sh.setFrozenRows(1);
  sh.setColumnWidth(COL.text, 420);
  sh.getRange(2, COL.text, 999, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([ST.NEW, ST.VOICE, ST.RENDER, ST.DONE, ST.SENT, ST.ERR], true).build();
  sh.getRange(2, COL.status, 999, 1).setDataValidation(rule);
  folder_();
  try { SpreadsheetApp.getUi().alert('Աղյուսակը պատրաստ է ✅\nՎիդեոները կպահվեն Google Drive-ի «Ձմեռ Պապ — ֆայլեր» թղթապանակում։'); } catch (e) { /* web app-ից կանչելիս UI չկա */ }
}

function setupEleven() {
  ask_('ELEVEN_KEY', 'ElevenLabs API բանալի',
    'elevenlabs.io → ձախ ներքևում՝ ձեր անունը → API Keys → Create. Պատճենեք և տեղադրեք այստեղ։');
  ask_('ELEVEN_VOICE', 'ElevenLabs ձայնի ID',
    'Voices → ընտրված Ձմեռ Պապի ձայնը → «...» → Copy voice ID։\n' +
    '(Կամ օգտվեք «Ցույց տալ իմ ElevenLabs ձայները» կետից)');
}

function setupHeygen() {
  ask_('HEYGEN_KEY', 'HeyGen API բանալի',
    'app.heygen.com → Settings → API → պատճենեք API Token-ը։');
  ask_('HEYGEN_AVATAR', 'HeyGen ավատարի ID',
    'Գործարկեք «Ցույց տալ իմ HeyGen ավատարները» կետը, պատճենեք ID-ն այնտեղից։');
  var p = props_();
  if (p.HEYGEN_KEY && p.HEYGEN_AVATAR) detectAvatarType_();
}

function setupTelegram() {
  ask_('TG_TOKEN', 'Telegram բոտի token',
    '@BotFather → /newbot → պատճենեք token-ը։ (Դատարկ թողեք՝ անջատելու համար)');
  ask_('TG_CHAT', 'Telegram chat ID',
    'Գրեք ձեր բոտին ցանկացած բան, ապա բացեք @userinfobot և պատճենեք ձեր ID-ն։');
  telegram_('🎅 Ծանուցումները միացված են');
}

function installTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'checkVideos') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('checkVideos').timeBased().everyMinutes(5).create();
  SpreadsheetApp.getUi().alert('Միացված է ✅ Պատրաստ վիդեոները ինքնաշխատ կհայտնվեն աղյուսակում։');
}

function listVoices() {
  var p = props_();
  need_(p.ELEVEN_KEY, 'Նախ մուտքագրեք ElevenLabs բանալին');
  var res = UrlFetchApp.fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': p.ELEVEN_KEY }, muteHttpExceptions: true
  });
  var voices = (parse_(res, 'ElevenLabs voices').voices) || [];
  var rows = voices.map(function (v) { return [v.name, v.voice_id, v.category || '']; });
  writeList_('ElevenLabs ձայներ', ['Անուն', 'Voice ID (պատճենեք)', 'Տեսակ'], rows);
}

function listAvatars() {
  var p = props_();
  need_(p.HEYGEN_KEY, 'Նախ մուտքագրեք HeyGen բանալին');
  var res = UrlFetchApp.fetch('https://api.heygen.com/v2/avatars', {
    headers: { 'X-Api-Key': p.HEYGEN_KEY }, muteHttpExceptions: true
  });
  var d = parse_(res, 'HeyGen avatars').data || {};
  var rows = [];
  (d.talking_photos || []).forEach(function (a) {
    rows.push([a.talking_photo_name || '', a.talking_photo_id, 'talking_photo (ձեր նկարից)']);
  });
  (d.avatars || []).forEach(function (a) {
    rows.push([a.avatar_name || '', a.avatar_id, 'avatar']);
  });
  writeList_('HeyGen ավատարներ', ['Անուն', 'Avatar ID (պատճենեք)', 'Տեսակ'], rows);
}

/* ---------------- օգնական ֆունկցիաներ ---------------- */

function detectAvatarType_() {
  var p = props_();
  var res = UrlFetchApp.fetch('https://api.heygen.com/v2/avatars', {
    headers: { 'X-Api-Key': p.HEYGEN_KEY }, muteHttpExceptions: true
  });
  var d = (parse_(res, 'HeyGen avatars').data) || {};
  var isPhoto = (d.talking_photos || []).some(function (a) { return a.talking_photo_id === p.HEYGEN_AVATAR; });
  PropertiesService.getScriptProperties().setProperty('HEYGEN_AVATAR_TYPE', isPhoto ? 'talking_photo' : 'avatar');
}

function sheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) { setupSheet(); sh = ss.getSheetByName(SHEET); }
  return sh;
}

function folder_() {
  var sp = PropertiesService.getScriptProperties();
  var id = sp.getProperty('FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { /* ջնջված է */ } }
  var f = DriveApp.createFolder('Ձմեռ Պապ — ֆայլեր');
  sp.setProperty('FOLDER_ID', f.getId());
  return f;
}

function props_() { return PropertiesService.getScriptProperties().getProperties(); }

function ask_(key, title, help) {
  var ui = SpreadsheetApp.getUi();
  var cur = PropertiesService.getScriptProperties().getProperty(key);
  var r = ui.prompt(title, help + (cur ? '\n\n(Արդեն մուտքագրված է։ Թողեք դատարկ՝ չփոխելու համար)' : ''),
    ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var val = r.getResponseText().trim();
  if (val) PropertiesService.getScriptProperties().setProperty(key, val);
}

function eachSelectedRow_(fn) {
  var sh = sheet_();
  var range = sh.getActiveRange();
  if (!range || sh.getName() !== SHEET) {
    SpreadsheetApp.getUi().alert('Նախ «Պատվերներ» թերթում սեղմեք պատվերի տողի վրա։');
    return;
  }
  for (var r = range.getRow(); r < range.getRow() + range.getNumRows(); r++) {
    if (r < 2) continue;
    fn(sh, r);
  }
}

function fail_(sh, r, err) {
  sh.getRange(r, COL.status).setValue(ST.ERR);
  sh.getRange(r, COL.error).setValue(String(err && err.message || err));
}

function need_(v, msg) { if (!v) throw new Error(msg); }

function parse_(res, label) {
  var code = res.getResponseCode();
  var txt = res.getContentText();
  if (code >= 300) throw new Error(label + ' ' + code + ': ' + txt.slice(0, 300));
  return JSON.parse(txt);
}

function fileIdFromUrl_(url) {
  var m = String(url).match(/[-\w]{25,}/);
  if (!m) throw new Error('Ձայնի ֆայլի հղումը սխալ է');
  return m[0];
}

function writeList_(name, head, rows) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clear();
  sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
  if (rows.length) sh.getRange(2, 1, rows.length, head.length).setValues(rows);
  sh.autoResizeColumns(1, head.length);
  ss.setActiveSheet(sh);
}

function telegram_(text) {
  var p = props_();
  if (!p.TG_TOKEN || !p.TG_CHAT) return;
  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + p.TG_TOKEN + '/sendMessage', {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      payload: JSON.stringify({ chat_id: p.TG_CHAT, text: text, disable_web_page_preview: true })
    });
  } catch (e) { /* ծանուցումը կարևոր չէ */ }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
