/* =====================================================================
   HRAVIRIR.AM — «Նշումների ռեժիմ»
   Բացվում է, երբ հղման վերջում կա ?nshum (օր.՝ .../cinema/index.html?nshum)։
   «✎ Նշել» կոճակը միացնելուց հետո էջի ցանկացած տեղ սեղմելիս դրվում է կարմիր
   կետ, և գրում եք, թե ինչ փոխել։ Նշումները պահվում են այս սարքում (localStorage),
   «Պատճենել»-ը պատճենում է բոլոր դիզայնների նշումները՝ Claude-ին ուղարկելու համար։
   ===================================================================== */
(function () {
  "use strict";
  if (window.__nshum) return; window.__nshum = 1;
  var PFX = "nshum:", path = location.pathname.split("/"), id = path[path.length - 2] || "page";
  var KEY = PFX + id, on = false, notes = load(KEY);

  function load(k) { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var css = document.createElement("style");
  css.textContent =
    ".nsh-bar{position:fixed;left:8px;right:8px;top:calc(8px + env(safe-area-inset-top,0px));z-index:2147483000;display:flex;gap:6px;align-items:center;flex-wrap:wrap;padding:8px;border-radius:14px;background:#1d1d1f;color:#fff;font:600 13px/1.2 Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35)}" +
    ".nsh-bar b{flex:0 0 auto;font-weight:600;white-space:nowrap}.nsh-bar button{flex:1 1 auto;border:0;border-radius:10px;padding:9px 6px;font:700 12.5px Arial,sans-serif;cursor:pointer;background:#3a3a3c;color:#fff;white-space:nowrap}" +
    ".nsh-bar button.on{background:#e01b24}.nsh-bar .cnt{background:#e01b24;border-radius:999px;padding:2px 7px;margin-left:4px}" +
    "html.nsh-on,html.nsh-on *{cursor:crosshair!important}" +
    ".nsh-pin{position:absolute;z-index:2147482999;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#e01b24;color:#fff;font:700 13px/26px Arial,sans-serif;text-align:center;box-shadow:0 0 0 3px #fff,0 4px 10px rgba(0,0,0,.4);cursor:pointer}" +
    ".nsh-pin.fx{position:fixed}" +
    ".nsh-modal{position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center;padding:12px}" +
    ".nsh-box{width:100%;max-width:460px;background:#fff;color:#111;border-radius:16px;padding:16px;font:15px/1.4 Arial,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,.4)}" +
    ".nsh-box small{display:block;color:#777;font-size:12px;margin-bottom:8px;word-break:break-word}" +
    ".nsh-box textarea{width:100%;min-height:96px;border:1.5px solid #ccc;border-radius:10px;padding:10px;font:16px Arial,sans-serif;resize:vertical}" +
    ".nsh-box .row{display:flex;gap:8px;margin-top:10px}.nsh-box button{flex:1;border:0;border-radius:10px;padding:12px;font:700 14px Arial,sans-serif;cursor:pointer;background:#eee;color:#111}" +
    ".nsh-box button.p{background:#e01b24;color:#fff}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "nsh-bar";
  bar.innerHTML = '<b>✎<span class="cnt">0</span></b><button data-a="mark">✎ Նշել</button><button data-a="copy">Պատճենել</button><button data-a="clear">Ջնջել</button>';
  document.body.appendChild(bar);
  var bMark = bar.querySelector('[data-a="mark"]');

  function inUI(el) { return el && el.closest && el.closest(".nsh-bar,.nsh-modal,.nsh-pin"); }
  // ինչի վրա է սեղմել՝ մոտակա տեքստը և բաժինը
  function describe(el) {
    var t = "", e = el;
    for (var i = 0; e && i < 5; i++, e = e.parentElement) {
      var s = (e.innerText || e.getAttribute && (e.getAttribute("alt") || e.getAttribute("aria-label")) || "").replace(/\s+/g, " ").trim();
      if (s) { t = s.length > 70 ? s.slice(0, 70) + "…" : s; break; }
    }
    var tag = el.tagName.toLowerCase(), cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
    if (tag === "img" || (el.style && el.style.backgroundImage) || tag === "svg" || el.closest("svg")) t = (t ? t + " · " : "") + "նկար";
    var env = el.closest("#env"), secs = [].slice.call(document.querySelectorAll("main section, section")), sec = el.closest("section");
    var where = env ? "բացման էկրան" : sec ? "բաժին " + (secs.indexOf(sec) + 1) : "էջ";
    return { txt: t || tag + (cls ? "." + cls : ""), where: where, el: tag + (cls ? "." + cls : "") };
  }
  function draw() {
    [].slice.call(document.querySelectorAll(".nsh-pin")).forEach(function (p) { p.remove(); });
    var hasEnv = !!document.getElementById("env");
    notes.forEach(function (n, i) {
      if (n.fx && !hasEnv) return; // բացման էկրանի նշումները՝ միայն մինչև հրավերը բացվի
      var p = document.createElement("div");
      p.className = "nsh-pin" + (n.fx ? " fx" : ""); p.textContent = i + 1; p.style.left = n.x + "px"; p.style.top = n.y + "px";
      p.title = n.note;
      p.onclick = function (ev) { ev.stopPropagation(); edit(i); };
      document.body.appendChild(p);
    });
    bar.querySelector(".cnt").textContent = notes.length;
  }
  function modal(head, val, onOk, okLabel, extra) {
    var m = document.createElement("div");
    m.className = "nsh-modal";
    m.innerHTML = '<div class="nsh-box"><small>' + esc(head) + '</small><textarea placeholder="Ի՞նչ փոխել այստեղ">' + esc(val || "") + '</textarea><div class="row">' +
      (extra ? '<button data-a="x">' + esc(extra) + "</button>" : "") + '<button data-a="c">Չեղարկել</button><button class="p" data-a="ok">' + esc(okLabel || "Պահել") + "</button></div></div>";
    document.body.appendChild(m);
    var ta = m.querySelector("textarea"), born = Date.now(); setTimeout(function () { ta.focus(); }, 50);
    m.onclick = function (ev) {
      if (ev.target === m && Date.now() - born < 600) return; // մատը բարձրացնելու «click»-ը չփակի պատուհանը
      var a = ev.target.getAttribute && ev.target.getAttribute("data-a");
      if (a === "ok") { var v = ta.value.trim(); m.remove(); if (v) onOk(v); else if (extra) onOk(""); }
      else if (a === "c" || ev.target === m) m.remove();
      else if (a === "x") { m.remove(); onOk(null); }
    };
  }
  function edit(i) {
    var n = notes[i];
    modal((i + 1) + ". " + n.where + " · «" + n.txt + "»", n.note, function (v) {
      if (v === null) notes.splice(i, 1); else if (v) n.note = v;
      save(); draw();
    }, "Պահել", "Ջնջել");
  }
  // iPhone-ում «click»-ը սովորական տարրերի վրա չի գալիս, ուստի նշումը բացում ենք մատը բարձրացնելիս (pointerup),
  // միայն եթե դա կարճ հպում էր, ոչ թե թերթում։ Էջի սեփական սեղմումները արգելափակվում են։
  var start = null;
  function note(target, cx, cy) {
    var d = describe(target), fx = !!target.closest("#env,.topbar,.k-fabs,.k-demo");
    var n = { x: fx ? cx : cx + window.scrollX, y: fx ? cy : cy + window.scrollY, fx: fx, txt: d.txt, where: d.where, el: d.el, sy: Math.round(window.scrollY), vw: window.innerWidth };
    modal(d.where + " · «" + d.txt + "»", "", function (v) { n.note = v; notes.push(n); save(); draw(); });
  }
  function block(ev) {
    if (!on || inUI(ev.target)) return;
    if (document.querySelector(".nsh-modal")) { ev.stopPropagation(); ev.stopImmediatePropagation(); if (ev.type === "click") ev.preventDefault(); return; }
    ev.stopPropagation(); ev.stopImmediatePropagation();
    if (ev.type === "click" || ev.type === "mousedown") ev.preventDefault();
    if (ev.type === "pointerdown") start = { x: ev.clientX, y: ev.clientY, t: Date.now(), el: ev.target };
    if (ev.type === "pointerup" && start) {
      var tap = Math.abs(ev.clientX - start.x) < 12 && Math.abs(ev.clientY - start.y) < 12 && Date.now() - start.t < 800, el = start.el; start = null;
      if (tap) { ev.preventDefault(); note(el, ev.clientX, ev.clientY); }
    }
  }
  ["pointerdown", "pointerup", "mousedown", "touchstart", "touchend", "click"].forEach(function (t) { document.addEventListener(t, block, { capture: true, passive: false }); });

  function allText() {
    var out = [], keys = [];
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf(PFX) === 0) keys.push(k); } } catch (e) {}
    keys.sort().forEach(function (k) {
      var arr = load(k); if (!arr.length) return;
      out.push("[" + k.slice(PFX.length) + "]");
      arr.forEach(function (n, i) { out.push((i + 1) + ". " + n.where + " · «" + n.txt + "» (" + n.el + ", scroll " + n.sy + "px, էկրան " + n.vw + "px) — " + n.note); });
      out.push("");
    });
    return out.join("\n").trim();
  }
  bar.onclick = function (ev) {
    var a = ev.target.getAttribute("data-a");
    if (a === "mark") { on = !on; bMark.classList.toggle("on", on); document.documentElement.classList.toggle("nsh-on", on); bMark.textContent = on ? "Նշում եմ…" : "✎ Նշել"; }
    else if (a === "copy") {
      var txt = allText() || "Նշումներ չկան";
      var done = function () { alert("Բոլոր դիզայնների նշումները պատճենված են։ Տեղադրեք դրանք Claude-ի հետ զրույցում։"); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { modal("Պատճենեք այս տեքստը", txt, function () {}, "Փակել"); });
      else modal("Պատճենեք այս տեքստը", txt, function () {}, "Փակել");
    } else if (a === "clear") { if (confirm("Ջնջե՞լ այս դիզայնի բոլոր նշումները")) { notes = []; save(); draw(); } }
  };
  draw();
  window.addEventListener("resize", draw);
  var app = document.getElementById("app");
  if (app && "MutationObserver" in window) new MutationObserver(function () { clearTimeout(draw.t); draw.t = setTimeout(draw, 300); }).observe(app, { childList: true });
})();
