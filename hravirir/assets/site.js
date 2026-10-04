/* hravirir.am — գլխավոր էջի տրամաբանություն */
(function () {
  "use strict";

  /* ===== ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ — փոխեք այստեղ ===== */
  var PHONE = "37499741574";
  var BASE_PRICE = 8000;
  var EXTRAS = [
    { id: "urgent", name: "Պատրաստել 24 ժամում", desc: "Հրավերը պատրաստ կլինի մեկ օրում", price: 2000 },
    { id: "dress", name: "Դրեսկոդ", desc: "Գույների գունապնակ և նկարագրություն", price: 2000 },
    { id: "rsvp", name: "Մասնակցության հաստատում", desc: "Հյուրերը պատասխանում են անմիջապես կայքից", price: 3000 },
    { id: "tables", name: "Հյուրերի ցուցակը ըստ սեղանների", desc: "Հյուրը գրում է անունը և գտնում իր սեղանը", price: 5000 },
    { id: "music", name: "Նախընտրած երաժշտություն", desc: "Ձեր ընտրած երգը հրավերի ֆոնին", price: 2000 }
  ];
  var LANG_OPTS = [
    { id: "1", name: "Միայն հայերեն", price: 0 },
    { id: "2", name: "Երկլեզու", desc: "օր.՝ հայերեն + ռուսերեն", price: 5000 },
    { id: "3", name: "Եռալեզու", desc: "հայերեն + ռուսերեն + անգլերեն", price: 9000 }
  ];
  var CATS = { wedding: "Հարսանիք", engagement: "Նշանդրեք", baptism: "Կնունք", birthday: "Ծնունդ", baby: "Սեռի բացահայտում" };
  var DESIGNS = [
    { id: "memories", name: "Հուշեր", cat: "wedding", colors: ["#f7f5f1", "#d6d3cd", "#6e6c68", "#111111"], tag: "Նոր" },
    { id: "ivory", name: "Լույս", cat: "wedding", colors: ["#ffffff", "#efe6d6", "#d8c3a2", "#b8955a"], tag: "Նոր" },
    { id: "bordeaux", name: "Բորդո", cat: "wedding", colors: ["#5c0d1a", "#9e1424", "#111111", "#efe6da"], tag: "Նոր" },
    { id: "elegance", name: "Էլեգանս", cat: "wedding", colors: ["#ffffff", "#d9d7d3", "#8a8885", "#2b2b2b"], tag: "Նոր" },
    { id: "teddy", name: "Արջուկ", cat: "baby", colors: ["#fbf6ef", "#e7d2b6", "#c9a882", "#6b4b33"], tag: "Նոր" },
    { id: "silk-bow", name: "Մետաքսե ժապավեն", cat: "wedding", colors: ["#fbf7f1", "#fffdf9", "#8a1c2b", "#8c7b74"], tag: "Նոր" },
    { id: "olive-seal", name: "Ձիթենու կնիք", cat: "wedding", colors: ["#efe9e1", "#f8f4ee", "#c9a15a", "#8f6f43"], tag: "Նոր" },
    { id: "noir-rings", name: "Սև և ոսկի", cat: "wedding", colors: ["#0f0d0c", "#3a0f14", "#d6b574", "#f2e9d8"], tag: "Նոր" },
    { id: "polaroid", name: "Պոլարոիդ", cat: "wedding", colors: ["#ffffff", "#f6f1ea", "#c8ab85", "#b0805f"], tag: "Նոր" },
    { id: "mono-walk", name: "Մոնոխրոմ քայլ", cat: "wedding", colors: ["#000000", "#4a4a4a", "#bdbdbd", "#ffffff"], tag: "Նոր" },
    { id: "editorial", name: "Էդիտորիալ", cat: "wedding", colors: ["#ffffff", "#f3f3f1", "#6b6b6b", "#111111"], tag: "Նոր" },
    { id: "nur", name: "Նուռ", cat: "wedding", colors: ["#3a0a0e", "#8e1b25", "#c9a04e", "#f6efe2"], tag: "Նոր" },
    { id: "terra", name: "Տերրա", cat: "wedding", colors: ["#3d2a21", "#6e4a33", "#efe4d4", "#faf5ee"], tag: "Նոր" },
    { id: "doll-car", name: "Տիկնիկ", cat: "wedding", colors: ["#fbeee9", "#f2b8c0", "#c9707c", "#ead7b5"], tag: "Նոր" },
    { id: "lavash", name: "Բախտի ափսե", cat: "wedding", colors: ["#efd7a8", "#b8322a", "#2c4f8c", "#fbf5ea"], tag: "Նոր" },
    { id: "boarding", name: "Ավիատոմս", cat: "wedding", colors: ["#dbe8f3", "#1d2b4f", "#e8735a", "#ffc94a"], tag: "Նոր" },
    { id: "scratch", name: "Քերվող քարտ", cat: "wedding", colors: ["#fffaf7", "#e5b3ae", "#d7b46a", "#9c6b67"], tag: "Նոր" },
    { id: "bw-classic", name: "Սև-սպիտակ", cat: "wedding", colors: ["#ffffff", "#d6d6d6", "#111111", "#e01b24"], tag: "Նոր" },
    { id: "bw-script", name: "Նուար", cat: "wedding", colors: ["#111111", "#6d6d6d", "#ffffff", "#cfcfcf"], tag: "Նոր" },
    { id: "tuscany", name: "Տոսկանա", cat: "wedding", colors: ["#fdfbf5", "#1f4e9c", "#f2cf3a", "#5f8a3a"], tag: "Նոր" },
    { id: "peony", name: "Պիոն", cat: "wedding", colors: ["#fffaf6", "#f8ebe6", "#c9737a", "#a8b79c"], tag: "Նոր" },
    { id: "night-magic", name: "Կախարդանք", cat: "wedding", colors: ["#0d1628", "#23406b", "#b7a6d9", "#e8cf8e"], tag: "Նոր" },
    { id: "cinema", name: "Կինո", cat: "wedding", colors: ["#0e0d0c", "#efe7da", "#a3262a", "#c8a45c"], tag: "Նոր" },
    { id: "atamhatik", name: "Ատամհատիկ", cat: "birthday", colors: ["#fff6ea", "#f3a883", "#8fcfb8", "#f5cf6a"], tag: "Նոր" },
    { id: "doves", name: "Աղավնիներ", cat: "wedding", colors: ["#e6edf4", "#fbfcfd", "#6f8fb3", "#c9d1da"], tag: "Նոր" },
    { id: "vinyl", name: "Սիրո մեղեդի", cat: "wedding", colors: ["#f1e8d6", "#5f6b3a", "#d9a441", "#1a1916"], tag: "Նոր" },
    { id: "taraz", name: "Տարազ", cat: "wedding", colors: ["#8c1c24", "#5e0f18", "#c9a04e", "#f5ead6"], tag: "Նոր" },
    { id: "stained-glass", name: "Վիտրաժ", cat: "wedding", colors: ["#f8f3ea", "#2458a6", "#9e2436", "#b8904f"], tag: "Նոր" },
    { id: "lavender", name: "Լավանդա", cat: "wedding", colors: ["#f7d9c4", "#b9a6d8", "#8f7bb8", "#8e9b7a"], tag: "Նոր" },
    { id: "post-letter", name: "Փոստ", cat: "wedding", colors: ["#ffffff", "#e9e7e3", "#9a9792", "#1d1d1d"], tag: "Նոր" },
    { id: "white-seal", name: "Սպիտակ ծրար", cat: "wedding", colors: ["#fbf8f2", "#e9e3d8", "#9aa88a", "#7f8f6e"], tag: "Նոր" },
    { id: "chandelier", name: "Ջահ", cat: "wedding", colors: ["#fbf6f1", "#ead3c8", "#e6cf9c", "#b48a47"], tag: "Նոր" },
    { id: "monogram", name: "Մոնոգրամ", cat: "wedding", colors: ["#454545", "#7d7d7d", "#d9d9d6", "#fbfbfa"], tag: "Նոր" },
    { id: "noir-sunset", name: "Սև-ոսկի մայրամուտ", cat: "wedding", colors: ["#141312", "#c9a96b", "#f1ece4", "#6f675e"], tag: "Նոր" },
    { id: "blush-garden", name: "Վարդագույն այգի", cat: "wedding", colors: ["#ecccc5", "#8a8357", "#6f6a3e", "#3b2923"], tag: "Նոր" },
    { id: "olive-letter", name: "Նամակ", cat: "wedding", colors: ["#6f7e53", "#b9c79a", "#b98a5e", "#fbf7ec"], tag: "Նոր" },
    { id: "classic-green", name: "Classic", cat: "wedding", colors: ["#f9f7f3", "#e9e1d3", "#8f9a8c", "#34473a"], tag: "Նոր" },
    { id: "gold-gate", name: "Ոսկե դարպաս", cat: "wedding", colors: ["#2a2721", "#fbf8f2", "#e6d3ab", "#b08d57"], tag: "Նոր" },
    { id: "red-rose", name: "Կարմիր վարդ", cat: "engagement", colors: ["#3a0710", "#b0182c", "#f6ede6", "#c9a063"], tag: "Նոր" },
    { id: "gold-letter", name: "Ոսկե կնիք", cat: "engagement", colors: ["#f3dcd4", "#fffdf9", "#e7d2a6", "#b8904f"], tag: "Նոր" },
    { id: "ring-velvet", name: "Մատանի", cat: "engagement", colors: ["#0f3b33", "#1a5247", "#d6b77a", "#f7f2e8"], tag: "Նոր" },
    { id: "boho-arch", name: "Կամար", cat: "engagement", colors: ["#f4e9dc", "#e7c9ab", "#b8643f", "#9aa487"], tag: "Նոր" },
    { id: "narot", name: "Նարոտ", cat: "baptism", colors: ["#fbf7f2", "#c4182a", "#ffffff", "#b8893d"], tag: "Նոր" },
    { id: "candle", name: "Մոմ", cat: "baptism", colors: ["#1c1712", "#fbf6ec", "#c9a45f", "#f4ead8"], tag: "Նոր" },
    { id: "baptism-silver", name: "Կապույտ-արծաթ", cat: "baptism", colors: ["#fdfeff", "#bcd6ee", "#8fb4dc", "#9aa6b6"], tag: "Նոր" },
    { id: "angel-wings", name: "Հրեշտակ", cat: "baptism", colors: ["#fdfaf8", "#f7e4e4", "#d99aa3", "#b8707c"], tag: "Նոր" },
    { id: "white-ribbon", name: "Ժապավեն", cat: "baptism", colors: ["#fbfcfd", "#cddcea", "#9dbad6", "#5f86ae"], tag: "Նոր" },
    { id: "castle", name: "Արքայադուստր", cat: "birthday", colors: ["#f6e6f0", "#f4b6cf", "#b89ad8", "#f2c96b"], tag: "Նոր" },
    { id: "pocket-watch", name: "Ժամացույց", cat: "birthday", colors: ["#1f1510", "#8a5a33", "#c79a4e", "#efe4cf"], tag: "Նոր" },
    { id: "gift-rainbow", name: "Նվեր", cat: "birthday", colors: ["#fbf5ec", "#d98b6a", "#e8b85a", "#9db39a"], tag: "Նոր" },
    { id: "champagne", name: "Շամպայն", cat: "birthday", colors: ["#141b2d", "#1d2740", "#cfaa62", "#efe6d2"], tag: "Նոր" },
    { id: "space-rocket", name: "Տիեզերք", cat: "birthday", colors: ["#151a3a", "#ff9f5a", "#ffd66b", "#6fd3d0"], tag: "Նոր" },
    { id: "balloon-sky", name: "Օդապարիկ", cat: "birthday", colors: ["#cfe4f2", "#f0a88e", "#9fcfbf", "#f3d27a"], tag: "Նոր" }
    // blush-floral, minimal-noir, sage-greenery, navy-night, burgundy-royal, lavender-jubilee —
    // հին նույնատիպ դասավորությամբ են, կատալոգից հանված են, մինչև նոր ձևով վերասարքվեն
  ];

  /* ===== Թարգմանություններ (ռուսերեն, անգլերեն) ===== */
  var NAMES = {
    ru: { "silk-bow": "Шёлковая лента", "olive-seal": "Оливковая печать", "noir-rings": "Чёрное и золото", "polaroid": "Полароид", "mono-walk": "Монохром", "editorial": "Эдиториал", "nur": "Гранат", "terra": "Терра",
      "doll-car": "Кукла", "lavash": "Тарелка на счастье", "boarding": "Авиабилет", "scratch": "Скретч-карта", "bw-classic": "Чёрно-белый", "bw-script": "Нуар", "tuscany": "Тоскана", "peony": "Пион",
      "night-magic": "Волшебство", "cinema": "Кино", "atamhatik": "Атамгатик", "doves": "Голуби", "vinyl": "Мелодия любви", "taraz": "Тараз", "stained-glass": "Витраж", "lavender": "Лаванда",
      "post-letter": "Почта", "white-seal": "Белый конверт", "chandelier": "Люстра", "monogram": "Монограмма", "noir-sunset": "Чёрно-золотой закат", "blush-garden": "Розовый сад", "olive-letter": "Письмо",
      "classic-green": "Classic", "gold-gate": "Золотые ворота", "red-rose": "Красная роза", "gold-letter": "Золотая печать", "ring-velvet": "Кольцо", "boho-arch": "Арка", "narot": "Нарот", "candle": "Свеча",
      "baptism-silver": "Голубое серебро", "angel-wings": "Ангел", "white-ribbon": "Лента", "castle": "Принцесса", "pocket-watch": "Часы", "gift-rainbow": "Подарок", "champagne": "Шампанское",
      "space-rocket": "Космос", "balloon-sky": "Воздушный шар", "memories": "Воспоминания", "elegance": "Элеганс", "bordeaux": "Бордо", "ivory": "Свет", "teddy": "Мишутка" },
    en: { "silk-bow": "Silk Ribbon", "olive-seal": "Olive Seal", "noir-rings": "Black & Gold", "polaroid": "Polaroid", "mono-walk": "Monochrome Walk", "editorial": "Editorial", "nur": "Pomegranate", "terra": "Terra",
      "doll-car": "The Doll", "lavash": "Plate for Luck", "boarding": "Boarding Pass", "scratch": "Scratch Card", "bw-classic": "Black & White", "bw-script": "Noir", "tuscany": "Tuscany", "peony": "Peony",
      "night-magic": "Night Magic", "cinema": "Cinema", "atamhatik": "First Tooth", "doves": "Doves", "vinyl": "Love Melody", "taraz": "Taraz", "stained-glass": "Stained Glass", "lavender": "Lavender",
      "post-letter": "Post Letter", "white-seal": "White Envelope", "chandelier": "Chandelier", "monogram": "Monogram", "noir-sunset": "Noir Sunset", "blush-garden": "Blush Garden", "olive-letter": "The Letter",
      "classic-green": "Classic", "gold-gate": "Golden Gate", "red-rose": "Red Rose", "gold-letter": "Gold Seal", "ring-velvet": "The Ring", "boho-arch": "Boho Arch", "narot": "Narot", "candle": "Candle",
      "baptism-silver": "Blue Silver", "angel-wings": "Angel", "white-ribbon": "Ribbon", "castle": "Princess", "pocket-watch": "Pocket Watch", "gift-rainbow": "Gift", "champagne": "Champagne",
      "space-rocket": "Space", "balloon-sky": "Hot-Air Balloon", "memories": "Memories", "elegance": "Elegance", "bordeaux": "Bordeaux", "ivory": "Ivory Light", "teddy": "Teddy" }
  };
  var UI = {
    hy: { view: "Դիտել", pick: "Ընտրել", tag: "Նոր", cats: CATS_HY(), ex: null },
    ru: { view: "Смотреть", pick: "Выбрать", tag: "Новинка", cats: { wedding: "Свадьба", engagement: "Помолвка", baptism: "Крестины", birthday: "День рождения", baby: "Гендер-пати" },
      ex: [["Готовность за 24 часа", "Приглашение будет готово за один день"], ["Дресс-код", "Палитра цветов и описание"], ["Подтверждение присутствия", "Гости отвечают прямо на сайте"],
        ["Список гостей по столам", "Гость вводит имя и находит свой стол"], ["Своя музыка", "Выбранная вами песня на фоне приглашения"], ["Два языка", "напр.: армянский + русский"], ["Три языка", "армянский + русский + английский"]] },
    en: { view: "View", pick: "Choose", tag: "New", cats: { wedding: "Wedding", engagement: "Engagement", baptism: "Baptism", birthday: "Birthday", baby: "Gender reveal" },
      ex: [["Ready in 24 hours", "Your invitation is ready in one day"], ["Dress code", "Color palette and description"], ["RSVP", "Guests reply right on the website"],
        ["Seating list", "The guest types a name and finds their table"], ["Your own music", "The song of your choice in the background"], ["Two languages", "e.g. Armenian + Russian"], ["Three languages", "Armenian + Russian + English"]] }
  };
  function CATS_HY() { return { wedding: "Հարսանիք", engagement: "Նշանդրեք", baptism: "Կնունք", birthday: "Ծնունդ", baby: "Սեռի բացահայտում" }; }
  function lang() { return window.SiteLang ? window.SiteLang.get() : "hy"; }
  function dname(d) { var l = lang(); return (NAMES[l] && NAMES[l][d.id]) || d.name; }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n) { return n.toLocaleString("en-US").replace(/,/g, ".") + " ֏"; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Նավիգացիա ---------- */
  var nav = $(".nav");
  window.addEventListener("scroll", function () { nav.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });
  $(".burger").addEventListener("click", function () { nav.classList.toggle("open"); });
  $$(".menu a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); }); });

  /* ---------- Դիզայններ ---------- */
  var grid = $("#designGrid");
  grid.innerHTML = DESIGNS.map(function (d) {
    return '<article class="design reveal" data-cat="' + d.cat + '">' +
      '<a class="shot" href="invites/' + d.id + '/index.html" target="_blank" rel="noopener" aria-label="' + esc(d.name) + '">' +
      (d.tag ? '<span class="badge" data-tag>' + esc(d.tag) + "</span>" : "") +
      '<img loading="lazy" decoding="async" alt="' + esc(d.name) + '" src="assets/thumbs/' + d.id + '.webp"></a>' +
      '<div class="body"><div class="meta" data-cat-l="' + d.cat + '">' + CATS[d.cat] + '</div><h3 data-dn="' + d.id + '">' + esc(d.name) + "</h3>" +
      '<div class="dots">' + d.colors.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</div>" +
      '<div class="actions"><a class="btn btn-ghost" data-view href="invites/' + d.id + '/index.html" target="_blank" rel="noopener">Դիտել</a>' +
      '<button class="btn btn-primary" data-pick="' + d.id + '">Ընտրել</button></div></div></article>';
  }).join("");

  // մանրապատկերները լցնում են քարտի ամբողջ լայնությունը
  function fitShots() { $$(".design .shot").forEach(function (s) { if (s.clientWidth) s.style.setProperty("--s", (s.clientWidth / 375).toFixed(4)); }); }
  fitShots();
  window.addEventListener("resize", fitShots);
  if ("ResizeObserver" in window) new ResizeObserver(fitShots).observe(grid);

  // iframe-ները բեռնվում են միայն երբ երևում են
  var lazy = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.src = e.target.dataset.src; lazy.unobserve(e.target); } });
  }, { rootMargin: "300px" }) : null;
  $$("iframe[data-src]").forEach(function (f) { lazy ? lazy.observe(f) : (f.src = f.dataset.src); });

  function filter(cat) {
    $$(".chip").forEach(function (c) { c.classList.toggle("on", c.dataset.f === cat); });
    $$(".design").forEach(function (d) { d.style.display = cat === "all" || d.dataset.cat === cat ? "" : "none"; });
  }
  $$(".chip").forEach(function (c) { c.addEventListener("click", function () {
    filter(c.dataset.f);
    try { history.replaceState(null, "", c.dataset.f === "all" ? "#designs" : "#" + c.dataset.f); } catch (e) {}
  }); });
  // առանձին հղում ամեն բաժնի համար. hravirir.pages.dev/#wedding, #engagement, #baptism, #birthday, #baby, #designs (բոլորը)
  function fromHash() {
    var h = location.hash.slice(1); if (!h) return;
    var ok = $$(".chip").some(function (c) { return c.dataset.f === h; });
    if (h === "designs") h = "all", ok = true;
    if (!ok) return;
    filter(h);
    setTimeout(function () { var s = $("#designs"); if (s) s.scrollIntoView(); }, 60);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
  $$(".cat").forEach(function (c) {
    c.addEventListener("click", function () { filter(c.dataset.f); $("#designs").scrollIntoView(); });
  });

  /* ---------- Գներ ---------- */
  $("#basePrice").textContent = money(BASE_PRICE).replace(" ֏", "");
  $("#extrasList").innerHTML = EXTRAS.concat(LANG_OPTS.slice(1)).map(function (x) {
    return '<div class="extra"><div><b data-ex="' + x.id + '">' + esc(x.name) + "</b><span>" + esc(x.desc || "") + '</span></div><div class="p">+' + money(x.price) + "</div></div>";
  }).join("");

  /* ---------- Պատվեր՝ invites/order.js-ի «խելացի» ձևով (դաշտերը փոխվում են ըստ միջոցառման տեսակի) ---------- */
  var TYPE_BY_CAT = { wedding: "Հարսանիք", engagement: "Նշանադրություն", baptism: "Մկրտություն", birthday: "Ծնունդ", baby: "Այլ" };
  var orderForm = window.HravirirOrder.mount($("#orderMount"), {
    title: false, designs: DESIGNS, lang: lang(), design: new URLSearchParams(location.search).get("design") || ""
  });
  // «Ընտրել» կոճակը բացում է ձևը հենց այդ դիզայնով և միջոցառման տեսակով
  $$("[data-pick]").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = DESIGNS.filter(function (x) { return x.id === b.dataset.pick; })[0];
      window.HravirirOrder.open(d.id, dname(d), TYPE_BY_CAT[d.cat]);
    });
  });

  /* ---------- Լեզվի փոխում ---------- */
  function relabel(l) {
    var U = UI[l] || UI.hy, cats = U.cats, ex = EXTRAS.concat(LANG_OPTS.slice(1));
    $$("[data-dn]").forEach(function (h) { var d = DESIGNS.filter(function (x) { return x.id === h.dataset.dn; })[0]; h.textContent = dname(d); });
    $$("[data-cat-l]").forEach(function (m) { m.textContent = cats[m.dataset.catL]; });
    $$("[data-tag]").forEach(function (b) { b.textContent = U.tag; });
    $$("[data-view]").forEach(function (a) { a.textContent = U.view; });
    $$("[data-pick]").forEach(function (b) { b.textContent = U.pick; });
    $$("[data-ex]").forEach(function (b, i) { var x = ex[i]; b.textContent = U.ex ? U.ex[i][0] : x.name; b.nextSibling.textContent = U.ex ? U.ex[i][1] : (x.desc || ""); });
    if (orderForm && orderForm.setLang) orderForm.setLang(l);
  }
  if (window.SiteLang) { window.SiteLang.on(relabel); relabel(lang()); }

  /* ---------- Անիմացիա ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 }) : null;
  $$(".reveal").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  $("#year").textContent = new Date().getFullYear();
})();
