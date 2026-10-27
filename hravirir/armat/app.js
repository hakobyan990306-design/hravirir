/* Armat Baby Book — կազմի կոնստրուկտոր
   Նախադիտումը SVG է (կազմի ֆոն + տեքստ), տպագրական PDF-ը ստեղծվում է բրաուզերում՝
   բնօրինակ CMYK ձևանմուշի վրա (assets/*-template.pdf) ավելացնում ենք անունը վեկտորային տառատեսակով։ */

var FONTS = [
  { id: "ArmmaturaU", file: "ArmmaturaU.ttf", label: "Բնօրինակ", track: 0.047 },   // track՝ տառամիջյան տարածություն (em), ինչպես բնօրինակում
  { id: "ArmAllegroU", file: "ArmAllegroU.ttf", label: "Գեղագիր" },
  { id: "Vrdznagir", file: "Vrdznagir.otf", label: "Վրձին" },
  { id: "PoqrikDzeragir", file: "PoqrikDzeragir.ttf", label: "Ձեռագիր" },
  { id: "ArmCoronetU", file: "ArmCoronetU.ttf", label: "Նուրբ" },
  { id: "DzeragirHand", file: "Dzeragir-Handdrawn.otf", label: "Մանկական" },
  { id: "Noyemi", file: "Noyemi.otf", label: "Նոյեմի" },
  { id: "Adamathuz", file: "Adamathuz-Bold.ttf", label: "Հաստ" },
  { id: "TarumianBarak", file: "ArTarumianBarakU-Bold.ttf", label: "Ժամանակակից" },
  { id: "GHEAMariam", file: "GHEAMariamReg.otf", label: "Դասական" },
  { id: "ArmHmkLight", file: "ArmHmkLight.ttf", label: "Բարակ" }
];
var SUB_FONT = "ArmAllegroU";
var DEFAULT_SUB = "մի փոքրիկ պատմություն";

// Կազմի երկրաչափությունը (pt, A4 595.28×841.89, հաշվարկը վերևից)
var PAGE_W = 595.28, PAGE_H = 841.89, CX = PAGE_W / 2;
var NAME = { maxSize: 88, maxW: 330, centerY: 263.8 };   // ժապավենը՝ y 176.6–346.7, բնօրինակի բազային գիծը՝ 282.3
var SUB = { size: 33.47, maxW: 420, baseline: 380.8, cx: 301.9 };   // բնօրինակում տողը մի փոքր աջ է
// CMYK գույները նույնն են, ինչ բնօրինակ ֆայլում
var NAME_CMYK = [0, 0.023, 0.055, 0], SUB_CMYK = [0.424, 0.681, 1, 0.485];

// Կենդանու տեղը կազմի վրա (ներքևը՝ բնօրինակ արջուկի ոտքերի մակարդակին)
var ART = { x: CX - 160, y: 396, w: 320, h: 384 };
// Կենդանիներ (ChicClipDesigns «Plush Animal» հավաքածու, բնօրինակ գույներով, նույնը տղայի և աղջկա կազմի համար).
// տպագրության համար assets/animals/<id>.png (1600px), նախադիտման համար web/<id>.webp, ընտրացանկի համար thumb/<id>.webp
var ANIMALS = [
  ["teddy", "Արջուկ"], ["bunny", "Նապաստակ"], ["elephant", "Փղիկ"], ["giraffe", "Ընձուղտ"], ["lion", "Առյուծ"],
  ["fox", "Աղվես"], ["panda", "Պանդա"], ["puppy", "Շնիկ"], ["kitten", "Կատվիկ"], ["lamb", "Գառնուկ"],
  ["deer", "Եղնիկ"], ["zebra", "Զեբր"], ["monkey", "Կապիկ"], ["raccoon", "Ջրարջ"], ["hedgehog", "Ոզնի"],
  ["squirrel", "Սկյուռ"], ["mouse", "Մկնիկ"], ["hippo", "Գետաձի"], ["rhino", "Ռնգեղջյուր"], ["leopard", "Ընձառյուծ"],
  ["gazelle", "Այծյամ"], ["pony", "Ձիուկ"], ["cow", "Կովիկ"], ["highland", "Լեռնային կով"], ["llama", "Լամա"],
  ["piglet", "Խոզուկ"], ["duckling", "Բադիկ"], ["chick", "Ճուտիկ"], ["dino", "Դինոզավր"]
].map(function (a) { return { id: a[0], label: a[1] }; });
// Լուսանկարի շրջանակները
var FRAMES = {
  circle: { box: [CX - 150, 450, 300, 300], d: "M" + (CX - 150) + ",600 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0 Z" },
  arch: { box: [CX - 130, 440, 260, 330], d: "M" + (CX - 130) + ",770 V570 A130,130 0 0 1 " + (CX + 130) + ",570 V770 Z" }
};
var RING = 7;   // սպիտակ եզրագծի հաստությունը (pt)

