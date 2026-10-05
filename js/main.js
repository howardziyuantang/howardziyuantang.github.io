/* ==========================================================================
   main.js — site behavior. You normally don't need to edit this file;
   change js/data.js instead.
     • fills in your links from SITE
     • builds the Current and Past project cards on the home page
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

  const svg = (paths) =>
    `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON_ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');

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
  const media = (src, alt) => {
    const u = esc(root + src);
    if (/\.(mp4|webm)$/i.test(src)) return `<video src="${u}" autoplay muted loop playsinline></video>`;
    return `<img src="${u}" alt="${esc(alt)}" loading="lazy">`;
  };
  const tagList = (tags) =>
    tags && tags.length ? `<ul class="tags">${tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";

  const currentGrid = document.getElementById("current-grid");
  if (currentGrid) {
    const current = typeof CURRENT !== "undefined" ? CURRENT : [];
    const section = currentGrid.closest("section");
    if (!current.length && section) section.hidden = true;
    currentGrid.innerHTML = current
      .map((p) => {
        const inner = `
          ${p.thumbnail ? `<div class="media-slot">${media(p.thumbnail, p.title)}</div>` : ""}
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          ${tagList(p.tags)}`;
        return p.url
          ? `<a class="current-card" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>`
          : `<article class="current-card">${inner}</article>`;
      })
      .join("");
  }

  const grid = document.getElementById("project-grid");
  if (grid) {
    const pad = (n) => String(n).padStart(2, "0");
    grid.innerHTML = projects
      .map(
        (p, i) => `
        <a class="project-card" href="${root}projects/${esc(p.slug)}.html">
          ${p.thumbnail ? `<div class="thumb">${media(p.thumbnail, p.title)}</div>` : ""}
          <div class="body">
            <div class="meta"><span class="index">${pad(i + 1)}</span><span>${esc([p.date, p.status].filter(Boolean).join(" · "))}</span></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
            ${tagList(p.tags)}
            <span class="cta">View project ${ICON_ARROW}</span>
          </div>
        </a>`
      )
      .join("");
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
