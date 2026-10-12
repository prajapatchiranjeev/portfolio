/* Shared helpers: builds the browser + phone "stage" for a project.
   Screenshots load from assets/projects/<slug>/desktop.jpg and mobile.jpg.
   If a file is missing, the browser shows the project name instead (no broken images). */
(function () {
  "use strict";
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function host(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return ""; }
  }
  /* full-page screenshot scrolls inside the frame on hover; falls back to desktop.jpg, then to the name */
  function fit(img) {
    var view = img.parentNode, shift = Math.max(0, Math.min(img.offsetHeight - view.offsetHeight, 2600));
    img.style.setProperty("--shift", shift + "px");
    img.style.setProperty("--dur", Math.max(3, Math.min(shift / 260, 12)) + "s");
  }
  function fb(img) {
    var f = img.getAttribute("data-fb");
    if (f && img.getAttribute("src") !== f) { img.setAttribute("data-fb", ""); img.src = f; } else img.remove();
  }
  window.addEventListener("resize", function () {
    document.querySelectorAll("img.full").forEach(function (i) { if (i.complete && i.naturalWidth) fit(i); });
  });

  /* scroll progress bar */
  var bar = document.createElement("div"); bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(bar); });
  function prog() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
  }
  window.addEventListener("scroll", prog, { passive: true }); window.addEventListener("resize", prog);

  /* lightbox: click any [data-zoom] image */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-zoom]");
    if (!t) return;
    var src = t.getAttribute("data-zoom"), box = document.createElement("div");
    box.className = "lightbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Image preview");
    box.innerHTML = '<button type="button" aria-label="Close preview">Close ✕</button><div class="lightbox__scroll"><img src="' + esc(src) + '" alt=""></div>';
    function close() { box.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", key); }
    function key(ev) { if (ev.key === "Escape") close(); }
    box.addEventListener("click", function (ev) { if (ev.target === box || ev.target.tagName === "BUTTON") close(); });
    document.addEventListener("keydown", key);
    document.body.appendChild(box); document.body.style.overflow = "hidden";
    box.querySelector("button").focus();
  });

  window.UI = {
    fit: fit, fb: fb,
    esc: esc,
    host: host,
    pad: function (n) { return n < 10 ? "0" + n : "" + n; },
    stage: function (p, i, tag, href) {
      var tone = (i % 6) + 1;
      var note = window.SITE.showPlaceholders ? "<small>Screenshot not added yet</small>" : "";
      var inner =
        '<div class="browser" aria-hidden="true">' +
          '<div class="browser__bar"><i></i><i></i><i></i><span>' + esc(host(p.url)) + '</span></div>' +
          '<div class="browser__view">' +
            '<div class="browser__fallback"><b>' + esc(p.name) + '</b>' + note + '</div>' +
            '<img class="full" src="' + esc(p.images.full) + '" data-fb="' + esc(p.images.desktop) + '" alt="" loading="lazy" onload="UI.fit(this)" onerror="UI.fb(this)">' +
          '</div>' +
        '</div>' +
        '<div class="phone" hidden aria-hidden="true"><img src="' + esc(p.images.mobile) + '" alt="" loading="lazy" onload="this.parentNode.hidden=false"></div>';
      return href
        ? '<a class="stage" data-tone="' + tone + '" tabindex="-1" aria-hidden="true" href="' + esc(href) + '">' + inner + '</a>'
        : '<div class="stage" data-tone="' + tone + '">' + inner + '</div>';
    }
  };
})();
