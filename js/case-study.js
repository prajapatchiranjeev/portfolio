(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS, LBL = window.CATEGORY_LABELS, UI = window.UI;
  var esc = UI.esc, pad = UI.pad;
  var root = document.getElementById("case");

  /* shared hooks: nav, resume, year */
  document.querySelectorAll("[data-resume]").forEach(function (a) { a.setAttribute("href", S.resumePath); });
  document.getElementById("year").textContent = new Date().getFullYear();
  var toggle = document.getElementById("navToggle"), links = document.getElementById("navLinks");
  function closeMenu() { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); document.body.style.overflow = ""; }
  toggle.addEventListener("click", function () {
    var open = !links.classList.contains("is-open");
    links.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu"); document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", function () { document.getElementById("nav").classList.toggle("is-scrolled", window.scrollY > 8); }, { passive: true });

  /* find project */
  var slug = new URLSearchParams(window.location.search).get("project");
  var idx = P.findIndex(function (p) { return p.slug === slug; });
  if (idx < 0) {
    document.title = "Project not found | Chiranjeev Prajapat";
    root.innerHTML = '<div class="case-hero"><a class="crumb" href="index.html#work">← All projects</a><h1>Not found</h1>' +
      '<p class="case-hero__lead">That project does not exist. <a href="index.html#work">Back to all work</a>.</p></div>';
    return;
  }
  var p = P[idx], prev = P[(idx - 1 + P.length) % P.length], next = P[(idx + 1) % P.length];
  document.title = p.name + " | Case study | Chiranjeev Prajapat";

  /* helpers */
  function todo(field, hint) {
    if (!S.showPlaceholders) return null;
    return '<div class="todo"><b>To be added</b>' + esc(hint) + ' Edit <code>' + esc(field) + '</code> for <code>' + esc(p.slug) + '</code> in <code>js/projects-data.js</code>.</div>';
  }
  var secCount = 0;
  function section(title, bodyHtml) {
    if (!bodyHtml) return "";
    return '<section class="case-sec"><h2><small>' + pad(++secCount) + '</small>' + esc(title) + '</h2><div>' + bodyHtml + '</div></section>';
  }
  function list(items) { return '<div class="prose"><ul>' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>"; }

  /* intro, context, role, scope */
  var intro = '<div class="prose"><p>' + esc(p.overview) + '</p></div>';
  var context = p.context ? '<div class="prose"><p>' + esc(p.context) + '</p></div>' : todo("context", "Describe the business or product context.");
  var role;
  if (p.role || p.contribution.length) {
    role = '<div class="prose">' + (p.role ? "<p>" + esc(p.role) + "</p>" : "") +
      (p.contribution.length ? "<ul>" + p.contribution.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
  } else role = todo("role", "State your specific role and what you actually contributed. Be precise about which pages or tasks were yours.");
  var scope = p.scope.length ? list(p.scope) : todo("scope", "List the work areas you were involved in (for example, selected pages, theme customization, responsive fixes).");

  /* repositories (GitHub project only) */
  var reposHtml = "";
  if (p.extra && p.extra.type === "repos") {
    reposHtml = '<div class="repos">' + p.extra.repos.map(function (r) {
      return '<a class="repo" href="' + esc(r.url) + '" target="_blank" rel="noopener"><span class="repo__name">' + esc(r.name) + (r.fork ? ' <span class="badge">Fork</span>' : "") + '</span>' +
        '<span class="repo__lang">' + esc(r.lang || "") + "</span>" +
        (r.fork ? '<span class="repo__desc">Forked from ' + esc(r.forkOf) + (r.desc ? ". " + esc(r.desc) : "") + "</span>" : "") + "</a>";
    }).join("") + '</div><p class="notice">Forks are listed for reference only and are not presented as my own code.</p>';
  }

  /* gallery: desktop + mobile auto-load from assets/projects/<slug>/, then any extra images */
  function shot(src, kind, label) {
    var note = S.showPlaceholders ? "<small>Screenshot not added yet</small>" : "";
    var drop = S.showPlaceholders ? "this.remove()" : "this.closest('figure').remove()";
    return '<figure class="shot shot--' + kind + '"><div class="shot__frame">' +
      '<div class="browser__fallback"><b>' + esc(label) + '</b>' + note + '</div>' +
      '<img src="' + esc(src) + '" data-zoom="' + esc(src) + '" alt="' + esc(p.name + " " + label.toLowerCase()) + '" loading="lazy" onerror="' + drop + '"></div>' +
      '<figcaption>' + esc(label) + ' of the live site</figcaption></figure>';
  }
  var extra = p.images.gallery || [];
  var fullHtml = '<figure class="viewer"><div class="viewer__bar"><i></i><i></i><i></i><span>' + esc(UI.host(p.url || "")) + '</span><button type="button" data-zoom="' + esc(p.images.full) + '">Open full size ↗</button></div>' +
    '<div class="viewer__scroll" tabindex="0" aria-label="Scrollable full-page screenshot of ' + esc(p.name) + '"><img src="' + esc(p.images.full) + '" alt="' + esc(p.name + " full page") + '" loading="lazy" onerror="this.closest(\'.viewer\').remove()"></div>' +
    '<figcaption>Full-page capture. Scroll inside the frame to move through the page.</figcaption></figure>';
  var galleryHtml = fullHtml + '<div class="gallery" style="margin-top:20px">' + shot(p.images.desktop, "desktop", "Desktop view") + shot(p.images.mobile, "mobile", "Mobile view") + "</div>";
  if (extra.length) {
    galleryHtml += '<div class="gallery" style="margin-top:16px">' + extra.map(function (s) {
      return '<figure class="shot shot--' + (s.kind === "mobile" ? "mobile" : "desktop") + '"><div class="shot__frame"><img src="' + esc(s.src) + '" alt="' + esc(s.alt || p.name) + '" loading="lazy"></div>' +
        (s.caption ? "<figcaption>" + esc(s.caption) + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div>";
  }
  if (S.showPlaceholders) {
    galleryHtml += '<div style="height:16px"></div><div class="todo"><b>Add your own work here</b>Design explorations and implementation examples go in <code>images.gallery</code> for <code>' + esc(p.slug) + '</code>.' +
      (p.extra && p.extra.type === "app" ? " For the app, add screenshots of the screens you worked on." : "") + "</div>";
  }

  /* process, challenges, learnings, live link */
  var process = p.process.length ? '<div class="prose steps">' + p.process.map(function (s) {
    return "<div><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>";
  }).join("") + "</div>" : todo("process", "Describe how you approached the design and development work, only what actually happened.");
  var challenges = p.challenges.length ? '<div class="prose">' + p.challenges.map(function (c) {
    return '<div class="cs-pair"><strong>Challenge</strong><p>' + esc(c.challenge) + '</p><div style="height:12px"></div><strong>Solution</strong><p>' + esc(c.solution) + "</p></div>";
  }).join("") + "</div>" : todo("challenges", "Only add challenges and solutions that really happened. Leave empty otherwise.");
  var learnings = p.learnings.length ? list(p.learnings) : todo("learnings", "Add what you learned.");
  var live = p.url ? '<div class="prose"><p><a class="btn btn--primary" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.linkLabel) + ' <span aria-hidden="true">↗</span></a></p></div>' : "";

  var facts = '<dl class="facts"><div><dt>Category</dt><dd>' + esc(LBL[p.category]) + '</dd></div>' +
    '<div><dt>Type</dt><dd>' + (p.isConcept ? "Concept project" : "Live project") + '</dd></div>' +
    '<div><dt>My role</dt><dd>' + (p.role ? esc(p.role) : (S.showPlaceholders ? "To be added" : "—")) + '</dd></div>' +
    (p.period ? '<div><dt>Period</dt><dd>' + esc(p.period) + '</dd></div>' : '') + '<div><dt>Link</dt><dd>' + (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(UI.host(p.url)) + ' ↗</a>' : "") + '</dd></div></dl>';

  root.innerHTML =
    '<div class="case-hero"><a class="crumb" href="index.html#work">← All projects</a>' +
    '<div class="label"><b>' + pad(idx + 1) + '</b> ' + esc(LBL[p.category]) + (p.isConcept ? " · Concept project" : "") + '</div>' +
    '<h1>' + esc(p.name) + '</h1><p class="case-hero__lead">' + esc(p.summary) + '</p>' + facts +
    '<div class="case-stage">' + UI.stage(p, idx, "div", null) + '</div></div>' +
    section("Introduction", intro) +
    section("Business & product context", context) +
    section("My role", role) +
    section("Scope of work", scope) +
    section("Repositories", reposHtml) +
    section("Screenshots & gallery", galleryHtml) +
    section("Design & development approach", process) +
    (p.challenges.length || S.showPlaceholders ? section("Challenges & solutions", challenges) : "") +
    section("Key learnings", learnings) +
    section("Live project", live) +
    '<nav class="case-nav" aria-label="Project navigation">' +
      '<a href="case-study.html?project=' + prev.slug + '"><small>← Previous</small><strong>' + esc(prev.name) + '</strong></a>' +
      '<a href="case-study.html?project=' + next.slug + '"><small>Next →</small><strong>' + esc(next.name) + '</strong></a>' +
    '</nav>' +
    '<p class="notice">Brand names, logos and screenshots on third-party sites belong to their respective owners. This page describes work I contributed to, not the ownership of the brand or site.</p>';
})();
