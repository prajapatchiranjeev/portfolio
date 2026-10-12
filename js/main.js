(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS, CATS = window.CATEGORIES, LBL = window.CATEGORY_LABELS;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  /* ---- shared config hooks ---- */
  document.querySelectorAll("[data-resume]").forEach(function (a) { a.setAttribute("href", S.resumePath); });
  document.querySelectorAll("[data-github]").forEach(function (a) { a.setAttribute("href", S.github); });
  var yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- nav ---- */
  var nav = document.getElementById("nav"), toggle = document.getElementById("navToggle"), links = document.getElementById("navLinks");
  function closeMenu() {
    links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }
  toggle.addEventListener("click", function () {
    var open = !links.classList.contains("is-open");
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 860) closeMenu(); });
  window.addEventListener("scroll", function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); }, { passive: true });

  /* ---- project grid ---- */

  /* ---- project grid ---- */
  var grid = document.getElementById("grid"), filters = document.getElementById("filters");

  function placeholder(p, i) {
    var coverPath = "assets/projects/" + p.slug + "/desktop.jpg";

    return '<img class="project-cover" src="' + esc(coverPath) +
      '" alt="' + esc(p.name) + ' website screenshot" loading="lazy" ' +
      'onerror="this.outerHTML=\'<div class=&quot;ph&quot;><span class=&quot;ph__idx&quot;>' +
      pad(i + 1) + ' / ' + pad(P.length) +
      '</span><span class=&quot;ph__name&quot;>' + esc(p.name) +
      '</span><span class=&quot;ph__note&quot;>Screenshot unavailable</span></div>\'">';

  }

  grid.innerHTML = P.map(function (p, i) {
    var cover = p.images && p.images.cover
      ? '<img class="project-cover" src="' + esc(p.images.cover) +
      '" alt="' + esc(p.name) + ' screenshot" loading="lazy">'
      : placeholder(p, i);

    var wide = "";
    var ext = p.url
      ? '<a class="link" href="' + esc(p.url) +
      '" target="_blank" rel="noopener">' + esc(p.linkLabel) + ' ↗</a>'
      : "";

    return '<article class="card reveal' + wide + '" data-cat="' + esc(p.category) + '">' +
      '<a class="card__media" tabindex="-1" aria-hidden="true" href="case-study.html?project=' +
      encodeURIComponent(p.slug) + '">' + cover + '</a>' +
      '<div class="card__body">' +
      '<div class="card__meta"><span>' + esc(LBL[p.category]) +
      '</span><span>' + pad(i + 1) + '</span></div>' +
      '<h3 class="card__title"><a href="case-study.html?project=' +
      encodeURIComponent(p.slug) + '">' + esc(p.name) + '</a></h3>' +
      '<p class="card__desc">' + esc(p.summary) +
      (p.isConcept ? ' <span class="badge">Concept</span>' : '') + '</p>' +
      '<div class="card__actions"><a class="btn btn--small" href="case-study.html?project=' +
      encodeURIComponent(p.slug) + '">View Project <span class="arrow" aria-hidden="true">↗</span></a>' +
      ext + '</div></div></article>';
  }).join("");


  /* ---- skills ---- */
  document.getElementById("skillsGrid").innerHTML = window.SKILLS.map(function (g) {
    return "<div><h3>" + esc(g.group) + "</h3><ul>" + g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  /* ---- contact ---- */
  var row = document.getElementById("contactRow"), note = document.getElementById("contactNote"), html = "";
  if (S.email) html += '<a class="btn btn--primary" href="mailto:' + esc(S.email) + '">' + esc(S.email) + ' <span class="arrow" aria-hidden="true">↗</span></a>';
  if (S.linkedin) html += '<a class="btn' + (S.email ? "" : " btn--primary") + '" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">LinkedIn ↗</a>';
  html += '<a class="btn" href="' + esc(S.github) + '" target="_blank" rel="noopener">GitHub ↗</a>';
  row.innerHTML = html;
  note.textContent = S.email ? "Based in " + S.location + ". Open to UI/UX, web design, Shopify and frontend roles."
    : "Based in " + S.location + ". Open to UI/UX, web design, Shopify and frontend roles. (Add your email in js/projects-data.js to show an email button here.)";

  /* ---- active nav link ---- */
  var secs = ["home", "work", "about", "skills", "contact"].map(function (id) { return document.getElementById(id); });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.querySelectorAll("a:not(.btn)").forEach(function (a) {
            if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { if (s) spy.observe(s); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
