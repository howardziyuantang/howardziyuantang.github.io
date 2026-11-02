/* ==========================================================================
   main.js — site behavior. You normally don't need to edit this file;
   change js/data.js instead.
     • fills in your links from SITE
     • builds the Current and Past project cards on the home page
     • builds the previous/next links at the bottom of each project page
     • click-to-enlarge for images on project pages
     • click-to-enlarge and hover magnifier for data-zoom videos (see VIDEO_ZOOM)
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

  /* ---- Click an image (or a data-zoom video) on a project page to enlarge it ---- */
  const videoZoom = typeof VIDEO_ZOOM !== "undefined" ? VIDEO_ZOOM : {};
  const zoomImages = document.querySelectorAll(".prose .media img, .project-hero .media img");
  const zoomVideos = document.querySelectorAll(".prose .media video[data-zoom], .project-hero .media video[data-zoom]");
  const enlargeVideos = videoZoom.clickToEnlarge ? zoomVideos : [];

  if ((zoomImages.length || enlargeVideos.length) && typeof HTMLDialogElement === "function") {
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = '<img alt=""><video muted loop playsinline></video>';
    document.body.appendChild(dialog);
    const bigImg = dialog.querySelector("img");
    const bigVid = dialog.querySelector("video");
    dialog.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      bigVid.pause();
      bigVid.removeAttribute("src");
      bigVid.load();
    });

    const makeZoomable = (el, open) => {
      el.classList.add("zoomable");
      el.tabIndex = 0;
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    };

    zoomImages.forEach((img) =>
      makeZoomable(img, () => {
        bigVid.hidden = true;
        bigImg.hidden = false;
        bigImg.src = img.currentSrc || img.src;
        bigImg.alt = img.alt;
        dialog.showModal();
      })
    );

    enlargeVideos.forEach((vid) =>
      makeZoomable(vid, () => {
        bigImg.hidden = true;
        bigVid.hidden = false;
        bigVid.src = vid.currentSrc || vid.src;
        bigVid.addEventListener("loadedmetadata", () => { bigVid.currentTime = vid.currentTime; }, { once: true });
        dialog.showModal();
        bigVid.play().catch(() => {});
      })
    );
  }

  /* ---- Hover a data-zoom video to see it through a magnifying lens ---- */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (videoZoom.hoverMagnifier && canHover) {
    const ZOOM = Math.max(1, Number(videoZoom.magnifierZoom) || 3);
    const SIZE = Math.max(40, Number(videoZoom.magnifierSize) || 160);

    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#18181b";

    zoomVideos.forEach((vid) => {
      const box = vid.parentElement;
      const lens = document.createElement("canvas");
      lens.className = "magnifier";
      lens.style.width = lens.style.height = SIZE + "px";
      lens.setAttribute("aria-hidden", "true");
      // Lives on <body> so the box's overflow:hidden can't clip it at the video edges
      document.body.appendChild(lens);
      const ctx = lens.getContext("2d");
      let cx = 0, cy = 0, raf = 0;

      const draw = () => {
        raf = requestAnimationFrame(draw);
        if (!vid.videoWidth) return;
        const dpr = window.devicePixelRatio || 1;
        const px = Math.round(SIZE * dpr);
        if (lens.width !== px) lens.width = lens.height = px;
        ctx.imageSmoothingEnabled = false;

        // Map pointer coordinates to source pixels, accounting for object-fit (cover or contain)
        const r = vid.getBoundingClientRect();
        const fit = getComputedStyle(vid).objectFit === "contain" ? Math.min : Math.max;
        const s = fit(r.width / vid.videoWidth, r.height / vid.videoHeight);
        const ox = (r.width - vid.videoWidth * s) / 2;
        const oy = (r.height - vid.videoHeight * s) / 2;
        const src = SIZE / ZOOM / s;
        const sx = (cx - r.left - ox) / s - src / 2;
        const sy = (cy - r.top - oy) / s - src / 2;

        // Only draw the part of the source that exists; everything else stays page background
        const x0 = Math.max(0, sx), y0 = Math.max(0, sy);
        const x1 = Math.min(vid.videoWidth, sx + src), y1 = Math.min(vid.videoHeight, sy + src);
        const k = px / src;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, px, px);
        if (x1 > x0 && y1 > y0) {
          ctx.drawImage(vid, x0, y0, x1 - x0, y1 - y0, (x0 - sx) * k, (y0 - sy) * k, (x1 - x0) * k, (y1 - y0) * k);
        }
        lens.style.transform = `translate(${cx - SIZE / 2}px, ${cy - SIZE / 2}px)`;
      };

      const track = (e) => {
        cx = e.clientX;
        cy = e.clientY;
      };
      box.addEventListener("pointermove", track);
      box.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "touch") return;
        track(e);
        box.classList.add("magnifying");
        lens.classList.add("on");
        if (!raf) raf = requestAnimationFrame(draw);
      });
      box.addEventListener("pointerleave", () => {
        box.classList.remove("magnifying");
        lens.classList.remove("on");
        cancelAnimationFrame(raf);
        raf = 0;
      });
    });
  }
})();
