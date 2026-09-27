# Howard Tang — Portfolio

Plain HTML + CSS + a little JavaScript. No frameworks and no build step, so the files in this folder are exactly what's online.

```
index.html                 Home page: intro, about, project cards
projects/
  _template.html           Copy this to start a new project page
  robotic-vehicle.html     Semi-Autonomous Robotic Vehicle
  fo4dsmplx.html           FO4DSMPLX
js/data.js                 ← YOUR LINKS + PROJECT LIST (edit this most)
js/main.js                 Site behavior (rarely needs touching)
css/style.css              All styling. Colors & fonts are at the top in :root
assets/
  resume.pdf               ← add yours with exactly this name
  profile.jpg              (optional headshot)
  favicon.svg              Browser-tab icon
  projects/<slug>/         Images & videos for each project
404.html                   "Page not found" page
.nojekyll                  Tells GitHub Pages to serve files as-is
```

---

## 1. Fill in your info (first time)

1. **`js/data.js`**: your email, LinkedIn, and GitHub links, plus each project's card text. Links set here update everywhere (nav, buttons, footer, every page).
2. **`index.html`**: replace everything in `[square brackets]`: the eyebrow line, one-line intro, facts card, About, Interests, Toolbox, and the footer line.
3. **`assets/resume.pdf`**: drop in your resume with exactly that name. To update it later, replace the file (same name) and every Resume button picks it up.
4. **Photo (optional):** save as `assets/profile.jpg`, then in `index.html` replace `HT` inside `<div class="avatar">` with `<img src="assets/profile.jpg" alt="Howard Tang">`.

> Tip: in VS Code, press **Ctrl+Shift+F** and search for `[` to find every placeholder across the site.

## 2. Preview on your computer

- **Best:** install [VS Code](https://code.visualstudio.com) and the **Live Server** extension. Right-click `index.html` → *Open with Live Server*. The page reloads every time you save.
- **Quick:** double-click `index.html` to open it in your browser. Everything except the 404 page works this way.

## 3. Publish with GitHub Pages (one-time, ~10 minutes)

1. **Create a GitHub account.** Pick a professional username, because it becomes your URL: `https://<username>.github.io`.
2. **Install [GitHub Desktop](https://desktop.github.com).** It syncs your files to GitHub with buttons instead of commands.
3. **Create the repository:** in GitHub Desktop, *File → Add local repository* → pick this folder → click *create a repository* → then **Publish repository**.
   - Set the **Name** to exactly `<username>.github.io` (e.g. `howardtang.github.io`).
   - **Uncheck** “Keep this code private” (free Pages sites must be public).
4. **Turn on Pages:** on github.com open the repo → **Settings → Pages** → *Source: Deploy from a branch* → *Branch: `main`* / *`/ (root)`* → **Save**.
5. After about a minute your site is live at `https://<username>.github.io`. The **Actions** tab shows each deploy's progress.

## 4. Updating the site (everyday workflow)

**Edit → preview → commit → push.**

1. Edit files in VS Code and check them with Live Server.
2. In GitHub Desktop, write a short summary (e.g. *“Add drive-test video to robotic vehicle”*) → **Commit to main** → **Push origin**.
3. Your changes are live in about a minute. If they don't show up, hard-refresh with **Ctrl+F5**.

For small text fixes you can skip the desktop entirely: open the file on github.com → pencil icon → **Commit changes**.

Every commit is saved in the repo history, so you can always roll back a change.

## 5. Adding a new project

1. Copy `projects/_template.html` → `projects/<slug>.html`. The slug is short, lowercase, with hyphens, e.g. `line-follower`.
2. In the new file: set `data-project="<slug>"` on `<body>` and delete the `noindex` line near the top.
3. Add an entry to `PROJECTS` in `js/data.js` with the same slug.
4. Create `assets/projects/<slug>/` for its media.

The card, numbering, and previous/next links update automatically. To reorder projects, reorder the entries in `PROJECTS`.

The comment block at the top of each project page shows how to drop in images, GIFs, videos, and YouTube embeds, and how to change a frame's shape. Project-page section numbers (01, 02…) renumber themselves when you delete a section.

## 6. Images, GIFs & video

- **Photos:** JPG or WebP, ≤ 2000 px wide, ideally < 500 KB. [squoosh.app](https://squoosh.app) compresses for free.
- **Animations:** use **MP4 instead of GIF**. It's typically 5–10× smaller and looks better. Convert at [ezgif.com/gif-to-mp4](https://ezgif.com/gif-to-mp4).
- **Long videos:** upload to YouTube (Unlisted is fine) and embed. Keep any single file in the repo under ~50 MB (GitHub rejects files over 100 MB).
- **Card thumbnails:** 16:9, e.g. 1600×900.
- **File names:** lowercase, no spaces (`drive-test-1.jpg`). ⚠️ GitHub Pages is case-sensitive but Windows isn't. `Photo.JPG` vs `photo.jpg` works on your PC and **breaks online**.
- Always write `alt="…"` text describing the image.

## 7. Custom domain (optional, recommended)

1. **Buy a domain** (~$10–15/year) from [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), [Porkbun](https://porkbun.com), or [Namecheap](https://www.namecheap.com). Check the [GitHub Student Developer Pack](https://education.github.com/pack) first, since it has included free first-year domains.
2. **GitHub:** repo → **Settings → Pages → Custom domain** → enter `yourdomain.com` → **Save**. This adds a `CNAME` file to the repo. Click **Fetch/Pull origin** in GitHub Desktop to bring it down.
3. **At your registrar's DNS settings**, add:

   | Type  | Name  | Value                 |
   |-------|-------|-----------------------|
   | A     | `@`   | `185.199.108.153`     |
   | A     | `@`   | `185.199.109.153`     |
   | A     | `@`   | `185.199.110.153`     |
   | A     | `@`   | `185.199.111.153`     |
   | AAAA  | `@`   | `2606:50c0:8000::153` |
   | AAAA  | `@`   | `2606:50c0:8001::153` |
   | AAAA  | `@`   | `2606:50c0:8002::153` |
   | AAAA  | `@`   | `2606:50c0:8003::153` |
   | CNAME | `www` | `<username>.github.io`|

   Delete any default “parking” A/CNAME records the registrar added. On Cloudflare, set these to **DNS only** (grey cloud).
4. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS** in Settings → Pages.
5. **Verify the domain** (prevents hijacking): your *account* Settings → **Pages → Add a domain** and follow the TXT-record steps.
6. Update the `og:url` / `og:image` lines in `index.html` to use your new domain.

GitHub's current instructions: *docs.github.com → “Managing a custom domain for your GitHub Pages site”*. Double-check the IPs there if anything changes.

## 8. Changing the look

Everything visual lives in `css/style.css`. The top section (`:root`) holds the colors (`--bg`, `--text`, `--accent`, …), fonts, and widths. Change a value once and it applies site-wide.

## Checklist before you share the link

- [ ] No `[brackets]` or `example.com` left (search the whole folder)
- [ ] `assets/resume.pdf` exists; LinkedIn/GitHub/Email buttons go to the right places
- [ ] Unused sections deleted from project pages
- [ ] Every image has `alt` text
- [ ] Checked on your phone
- [ ] `og:image` set so the link shows a preview card on LinkedIn
