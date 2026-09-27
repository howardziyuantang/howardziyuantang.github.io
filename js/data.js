/* ==========================================================================
   data.js — the two things you'll edit most often
     1. SITE      → your links (used on every page: nav, buttons, footer)
     2. PROJECTS  → the project cards on the home page, in display order
   ========================================================================== */

const SITE = {
  email:    "your.email@example.com",                    // TODO
  linkedin: "https://www.linkedin.com/in/your-handle",   // TODO
  github:   "https://github.com/your-username",          // TODO
  resume:   "assets/resume.pdf",  // put your PDF at this path (or paste a full https:// link)
};
// Leave a link as "" to hide its button everywhere.


/*
  Each project = one card on the home page + one page in /projects.

  To add a project:
    1. Copy projects/_template.html  →  projects/<slug>.html
    2. In that new file, set  <body ... data-project="<slug>">
    3. Add an entry below with the same slug (order here = order on the site)
    4. Put its images/videos in  assets/projects/<slug>/
*/
const PROJECTS = [
  {
    slug:      "robotic-vehicle",          // = file name in /projects, without .html
    title:     "Semi-Autonomous Robotic Vehicle",
    summary:   "[One-sentence summary shown on the card.]",
    tags:      ["Robotics", "[Tag]", "[Tag]"],
    date:      "[20XX]",                   // e.g. "Fall 2025" or "2025 – Present"
    status:    "",                         // optional, e.g. "In progress"
    thumbnail: "",                         // e.g. "assets/projects/robotic-vehicle/thumb.jpg" (16:9 looks best; .mp4 works too)
  },
  {
    slug:      "fo4dsmplx",
    title:     "FO4DSMPLX",
    summary:   "[One-sentence summary shown on the card.]",
    tags:      ["[Tag]", "[Tag]", "[Tag]"],
    date:      "[20XX]",
    status:    "",
    thumbnail: "",
  },
];