// art՝ կենդանու id, "photo" կամ բնօրինակ արջուկները՝ "bear-boy" / "bear-girl"
var state = { art: ANIMALS[0].id, name: "", noName: false, font: FONTS[0].id, scale: 100, sub: DEFAULT_SUB,
  photo: null, frame: "cut", zoom: 1, dx: 0, dy: 0 };
var $ = function (id) { return document.getElementById(id); };
var measureCtx = document.createElement("canvas").getContext("2d");

function fontById(id) { return FONTS.filter(function (f) { return f.id === id; })[0]; }

// Տառատեսակների բեռնում (նույն ֆայլերը օգտագործվում են նաև PDF-ում)
var fontsReady = Promise.all(FONTS.map(function (f) {
  var ff = new FontFace(f.id, "url(fonts/" + f.file + ")");
  document.fonts.add(ff);
  return ff.load().catch(function () {});
}));

// Չափում ենք տեքստը 100pt-ով, հետո համեմատականորեն փոքրացնում, որ տեղավորվի
function fit(text, font, maxSize, maxW) {
  measureCtx.font = "100px '" + font + "'";
  var m = measureCtx.measureText(text), track = fontById(font).track || 0;
  var w100 = m.width + track * 100 * (Array.from(text).length - 1);
  var size = Math.min(maxSize, maxW * 100 / Math.max(w100, 1));
  var k = size / 100;
  return { size: size, ascent: (m.actualBoundingBoxAscent || 70) * k, descent: (m.actualBoundingBoxDescent || 0) * k };
}

function layout() {
  var shown = state.name.trim() || "Անուն";
  var n = fit(shown, state.font, NAME.maxSize * state.scale / 100, NAME.maxW);
  // ուղղահայաց կենտրոնացում՝ ըստ տառերի իրական եզրերի
  var nameBase = NAME.centerY + (n.ascent - n.descent) / 2;
  var sub = state.sub.trim();
  var s = sub ? fit(sub, SUB_FONT, SUB.size, SUB.maxW) : null;
  return { name: shown, nameSize: n.size, nameBase: nameBase, sub: sub, subSize: s ? s.size : 0 };
}

/* ---------- Նկարը կազմի վրա ---------- */
function animalUrl(id, kind) {   // kind՝ "print" | "thumb" | չնշված (նախադիտում)
  return "assets/animals/" + (kind === "print" ? id + ".png" : (kind || "web") + "/" + id + ".webp");
}
function isBear(id) { return /^bear-/.test(id); }
// բնօրինակ արջուկների համար՝ boy/girl ձևանմուշը, մնացածի համար՝ առանց արջուկի ձևանմուշ
function baseName() { return isBear(state.art) ? state.art.slice(5) : "blank"; }

// Լուսանկարի դիրքը շրջանակում. ծածկում է ամբողջ շրջանակը, zoom-ով մեծանում, dx/dy-ով տեղաշարժվում
function photoGeom() {
  var b = FRAMES[state.frame].box, p = state.photo;
  var s = Math.max(b[2] / p.w, b[3] / p.h) * state.zoom, w = p.w * s, h = p.h * s;
  var mx = (w - b[2]) / 2, my = (h - b[3]) / 2;
  state.dx = Math.max(-mx, Math.min(mx, state.dx));
  state.dy = Math.max(-my, Math.min(my, state.dy));
  return { x: b[0] + b[2] / 2 - w / 2 + state.dx, y: b[1] + b[3] / 2 - h / 2 + state.dy, w: w, h: h };
}

/* ---------- Ֆոնի հեռացում (MODNet, Apache-2.0) ---------- */
// Մոդելը (~25ՄԲ) բեռնվում է միայն առաջին անգամ, նկարը մշակվում է բրաուզերում և ոչ մի տեղ չի ուղարկվում
var TRANSFORMERS = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1";
var bgModel = null;
function loadBgModel() {
  if (!bgModel) bgModel = import(TRANSFORMERS).then(function (T) {
    T.env.allowLocalModels = false;
    return Promise.all([T.AutoModel.from_pretrained("Xenova/modnet", { dtype: "fp32" }), T.AutoProcessor.from_pretrained("Xenova/modnet"), T]);
  });
  bgModel.catch(function () { bgModel = null; });
  return bgModel;
}

