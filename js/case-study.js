(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS, LBL = window.CATEGORY_LABELS;
  var root = document.getElementById("case");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

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
  function todo(label, field, hint) {
    if (!S.showPlaceholders) return null;
    return '<div class="todo"><b>To be added</b>' + esc(hint) + ' Edit <code>' + esc(field) + '</code> for <code>' + esc(p.slug) + '</code> in <code>js/projects-data.js</code>.</div>';
  }
  var secCount = 0;
  function section(num, title, bodyHtml) {
    if (!bodyHtml) return "";
    num = pad(++secCount);
    return '<section class="case-sec"><h2><small>' + num + '</small>' + esc(title) + '</h2><div>' + bodyHtml + '</div></section>';
  }
  function list(items) { return '<div class="prose"><ul>' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>"; }

  /* 1 intro, 2 context, 3 role+contribution, 4 scope */
  var intro = '<div class="prose"><p>' + esc(p.overview) + '</p></div>';
  var context = p.context ? '<div class="prose"><p>' + esc(p.context) + '</p></div>'
    : todo("context", "context", "Describe the business or product context.");
  var role = "";
  if (p.role || p.contribution.length) {
    role = '<div class="prose">' + (p.role ? "<p>" + esc(p.role) + "</p>" : "") +
      (p.contribution.length ? "<ul>" + p.contribution.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
  } else role = todo("role", "role", "State your specific role and what you actually contributed. Be precise about which pages or tasks were yours.");
  var scope = p.scope.length ? list(p.scope) : todo("scope", "scope", "List the work areas you were involved in (for example, selected pages, theme customization, responsive fixes).");

  /* 5 gallery */


  /* Cover screenshot and responsive gallery */
  var projectFolder = "assets/projects/" + p.slug + "/";

  function screenshot(src, alt, className, loading) {
    return '<img class="' + className + '"' +
      ' src="' + esc(src) + '"' +
      ' alt="' + esc(alt) + '"' +
      ' loading="' + loading + '"' +
      ' onerror="this.closest(\'figure\') ? this.closest(\'figure\').remove() : this.remove()">';
  }

  var coverSrc = (p.images && p.images.cover)
    ? p.images.cover
    : projectFolder + "desktop.jpg";

  var cover =
    '<img class="case-cover__image"' +
    ' src="' + esc(coverSrc) + '"' +
    ' alt="' + esc(p.name + " website screenshot") + '"' +
    ' loading="eager"' +
    ' onerror="this.onerror=null;this.src=\'' +
    esc(projectFolder + "desktop.jpg") + '\'">';

  var galleryItems = [
    {
      src: projectFolder + "desktop.jpg",
      kind: "desktop",
      caption: "Desktop website preview"
    },
    {
      src: projectFolder + "mobile.jpg",
      kind: "mobile",
      caption: "Mobile website preview"
    },
    {
      src: projectFolder + "fullpage.jpg",
      kind: "fullpage",
      caption: "Full-page website preview"
    }
  ];

  var galleryHtml =
    '<div class="gallery gallery--case-study">' +
    galleryItems.map(function (item) {
      return '<figure class="shot shot--' + item.kind + '">' +
        '<div class="shot__frame">' +
        screenshot(
          item.src,
          p.name + " — " + item.caption,
          "shot__image",
          "lazy"
        ) +
        '</div>' +
        '<figcaption>' + esc(item.caption) + '</figcaption>' +
        '</figure>';
    }).join("") +
    '</div>';



  /* repos (GitHub) */
  var reposHtml = "";
  if (p.extra && p.extra.type === "repos") {
    reposHtml = '<div class="repos">' + p.extra.repos.map(function (r) {
      return '<a class="repo" href="' + esc(r.url) + '" target="_blank" rel="noopener"><span class="repo__name">' + esc(r.name) + (r.fork ? ' <span class="badge">Fork</span>' : "") + '</span>' +
        '<span class="repo__lang">' + esc(r.lang || "") + "</span>" +
        (r.fork ? '<span class="repo__desc">Forked from ' + esc(r.forkOf) + (r.desc ? ". " + esc(r.desc) : "") + "</span>" : "") + "</a>";
    }).join("") + '</div><p class="notice">Forks are listed for reference only and are not presented as my own code.</p>';
  }

  /* 6 process, 7 challenges, 8 learnings */
  var process = p.process.length ? '<div class="prose steps">' + p.process.map(function (s) {
    return "<div><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>";
  }).join("") + "</div>" : todo("process", "process", "Describe how you approached the design and development work, only what actually happened.");
  var challenges = p.challenges.length ? '<div class="prose">' + p.challenges.map(function (c) {
    return '<div class="cs-pair"><strong>Challenge</strong><p>' + esc(c.challenge) + '</p><div style="height:12px"></div><strong>Solution</strong><p>' + esc(c.solution) + "</p></div>";
  }).join("") + "</div>" : todo("challenges", "challenges", "Only add challenges and solutions that really happened. Leave empty otherwise.");
  var learnings = p.learnings.length ? list(p.learnings) : todo("learnings", "learnings", "Add what you learned.");

  /* 9 link */
  var live = p.url ? '<div class="prose"><p><a class="btn btn--primary" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.linkLabel) + ' <span class="arrow" aria-hidden="true">↗</span></a></p></div>' : "";

  var facts = '<dl class="facts"><div><dt>Category</dt><dd>' + esc(LBL[p.category]) + '</dd></div>' +
    '<div><dt>Type</dt><dd>' + (p.isConcept ? "Concept project" : "Live project") + '</dd></div>' +
    '<div><dt>My role</dt><dd>' + (p.role ? esc(p.role) : (S.showPlaceholders ? "To be added" : "—")) + '</dd></div>' +
    '<div><dt>Link</dt><dd>' + (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(new URL(p.url).hostname.replace(/^www\./, "")) + ' ↗</a>' : "") + '</dd></div></dl>';


  root.innerHTML =
    '<div class="case-hero"><a class="crumb" href="index.html#work">← All projects</a>' +
    '<span class="eyebrow">' + esc(LBL[p.category]) + (p.isConcept ? " · Concept project" : "") + '</span>' +
    '<h1>' + esc(p.name) + '</h1><p class="case-hero__lead">' + esc(p.summary) + '</p>' + facts +
    '<div class="case-cover"><div class="card__media">' + cover + '</div></div></div>' +
    section("01", "Introduction", intro) +
    section("02", "Business & product context", context) +
    section("03", "My role", role) +
    section("04", "Scope of work", scope) +
    (reposHtml ? section("05", "Repositories", reposHtml) : "") +
    section(reposHtml ? "06" : "05", "Screenshots & gallery", galleryHtml) +
    section("06", "Design & development approach", process) +
    (p.challenges.length || S.showPlaceholders ? section("07", "Challenges & solutions", challenges) : "") +
    section("08", "Key learnings", learnings) +
    section("09", "Live project", live) +
    '<nav class="case-nav" aria-label="Project navigation">' +
    '<a href="case-study.html?project=' + prev.slug + '"><small>← Previous</small><strong>' + esc(prev.name) + '</strong></a>' +
    '<a href="case-study.html?project=' + next.slug + '"><small>Next →</small><strong>' + esc(next.name) + '</strong></a>' +
    '</nav>' +
    '<p class="notice">Brand names, logos and screenshots on third-party sites belong to their respective owners. This page describes work I contributed to, not the ownership of the brand or site.</p>';
})();
