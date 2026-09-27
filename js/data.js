/* ==========================================================================
   data.js — the two things you'll edit most often
     1. SITE      → your links (used on every page: nav, buttons, footer)
     2. PROJECTS  → the project cards on the home page, in display order
   ========================================================================== */

const SITE = {
  email:    "howardziyuantang@gmail.com",                   
  linkedin: "https://www.linkedin.com/in/howard-tang1/",   
  github:   "https://github.com/howardziyuantang",          
  resume:   "assets/resume.pdf", 
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
    slug:      "robotic-vehicle",          
    title:     "Semi-Autonomous Robotic Vehicle",
    summary:   "Differential drive robotic vehicle integrating odometry, complementary filtering, drift correction. All components (PCB, firmware, chassis, motor/sensor mounts...) designed and built from scratch across 3 years.",
    tags:      ["Robotics", "Autonomous Vehicles", "Engineering Design"],
    date:      "2023-2025",                   
    status:    "Complete",                        
    thumbnail: "assets/robotic-vehicle/thumb.jpg",                         
  },
  {
    slug:      "fo4dsmplx",
    title:     "FO4DSMPLX",
    summary:   "Human-parametric-model-enhanced open-source, modular, and training-free 4D camera redirection framework.",
    tags:      ["Computer Vision", "4D Human-Scene Reconstruction", "Camera Redirection"],
    date:      "Summer 2026",
    status:    "Complete",
    thumbnail: "assets/projects/fo4dsmplx/thumb.mp4",
  },
];
