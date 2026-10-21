/* ==========================================================================
   data.js — the things you'll edit most often
     1. SITE      → your links (used in the header, contact section, project pages)
     2. CURRENT   → the "Current Projects" cards on the home page
     3. PROJECTS  → the "Past Projects" cards on the home page, in display order
   ========================================================================== */

const SITE = {
  email:    "howardziyuantang@gmail.com",
  linkedin: "https://www.linkedin.com/in/howard-tang1/",
  github:   "https://github.com/howardziyuantang",
  resume:   "assets/resume.pdf",
};
// Leave a link as "" to hide it everywhere.


/*
  Current / upcoming projects. Small cards, no project page needed.
    thumbnail: optional image or .mp4 — if set, it shows above the title
    url:       optional — if set, the whole card becomes a link
*/
const CURRENT = [
  {
    title:     "Autonomous Drone (Princeton Robotics)",
    summary:   "Autonomous aerial infrastructure analysis.",
    tags:      ["Autonomy", "LIDAR", "Simulation - Gazebo"],
    thumbnail: "",
    url:       "",
  },
  {
    title:     "Autonomous Car (Princeton Autonomous Vehicles)",
    summary:   "Mercedes X NVIDIA Alpamayo.",
    tags:      ["Autonomous Vehicles", "Physical AI"],
    thumbnail: "",
    url:       "",
  },
  {
    title:     "Teleoperated Exahuman (Princeton Robotics)",
    summary:   "Mobile ALOHA imitation learning.",
    tags:      ["Robotics", "Imitation Learning", "Simulation - Mujoco"],
    thumbnail: "",
    url:       "",
  },
];


/*
  Past projects. Each one = one card on the home page + one page in /projects.

  To add a project:
    1. Copy projects/_template.html  →  projects/<slug>.html
    2. In that new file, set  <body ... data-project="<slug>">
    3. Add an entry below with the same slug (order here = order on the site)
    4. Put its images/videos in  assets/projects/<slug>/
*/
const PROJECTS = [
  {
    slug:      "fo4dsmplx",
    title:     "FO4DSMPLX",
    summary:   "4D human-scene reconstruction with expressive human parametric models for precise camera redirection.",
    tags:      ["Computer Vision", "4D Human-Scene Reconstruction", "Camera Redirection"],
    date:      "May - July 2026",
    status:    "Complete",
    thumbnail: "assets/projects/fo4dsmplx/thumb.mp4",
  },
  {
    slug:      "robotic-vehicle",
    title:     "Semi-Autonomous Robotic Vehicle",
    summary:   "Compact differential drive robotic vehicle. Designed, programmed and built from scratch.",
    tags:      ["Robotics", "Autonomous Vehicles", "Engineering Design"],
    date:      "Sept. 2023 - March 2025",
    status:    "Complete",
    thumbnail: "assets/projects/robotic-vehicle/thumb.jpg",
  },
];