// Վերադարձնում է թափանցիկ ֆոնով, եզրերից կտրված PNG
async function cutOut(photo) {
  var M = await loadBgModel(), model = M[0], processor = M[1], T = M[2];
  var image = await T.RawImage.fromURL(photo.url);
  var out = await model({ input: (await processor(image)).pixel_values });
  var mask = await T.RawImage.fromTensor(out.output[0].mul(255).to("uint8")).resize(photo.w, photo.h);
  var c = document.createElement("canvas"); c.width = photo.w; c.height = photo.h;
  var x = c.getContext("2d"); x.drawImage(photo.img, 0, 0);
  var d = x.getImageData(0, 0, c.width, c.height), px = d.data, m = mask.data, ch = mask.channels || 1;
  var x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
  for (var i = 0, n = c.width * c.height; i < n; i++) {
    // մի փոքր «սեղմում» ենք դիմակը, որ ֆոնի մնացորդները չերևան
    var a = Math.max(0, Math.min(255, (m[i * ch] - 25) * 1.25));
    px[i * 4 + 3] = a;
    if (a > 20) { var X = i % c.width, Y = (i / c.width) | 0; if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; }
  }
  if (x1 <= x0) throw new Error("empty mask");
  x.putImageData(d, 0, 0);
  var t = document.createElement("canvas"); t.width = x1 - x0 + 1; t.height = y1 - y0 + 1;
  t.getContext("2d").drawImage(c, x0, y0, t.width, t.height, 0, 0, t.width, t.height);
  var blob = await new Promise(function (r) { t.toBlob(r, "image/png"); });
  var url = URL.createObjectURL(blob), el = new Image(); el.src = url; await el.decode();
  return { url: url, w: t.width, h: t.height, img: el, blob: blob };
}

function startCut() {
  var p = state.photo, st = $("cutStatus");
  if (!p || p.cut || p.cutting) return;
  p.cutting = true; st.hidden = false; st.classList.remove("err");
  st.textContent = bgModel ? "Ֆոնը հեռացվում է…" : "Ֆոնը հեռացվում է… առաջին անգամ կարող է տևել մինչև րոպե";
  cutOut(p).then(function (cut) {
    p.cut = cut; st.hidden = true;
  }).catch(function (e) {
    console.error(e); st.textContent = "Չստացվեց հեռացնել ֆոնը. փորձեք այլ նկար կամ ընտրեք շրջանակ"; st.classList.add("err");
  }).finally(function () { p.cutting = false; if (state.photo === p) renderArt(); });
}

// Առանց ֆոնի նկարը տեղավորվում է կենդանու տեղում (ներքևից հավասարեցված), zoom-ով և տեղաշարժով.
// վերևի եզրը երբեք չի բարձրանում ART_TOP-ից, որ անունն ու տակի տողը չծածկվեն
// (մեծացնելիս նկարը աճում է դեպի ներքև և կտրվում էջի եզրով)
var ART_TOP = 392;
function cutGeom() {
  var c = state.photo.cut, s = Math.min(ART.w / c.w, ART.h / c.h) * state.zoom, w = c.w * s, h = c.h * s;
  var x0 = CX - w / 2, y0 = Math.max(ART_TOP, ART.y + ART.h - h);
  state.dx = Math.max(-x0 - w / 2, Math.min(PAGE_W - x0 - w / 2, state.dx));
  state.dy = Math.max(ART_TOP - y0, Math.min(PAGE_H - h * 0.4 - y0, state.dy));
  return { x: x0 + state.dx, y: y0 + state.dy, w: w, h: h };
}

