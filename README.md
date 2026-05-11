# Money and Meaning 💰

> Premium finance editorial website — dark luxury aesthetic, editorial design, fully static, deployment-ready.

---

## 📁 Exact Folder Structure

```
money-and-meaning/
│
├── index.html          ← Homepage (hero, featured, categories, blog grid, newsletter)
├── about.html          ← About page (manifesto, values, team, stats)
├── articles.html       ← Articles listing (filter bar, full grid, pagination)
├── contact.html        ← Contact page (form, FAQ, options)
├── style.css           ← Complete stylesheet (all pages, responsive)
├── script.js           ← All JavaScript (navbar, animations, forms, counters)
│
├── images/             ← Add your own images here
│   └── README.txt
│
└── README.md           ← This file
```

**Total files: 6 code files + images folder**

---

## ✅ What's Built and Working

### All 4 Pages
| Page | Sections Included |
|---|---|
| `index.html` | Loading screen, navbar, hero with card, ticker, stats bar, featured grid, 6-topic categories, 6-article blog grid, philosophy quote, newsletter signup, footer |
| `articles.html` | Loading screen, navbar, page hero, sticky filter bar with working filters, 12-article grid, pagination, newsletter, footer |
| `about.html` | Loading screen, navbar, page hero, manifesto with image, values grid, stats bar, team grid (4 writers), philosophy quote, newsletter, footer |
| `contact.html` | Loading screen, navbar, page hero, contact form (working with success state), 4 contact options, FAQ grid, newsletter, footer |

### JavaScript Features
- ✅ Animated loading screen (1.8s, fades out)
- ✅ Sticky navbar (transparent → glass blur on scroll)
- ✅ Hamburger mobile menu (full-screen overlay)
- ✅ Scroll-triggered reveal animations
- ✅ Animated stats counters (count up when visible)
- ✅ Newsletter form with success state
- ✅ Contact form with success state
- ✅ Filter buttons on articles page
- ✅ Smooth anchor link scrolling
- ✅ Reading progress bar on articles page
- ✅ Subtle card hover tilt effect (desktop)

---

## 🖥️ Local Preview (VS Code)

