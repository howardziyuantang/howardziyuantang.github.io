/* ==========================================================================
   main.js — site behavior. You normally don't need to edit this file;
   change js/data.js instead.
     • fills in your links from SITE
     • builds the project cards on the home page from PROJECTS
     • builds the previous/next links at the bottom of each project page
     • click-to-enlarge for images on project pages
   ========================================================================== */

(function () {
  const root = document.body.dataset.root || "";
  const site = typeof SITE !== "undefined" ? SITE : {};
  const projects = typeof PROJECTS !== "undefined" ? PROJECTS : [];

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  const pad = (n) => String(n).padStart(2, "0");

  const svg = (paths) =>
    `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON_ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
  const ICON_IMAGE = svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-4.5-4.5L7 20"/>');

  /* ---- Links ---- */
  document.querySelectorAll("[data-link]").forEach((el) => {
    const key = el.dataset.link;
    let url = site[key];
    if (!url) {
      (el.closest("li") || el).hidden = true;
      return;
    }
    if (key === "email") url = "mailto:" + url;
    else if (!/^[a-z]+:/i.test(url)) url = root + url; // local file, e.g. assets/resume.pdf
    el.href = url;
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    if (site.email) el.textContent = site.email;
  });

  /* ---- Home page: project cards ---- */
  const grid = document.getElementById("project-grid");
  if (grid) {
    const thumb = (p) => {
      if (!p.thumbnail) return `<div class="placeholder">${ICON_IMAGE}<span>Add a thumbnail in js/data.js</span></div>`;
      const src = esc(root + p.thumbnail);
      if (/\.(mp4|webm)$/i.test(p.thumbnail)) return `<video src="${src}" autoplay muted loop playsinline></video>`;
      return `<img src="${src}" alt="${esc(p.title)}" loading="lazy">`;
    };

    grid.innerHTML = projects
      .map((p, i) => {
        const meta = [p.date, p.status].filter(Boolean).join(" · ");
        const tags = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
        return `
        <a class="card" href="${root}projects/${esc(p.slug)}.html">
          <div class="card-media">${thumb(p)}</div>
          <div class="card-body">
            <div class="card-meta"><span class="card-index">${pad(i + 1)}</span><span>${esc(meta)}</span></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
            ${tags ? `<ul class="tags">${tags}</ul>` : ""}
            <span class="card-cta">View project ${ICON_ARROW}</span>
          </div>
        </a>`;
      })
      .join("");

    const count = document.getElementById("project-count");
    if (count) count.textContent = pad(projects.length);
  }

  /* ---- Project pages: previous / next ---- */
  const projectNav = document.getElementById("project-nav");
  const current = projects.findIndex((p) => p.slug === document.body.dataset.project);
  if (projectNav && current !== -1) {
    const link = (p, dir) => `
      <a class="${dir}" href="${esc(p.slug)}.html">
        <span class="dir">${dir === "prev" ? "← Previous" : "Next →"}</span>
        <span class="title">${esc(p.title)}</span>
      </a>`;
    const prev = projects[current - 1];
    const next = projects[current + 1];
    projectNav.innerHTML = (prev ? link(prev, "prev") : "") + (next ? link(next, "next") : "");
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Nav border once you scroll ---- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Click an image on a project page to enlarge it ---- */
  const zoomable = document.querySelectorAll(".prose .media img, .project-hero .media img");
  if (zoomable.length && typeof HTMLDialogElement === "function") {
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = '<img alt="">';
    document.body.appendChild(dialog);
    const big = dialog.querySelector("img");
    dialog.addEventListener("click", () => dialog.close());

    zoomable.forEach((img) => {
      img.classList.add("zoomable");
      img.tabIndex = 0;
      const open = () => {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        dialog.showModal();
      };
      img.addEventListener("click", open);
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }
})();