function renderArt() {
  var a = $("aImg"), g = $("photoG"), isPhoto = state.art === "photo";
  a.style.display = !isBear(state.art) && !isPhoto ? "" : "none";
  $("photoPick").setAttribute("aria-pressed", isPhoto);
  if (a.style.display === "") {
    a.setAttribute("href", animalUrl(state.art));
    ["x", "y", "width", "height"].forEach(function (k, i) { a.setAttribute(k, [ART.x, ART.y, ART.w, ART.h][i]); });
  }
  g.style.display = isPhoto ? "" : "none";
  $("photoCtl").hidden = !isPhoto;
  if (!isPhoto) return;
  var cut = state.frame === "cut", has = !!state.photo, ready = has && (!cut || !!state.photo.cut);
  // «առանց ֆոնի» ռեժիմում, մինչ ֆոնը հեռացվում է, ցույց ենք տալիս կլոր շրջանակը տեքստով
  var f = FRAMES[cut ? "circle" : state.frame], b = f.box;
  ["pclipPath", "pRing", "pEmpty"].forEach(function (id) { $(id).setAttribute("d", f.d); });
  $("pRing").setAttribute("stroke-width", RING);
  $("pEmptyT").setAttribute("x", CX);
  $("pEmptyT").setAttribute("y", b[1] + b[3] / 2 + 8);
  $("pEmptyT").textContent = has ? "Ֆոնը հեռացվում է…" : "+ Ավելացրեք լուսանկար";
  $("pEmpty").style.display = $("pEmptyT").style.display = ready ? "none" : "";
  $("pImg").style.display = $("pRing").style.display = ready && !cut ? "" : "none";
  $("pCut").style.display = ready && cut ? "" : "none";
  if (ready) {
    var r = cut ? cutGeom() : photoGeom(), im = $(cut ? "pCut" : "pImg");
    im.setAttribute("href", cut ? state.photo.cut.url : state.photo.url);
    im.setAttribute("x", r.x); im.setAttribute("y", r.y); im.setAttribute("width", r.w); im.setAttribute("height", r.h);
  }
  if (cut && has && !state.photo.cut) startCut();
  $("zoom").min = cut ? 50 : 100; $("zoom").max = cut ? 150 : 300;
  document.querySelectorAll(".frame-opt").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.frame === state.frame); });
  $("zoomOut").textContent = Math.round(state.zoom * 100) + "%";
  $("photoPickT").textContent = has ? "Ձեր նկարը կազմի վրա է" : "Վերբեռնել նկարը";
  $("photoChange").hidden = !has;
}

function buildArtPicker() {
  var box = $("arts");
  var opts = ANIMALS.concat([{ id: "bear-boy", label: "Արջուկ տղա" }, { id: "bear-girl", label: "Արջուկ աղջիկ" }]);
  opts.forEach(function (o) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "art-opt"; b.dataset.art = o.id; b.setAttribute("role", "radio");
    b.innerHTML = '<img alt="" loading="lazy" src="' + (isBear(o.id) ? "assets/" + o.id.slice(5) + "-bear.jpg" : animalUrl(o.id, "thumb")) +
      '"><span>' + o.label + "</span>";
    b.addEventListener("click", function () { state.art = o.id; render(); });
    box.appendChild(b);
  });
}

// Մեծ նկարները փոքրացնում ենք մինչև 2400px (A4-ի վրա ~300 dpi-ի համար բավական է)
function loadPhoto(file) {
  if (!file || !/^image\//.test(file.type)) return;
  var img = new Image();
  img.onload = function () {
    var k = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight));
    var c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(img.src);
    c.toBlob(function (blob) {
      if (state.photo) { URL.revokeObjectURL(state.photo.url); if (state.photo.cut) URL.revokeObjectURL(state.photo.cut.url); }
      $("cutStatus").hidden = true;
      var url = URL.createObjectURL(blob), el = new Image();
      el.onload = function () {
        state.photo = { url: url, w: c.width, h: c.height, img: el };
        state.art = "photo"; state.zoom = 1; state.dx = state.dy = 0; $("zoom").value = 100;
        render();
      };
      el.src = url;
    }, "image/jpeg", 0.92);
  };
  img.src = URL.createObjectURL(file);
}

function enableDrag() {
  var svg = $("cover"), last = null;
  $("photoG").addEventListener("pointerdown", function (e) {
    if (!state.photo) { $("photoFile").click(); return; }
    last = [e.clientX, e.clientY]; svg.classList.add("dragging");
    svg.setPointerCapture(e.pointerId); e.preventDefault();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!last) return;
    var k = PAGE_W / svg.getBoundingClientRect().width;
    state.dx += (e.clientX - last[0]) * k; state.dy += (e.clientY - last[1]) * k;
    last = [e.clientX, e.clientY]; renderArt();
  });
  ["pointerup", "pointercancel"].forEach(function (t) {
    svg.addEventListener(t, function () { last = null; svg.classList.remove("dragging"); });
  });
}