### Option A — Live Server (recommended)
1. Install [VS Code](https://code.visualstudio.com)
2. Open the `money-and-meaning` folder: `File → Open Folder`
3. Install the **Live Server** extension (search in Extensions panel)
4. Right-click `index.html` → **Open with Live Server**
5. Site opens at `http://127.0.0.1:5500` and auto-refreshes on save ✓

### Option B — Direct browser
Just double-click `index.html` to open. Note: Google Fonts won't load offline.

---

## 🐙 GitHub Setup — Step by Step

### Step 1 — Install Git
Download from [git-scm.com](https://git-scm.com) and run the installer.

### Step 2 — Configure Git (one-time setup)
Open VS Code terminal (`Terminal → New Terminal`):
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Step 3 — Initialize the project as a Git repository
```bash
# Make sure you're inside the money-and-meaning folder:
cd path/to/money-and-meaning

git init
git add .
git commit -m "🚀 Initial launch: Money and Meaning website"
```

### Step 4 — Create a new GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `money-and-meaning`
3. Set visibility: **Public** (required for free Vercel deployment)
4. ⚠️ Do NOT check "Add README" — you already have one
5. Click **Create repository**

### Step 5 — Connect and push
GitHub shows you these commands after creation. Run them:
```bash
git remote add origin https://github.com/YOUR-USERNAME/money-and-meaning.git
git branch -M main
git push -u origin main
```

✅ **Your code is now live on GitHub.**

### Step 6 — Ongoing workflow (every time you make changes)
```bash
git add .
git commit -m "Updated hero section copy"
git push
# Vercel automatically deploys the update in ~30 seconds
```

---

## ⚡ Vercel Deployment — Step by Step

### Step 1 — Create a Vercel account
Go to [vercel.com](https://vercel.com) → Click **Sign Up** → Choose **Continue with GitHub**

### Step 2 — Import your project
1. Click **Add New → Project**
2. You'll see your GitHub repositories — find `money-and-meaning`
3. Click **Import**

### Step 3 — Configure settings
Leave everything as the default:
- **Framework Preset:** Other
- **Root Directory:** `./` (blank)
- **Build Command:** (leave empty — no build needed)
- **Output Directory:** (leave empty)

### Step 4 — Deploy
Click **Deploy**. Vercel builds and deploys in ~30 seconds.

✅ **You'll get a free URL like `money-and-meaning.vercel.app`**

### Automatic deployments
After setup, every `git push` to `main` triggers an automatic redeploy. No manual steps needed.

---

## 🌐 Connecting Your Custom Domain

When you're ready to use `moneyandmeaning.com` (or your domain):

1. Go to [vercel.com](https://vercel.com) → Your project → **Settings → Domains**
2. Type your domain name and click **Add**
3. Vercel shows you DNS records to add (usually an `A` record pointing to `76.76.19.61`)
4. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
5. Add the DNS records from Vercel
6. Wait up to 24h for DNS propagation (usually much faster)

**HTTPS/SSL:** Vercel handles this automatically. No extra steps.

---

## 🎨 Customising the Design

All design tokens are at the top of `style.css` inside `:root {}`:

```css
:root {
  --gold:     #C9A84C;   /* Main accent colour — change for brand */
  --bg:       #090909;   /* Page background */
  --ink:      #F2EDE6;   /* Primary text */
  --ff-display: 'Cormorant Garamond', Georgia, serif;  /* Headings */
  --ff-body:    'DM Sans', system-ui, sans-serif;      /* Body text */
}
```

To change fonts:
1. Replace the Google Fonts `<link>` in each HTML file's `<head>`
2. Update `--ff-display` and `--ff-body` in `:root`

---

## 🖼️ Adding Real Images

The site uses Unsplash URLs. To use your own images:

1. Put your files in the `/images/` folder
2. Replace URLs in HTML like this:

```html
<!-- Before (Unsplash URL): -->
<img src="https://images.unsplash.com/photo-...?w=700&q=80" alt="description"/>

<!-- After (your own image): -->
<img src="images/your-photo.jpg" alt="description"/>
```

**Recommended sizes:**
| Use | Dimensions |
|---|---|
| Hero card | 800 × 500 px |
| Featured article (large) | 1200 × 700 px |
| Featured article (small) | 700 × 420 px |
| Blog card thumbnail | 700 × 420 px |
| Team member avatar | 200 × 200 px |
| About page image | 900 × 700 px |

**Free image sources:** [Unsplash](https://unsplash.com) · [Pexels](https://pexels.com) · [StockSnap](https://stocksnap.io)

---

## 📧 Connecting a Real Newsletter Service

The newsletter form currently shows a success state but doesn't send emails. To connect a real service:

**Recommended for editorial blogs:**
- **[Beehiiv](https://beehiiv.com)** — built for newsletters, excellent analytics
- **[ConvertKit](https://convertkit.com)** — favourite of creators and writers
- **[Mailchimp](https://mailchimp.com)** — most widely used, free up to 500 contacts
- **[Buttondown](https://buttondown.email)** — minimalist, writer-focused

**Quick Mailchimp integration:**
1. Create your audience in Mailchimp
2. Go to Audience → Signup forms → Embedded forms
3. Copy the `action` URL from their form code
4. In `script.js`, replace the `setTimeout` in `setupNlForm` with a `fetch` POST to that URL

---

## 📬 Connecting the Contact Form

The contact form shows a success state but doesn't send emails. Use [Formspree](https://formspree.io) — free, no backend needed:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — you get an endpoint like `https://formspree.io/f/XXXXXXXX`
3. In `contact.html`, change the `<form>` tag:
```html
<!-- Change this: -->
<form class="cf" id="cfForm">

<!-- To this: -->
<form class="cf" id="cfForm" action="https://formspree.io/f/YOUR-ID" method="POST">
```
4. Remove the `e.preventDefault()` from the contact form handler in `script.js`

---

## 🔍 SEO Checklist

Before going live, update these in every HTML file:
- [ ] `<title>` tag (each page should have a unique title)
- [ ] `<meta name="description">` (under 160 characters, unique per page)
- [ ] `<meta property="og:image">` (use a real 1200×630 image URL)
- [ ] Add `<link rel="canonical" href="https://yourdomain.com/page.html">` to each page
- [ ] Add a `favicon.ico` to the root folder and link it in `<head>`:
  ```html
  <link rel="icon" type="image/x-icon" href="images/favicon.ico"/>
  ```

---

## 🚀 Pre-Launch Checklist

- [ ] Replace all Unsplash images with your own or licensed images
- [ ] Update all author names, bios, and photos
- [ ] Update meta titles, descriptions, and OG images
- [ ] Connect newsletter to a real service (Beehiiv / ConvertKit / Mailchimp)
- [ ] Connect contact form to Formspree or similar
- [ ] Add your real social media URLs (search for `href="#"` in the footer)
- [ ] Add a favicon
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Test all forms
- [ ] Connect your domain on Vercel
- [ ] Add Google Analytics (optional — add GA4 script before `</body>`)

---

## 🆘 Troubleshooting

| Problem | Solution |
|---|---|
| Styles not loading on inner pages | Check the `<link>` path is `href="style.css"` (all files are in root) |
| Images not showing | Check image URLs — Unsplash URLs need an internet connection |
| Font looks wrong | Needs internet connection for Google Fonts to load |
| Git push rejected | Run `git pull origin main --rebase` then push again |
| Vercel shows old version | Check the Deployments tab in Vercel dashboard for build errors |
| Mobile menu not closing | Make sure `script.js` is loaded — check browser console for errors |

---

Built with purpose. © 2024 Money and Meaning.
