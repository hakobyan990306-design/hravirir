/* «Կիսվել» կոճակ՝ բոլոր հրավիրատոմսերի ներքևում (HRAVIRIR.AM ստորագրությունից առաջ).
   Հեռախոսում բացում է կիսվելու պատուհանը (WhatsApp, Telegram, Viber...), համակարգչում՝ պատճենում է հղումը։
   Միանում է core.js-ից, իսկ առանց core.js էջերում՝ <script src="/invites/core/share.js"></script> */
(function () {
  "use strict";
  if (window.__kShare) return; window.__kShare = 1;
  var C = window.INVITE || {};
  if (C.demo || /[?&]preview/.test(location.search) || window !== window.top) return;
  var T = { hy: ["Կիսվել", "Հղումը պատճենված է"], ru: ["Поделиться", "Ссылка скопирована"], en: ["Share", "Link copied"] };
  var IC = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3"/></svg>';
  var css = document.createElement("style");
  css.textContent = ".k-share{display:flex;justify-content:center;padding:26px 16px 6px;background:inherit}" +
    ".k-share button{display:inline-flex;align-items:center;gap:9px;min-height:44px;padding:0 24px;border:1px solid currentColor;border-radius:999px;background:transparent;color:inherit;" +
    "font:inherit;font-size:13px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;opacity:.85;-webkit-tap-highlight-color:transparent}" +
    ".k-share button:active{opacity:.6}";
  document.head.appendChild(css);
  function tx() { var l = (document.documentElement.lang || "hy").slice(0, 2); return T[l] || T.hy; }
  function share(b) {
    var url = location.href.split("#")[0].replace(/[?&]nshum[^&]*/, ""), t = tx();
    if (navigator.share) { navigator.share({ title: document.title, url: url }).catch(function () {}); return; }
    var ok = function () { var s = b.lastChild.textContent; b.lastChild.textContent = t[1]; setTimeout(function () { b.lastChild.textContent = s; }, 2200); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, function () { prompt("", url); });
    else prompt("", url);
  }
  function add() {
    document.querySelectorAll(".made").forEach(function (m) {
      var p = m.previousElementSibling, t = tx();
      if (p && p.classList.contains("k-share")) { if (p.dataset.l !== t[0]) p.querySelector("span").textContent = t[0], p.dataset.l = t[0]; return; }
      var d = document.createElement("div"); d.className = "k-share"; d.dataset.l = t[0];
      d.innerHTML = '<button type="button">' + IC + "<span>" + t[0] + "</span></button>";
      d.firstChild.onclick = function () { share(d.firstChild); };
      m.parentNode.insertBefore(d, m);
    });
  }
  function start() { add(); new MutationObserver(add).observe(document.body, { childList: true, subtree: true }); }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