// Լուսանկարը շրջանակով՝ PNG 300 dpi, տպագրական PDF-ի համար
function photoPng() {
  var f = FRAMES[state.frame], b = f.box, k = 300 / 72, r = photoGeom();
  var ox = b[0] - RING, oy = b[1] - RING, w = b[2] + RING * 2, h = b[3] + RING * 2;
  var c = document.createElement("canvas");
  c.width = Math.round(w * k); c.height = Math.round(h * k);
  var ctx = c.getContext("2d"), path = new Path2D(f.d);
  ctx.scale(k, k); ctx.translate(-ox, -oy);
  ctx.save(); ctx.clip(path);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(state.photo.img, r.x, r.y, r.w, r.h);
  ctx.restore();
  ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = RING; ctx.stroke(path);
  return { box: [ox, oy, w, h], blob: new Promise(function (res) { c.toBlob(res, "image/png"); }) };
}

function render() {
  var L = layout(), tn = $("tName"), ts = $("tSub");
  $("bg").setAttribute("href", "assets/" + baseName() + "-front.jpg");
  renderArt();
  document.querySelectorAll(".art-opt").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.art === state.art); });
  tn.textContent = L.name;
  tn.setAttribute("font-family", state.font);
  tn.setAttribute("font-size", L.nameSize.toFixed(2));
  tn.setAttribute("y", L.nameBase.toFixed(2));
  // letter-spacing-ը ավելանում է նաև վերջին տառից հետո, ուստի կենտրոնը շեղում ենք կես քայլով
  var sp = (fontById(state.font).track || 0) * L.nameSize;
  tn.setAttribute("letter-spacing", sp.toFixed(2));
  tn.setAttribute("x", (CX + sp / 2).toFixed(2));
  tn.classList.toggle("empty", !state.name.trim());
  tn.style.display = state.noName ? "none" : "";
  // առանց անվան՝ անվան կարգավորումները անջատվում են
  $("nameFields").classList.toggle("off", state.noName);
  $("name").disabled = state.noName;
  ts.textContent = L.sub;
  ts.setAttribute("x", SUB.cx);
  ts.setAttribute("font-family", SUB_FONT);
  ts.setAttribute("font-size", L.subSize.toFixed(2));
  document.querySelectorAll(".font-opt").forEach(function (b) {
    b.setAttribute("aria-checked", b.dataset.font === state.font);
    b.querySelector("b").textContent = state.name.trim() || "Անուն";
  });
  $("sizeOut").textContent = state.scale + "%";
}

function buildFontPicker() {
  var box = $("fonts");
  FONTS.forEach(function (f) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "font-opt"; b.dataset.font = f.id; b.setAttribute("role", "radio");
    b.innerHTML = '<b style="font-family:\'' + f.id + '\'"></b><small>' + f.label + "</small>";
    b.addEventListener("click", function () { state.font = f.id; render(); });
    box.appendChild(b);
  });
}

/* ---------- Տպագրական PDF ---------- */
var cache = {};
function bytes(url) {
  if (!cache[url]) cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(url); return r.arrayBuffer(); });
  return cache[url];
}

