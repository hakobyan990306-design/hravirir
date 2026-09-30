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
  var CATS = { wedding: "Հարսանիք", engagement: "Նշանդրեք", baptism: "Կնունք", birthday: "Ծնունդ" };
  var DESIGNS = [
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
    { id: "gold-letter", name: "Ոսկե կնիք", cat: "engagement", colors: ["#f3dcd4", "#fffdf9", "#e7d2a6", "#b8904f"], tag: "Նոր" },
    { id: "ring-velvet", name: "Մատանի", cat: "engagement", colors: ["#0f3b33", "#1a5247", "#d6b77a", "#f7f2e8"], tag: "Նոր" },
    { id: "boho-arch", name: "Կամար", cat: "engagement", colors: ["#f4e9dc", "#e7c9ab", "#b8643f", "#9aa487"], tag: "Նոր" },
    { id: "baptism-silver", name: "Կապույտ-արծաթ", cat: "baptism", colors: ["#fdfeff", "#bcd6ee", "#8fb4dc", "#9aa6b6"], tag: "Նոր" },
    { id: "angel-wings", name: "Հրեշտակ", cat: "baptism", colors: ["#fdfaf8", "#f7e4e4", "#d99aa3", "#b8707c"], tag: "Նոր" },
    { id: "white-ribbon", name: "Ժապավեն", cat: "baptism", colors: ["#fbfcfd", "#cddcea", "#9dbad6", "#5f86ae"], tag: "Նոր" },
    { id: "gift-rainbow", name: "Նվեր", cat: "birthday", colors: ["#fbf5ec", "#d98b6a", "#e8b85a", "#9db39a"], tag: "Նոր" },
    { id: "champagne", name: "Շամպայն", cat: "birthday", colors: ["#141b2d", "#1d2740", "#cfaa62", "#efe6d2"], tag: "Նոր" },
    { id: "space-rocket", name: "Տիեզերք", cat: "birthday", colors: ["#151a3a", "#ff9f5a", "#ffd66b", "#6fd3d0"], tag: "Նոր" },
    { id: "balloon-sky", name: "Օդապարիկ", cat: "birthday", colors: ["#cfe4f2", "#f0a88e", "#9fcfbf", "#f3d27a"], tag: "Նոր" }
    // blush-floral, minimal-noir, sage-greenery, navy-night, burgundy-royal, lavender-jubilee —
    // հին նույնատիպ դասավորությամբ են, կատալոգից հանված են, մինչև նոր ձևով վերասարքվեն
  ];

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
      (d.tag ? '<span class="badge">' + esc(d.tag) + "</span>" : "") +
      '<iframe loading="lazy" tabindex="-1" title="' + esc(d.name) + '" data-src="invites/' + d.id + '/index.html?preview"></iframe></a>' +
      '<div class="body"><div class="meta">' + CATS[d.cat] + "</div><h3>" + esc(d.name) + "</h3>" +
      '<div class="dots">' + d.colors.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</div>" +
      '<div class="actions"><a class="btn btn-ghost" href="invites/' + d.id + '/index.html" target="_blank" rel="noopener">Դիտել</a>' +
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
  $$(".chip").forEach(function (c) { c.addEventListener("click", function () { filter(c.dataset.f); }); });
  $$(".cat").forEach(function (c) {
    c.addEventListener("click", function () { filter(c.dataset.f); $("#designs").scrollIntoView(); });
  });

  /* ---------- Գներ ---------- */
  $("#basePrice").textContent = money(BASE_PRICE).replace(" ֏", "");
  $("#extrasList").innerHTML = EXTRAS.concat(LANG_OPTS.slice(1)).map(function (x) {
    return '<div class="extra"><div><b>' + esc(x.name) + "</b><span>" + esc(x.desc || "") + '</span></div><div class="p">+' + money(x.price) + "</div></div>";
  }).join("");

  /* ---------- Պատվեր՝ invites/order.js-ի «խելացի» ձևով (դաշտերը փոխվում են ըստ միջոցառման տեսակի) ---------- */
  var TYPE_BY_CAT = { wedding: "Հարսանիք", engagement: "Նշանադրություն", baptism: "Մկրտություն", birthday: "Ծնունդ" };
  var orderForm = window.HravirirOrder.mount($("#orderMount"), {
    title: false, designs: DESIGNS, design: new URLSearchParams(location.search).get("design") || ""
  });
  // «Ընտրել» կոճակը բացում է ձևը հենց այդ դիզայնով և միջոցառման տեսակով
  $$("[data-pick]").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = DESIGNS.filter(function (x) { return x.id === b.dataset.pick; })[0];
      window.HravirirOrder.open(d.id, d.name, TYPE_BY_CAT[d.cat]);
    });
  });

  /* ---------- Անիմացիա ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 }) : null;
  $$(".reveal").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  $("#year").textContent = new Date().getFullYear();
})();
