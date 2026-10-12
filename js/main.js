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
  var grid = document.getElementById("grid"), filters = document.getElementById("filters");

  grid.innerHTML = P.map(function (p, i) {
    var href = "case-study.html?project=" + p.slug;
    var ext = p.url ? '<a class="link" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.linkLabel) + ' ↗</a>' : "";
    return '<article class="card reveal" data-cat="' + p.category + '">' +
      window.UI.stage(p, i, "a", href) +
      '<div class="card__body">' +
        '<div class="card__meta"><span>' + esc(LBL[p.category]) + '</span><span>' + pad(i + 1) + '</span></div>' +
        '<h3 class="card__title"><a href="' + href + '">' + esc(p.name) + '</a></h3>' +
        '<p class="card__desc">' + esc(p.summary) + (p.isConcept ? ' <span class="badge">Concept</span>' : '') + '</p>' +
        '<div class="card__actions"><a class="btn btn--small" href="' + href + '">View Project <span aria-hidden="true">↗</span></a>' + ext + '</div>' +
      '</div></article>';
  }).join("");

  filters.innerHTML = CATS.map(function (c) {
    var n = c.key === "all" ? P.length : P.filter(function (p) { return p.category === c.key; }).length;
    return '<button type="button" class="chip" data-filter="' + c.key + '" aria-pressed="' + (c.key === "all") + '">' + esc(c.label) + '<small>' + n + '</small></button>';
  }).join("");

  function applyFilter(key) {
    grid.classList.toggle("is-all", key === "all");
    grid.querySelectorAll(".card").forEach(function (card) {
      var show = key === "all" || card.getAttribute("data-cat") === key;
      card.hidden = !show;
      if (show) card.classList.add("is-in");
    });
    filters.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === key)); });
  }
  applyFilter("all");
  filters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (b) applyFilter(b.getAttribute("data-filter"));
  });

  /* ---- skills ---- */
  document.getElementById("skillsGrid").innerHTML = window.SKILLS.map(function (g) {
    return "<div><h3>" + esc(g.group) + "</h3><ul>" + g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  /* ---- experience ---- */
  var tl = document.getElementById("timeline");
  if (tl) {
    tl.innerHTML = window.EXPERIENCE.map(function (x) {
      return '<li class="tl reveal"><div class="tl__when">' + esc(x.period) + '</div><div><h3>' + esc(x.role) + '</h3><p class="tl__org">' + esc(x.org) + '</p>' + (x.tags ? '<p class="tl__tags">' + esc(x.tags) + '</p>' : '') + '<ul>' +
        x.points.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul></div></li>';
    }).join("");
    var E = window.EDUCATION;
    document.getElementById("edu").innerHTML = '<div><h3>Education</h3><p>' + esc(E.degree) + '<br><span>' + esc(E.school) + '</span></p></div>' +
      '<div><h3>Certifications</h3><ul>' + E.certs.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + '</ul></div>';
  }

  /* ---- contact ---- */
  var row = document.getElementById("contactRow"), note = document.getElementById("contactNote"), html = "";
  if (S.email) html += '<a class="btn btn--white" href="mailto:' + esc(S.email) + '">' + esc(S.email) + ' <span class="arrow" aria-hidden="true">↗</span></a>';
  if (S.linkedin) html += '<a class="btn ' + (S.email ? "btn--light" : "btn--white") + '" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">LinkedIn ↗</a>';
  html += '<a class="btn btn--light" href="' + esc(S.github) + '" target="_blank" rel="noopener">GitHub ↗</a>';
  row.innerHTML = html;
  note.textContent = S.email ? "Based in " + S.location + ". Open to front-end, Shopify, WordPress and UI/UX roles."
    : "Based in " + S.location + ". Open to front-end, Shopify, WordPress and UI/UX roles. (Add your email in js/projects-data.js to show an email button here.)";

  /* ---- ticker + cursor label ---- */
  var words = ["Web design", "Frontend development", "E-commerce", "Shopify", "WordPress", "Responsive interfaces", "Mobile apps", "UI/UX"];
  var tt = document.getElementById("tickerTrack");
  if (tt) tt.innerHTML = words.concat(words).concat(words).concat(words).map(function (w) { return "<span>" + w + "</span>"; }).join("");
  if (window.matchMedia("(hover: hover)").matches) {
    var cur = document.createElement("div"); cur.className = "cursor"; cur.textContent = "View case study ↗"; document.body.appendChild(cur);
    grid.addEventListener("mousemove", function (e) {
      var on = e.target.closest(".card"); cur.classList.toggle("is-on", !!on);
      cur.style.left = e.clientX + "px"; cur.style.top = e.clientY + "px";
    });
    grid.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); });
  }

  /* ---- active nav link ---- */
  var secs = ["home", "work", "about", "experience", "skills", "contact"].map(function (id) { return document.getElementById(id); });
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