async function makePrintPdf() {
  var L = layout(), P = PDFLib;
  var doc = await P.PDFDocument.load(await bytes("assets/" + baseName() + "-template.pdf"));
  doc.registerFontkit(fontkit);
  var page = doc.getPage(0);
  if (state.art === "photo" && state.frame === "cut") {
    var cg = cutGeom(), cp = await doc.embedPng(await state.photo.cut.blob.arrayBuffer());
    page.drawImage(cp, { x: cg.x, y: PAGE_H - cg.y - cg.h, width: cg.w, height: cg.h });
  } else if (state.art === "photo") {
    var ph = photoPng(), pb = ph.box;
    var png = await doc.embedPng(await (await ph.blob).arrayBuffer());
    page.drawImage(png, { x: pb[0], y: PAGE_H - pb[1] - pb[3], width: pb[2], height: pb[3] });
  } else if (!isBear(state.art)) {
    var an = await doc.embedPng(await bytes(animalUrl(state.art, "print")));
    var s = Math.min(ART.w / an.width, ART.h / an.height), aw = an.width * s, ah = an.height * s;
    // ներքևից հավասարեցված, ինչպես SVG-ում (xMidYMax)
    page.drawImage(an, { x: ART.x + (ART.w - aw) / 2, y: PAGE_H - ART.y - ART.h, width: aw, height: ah });
  }
  var c;
  if (!state.noName) {
    var nameFont = await doc.embedFont(await bytes("fonts/" + fontById(state.font).file), { subset: true });
    var sp = (fontById(state.font).track || 0) * L.nameSize, chars = Array.from(L.name);
    var widths = chars.map(function (ch) { return nameFont.widthOfTextAtSize(ch, L.nameSize); });
    var x = CX - (widths.reduce(function (a, b) { return a + b; }, 0) + sp * (chars.length - 1)) / 2;
    c = NAME_CMYK;
    // տառ առ տառ, որ պահպանվի տառամիջյան տարածությունը
    chars.forEach(function (ch, i) {
      page.drawText(ch, { x: x, y: PAGE_H - L.nameBase, size: L.nameSize, font: nameFont, color: P.cmyk(c[0], c[1], c[2], c[3]) });
      x += widths[i] + sp;
    });
  }
  if (L.sub) {
    var subFont = await doc.embedFont(await bytes("fonts/" + fontById(SUB_FONT).file), { subset: true });
    c = SUB_CMYK;
    page.drawText(L.sub, {
      x: SUB.cx - subFont.widthOfTextAtSize(L.sub, L.subSize) / 2, y: PAGE_H - SUB.baseline,
      size: L.subSize, font: subFont, color: P.cmyk(c[0], c[1], c[2], c[3])
    });
  }
  doc.setTitle("Armat Baby Book" + (state.noName ? "" : " — " + L.name));
  doc.setCreator("armat-babybook");
  return doc.save();
}

async function downloadPdf() {
  var btn = $("pdf"), hint = $("pdfHint"), old = hint.textContent;
  if (!state.noName && !state.name.trim()) { $("name").focus(); hint.textContent = "Նախ գրեք երեխայի անունը"; hint.classList.add("err"); return; }
  if (state.art === "photo" && !state.photo) { hint.textContent = "Նախ ավելացրեք լուսանկարը"; hint.classList.add("err"); return; }
  if (state.art === "photo" && state.frame === "cut" && !state.photo.cut) { hint.textContent = "Սպասեք, ֆոնը դեռ հեռացվում է"; hint.classList.add("err"); return; }
  btn.setAttribute("aria-busy", "true"); hint.classList.remove("err"); hint.textContent = "Պատրաստվում է…";
  try {
    var pdf = await makePrintPdf();
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
    a.download = "Armat_" + state.art + "_" + (state.noName ? "aranc-anvan" : state.name.trim()) + ".pdf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 10000);
    hint.textContent = old;
  } catch (e) {
    console.error(e);
    hint.textContent = "Չստացվեց ստեղծել ֆայլը. փորձեք նորից"; hint.classList.add("err");
  } finally { btn.removeAttribute("aria-busy"); }
}

/* ---------- Իրադարձություններ ---------- */
buildFontPicker();
buildArtPicker();
enableDrag();
// եթե նկարն արդեն վերբեռնված է, կոճակը վերադարձնում է այն կազմի վրա, այլապես բացում է ընտրությունը
$("photoPick").addEventListener("click", function () {
  if (state.photo && state.art !== "photo") { state.art = "photo"; render(); } else $("photoFile").click();
});
$("photoChange").addEventListener("click", function () { $("photoFile").click(); });
$("photoFile").addEventListener("change", function (e) { loadPhoto(e.target.files[0]); e.target.value = ""; });
$("zoom").addEventListener("input", function (e) { state.zoom = e.target.value / 100; renderArt(); });
document.querySelectorAll(".frame-opt").forEach(function (b) {
  b.addEventListener("click", function () {
    if ((b.dataset.frame === "cut") !== (state.frame === "cut")) { state.zoom = 1; state.dx = state.dy = 0; $("zoom").value = 100; }
    state.frame = b.dataset.frame; render();
  });
});
$("sub").value = state.sub;
$("name").addEventListener("input", function (e) { state.name = e.target.value; render(); });
$("noName").addEventListener("change", function (e) { state.noName = e.target.checked; render(); });
$("sub").addEventListener("input", function (e) { state.sub = e.target.value; render(); });
$("size").addEventListener("input", function (e) { state.scale = +e.target.value; render(); });
$("pdf").addEventListener("click", downloadPdf);
render();
fontsReady.then(render);
