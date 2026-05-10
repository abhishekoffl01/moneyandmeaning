# Money and Meaning 💰

> A premium dark editorial website for finance, investing, economics, and ideas.

---

## 📁 Project Structure

```
money-and-meaning/
│
├── index.html              ← Homepage
├── style.css               ← Main stylesheet (all homepage styles)
├── script.js               ← Main JavaScript (navbar, animations, forms)
│
├── pages/
│   ├── blog.html           ← Articles listing page
│   ├── about.html          ← About page
│   └── contact.html        ← Contact page
│
├── images/                 ← Put your images here
│   └── (your photos, og-image.jpg, favicon.png, etc.)
│
├── assets/
│   ├── css/
│   │   └── pages.css       ← Styles specific to inner pages
│   └── js/
│       └── pages.js        ← JS for inner pages (filter, contact form)
│
└── README.md               ← This file
```

---

## 🚀 Getting Started (Local Development)

### Step 1 — Open in VS Code
```bash
# If you have VS Code's "code" command installed:
code money-and-meaning

# Or just open VS Code → File → Open Folder → select money-and-meaning/
```

### Step 2 — Preview in browser
Open `index.html` directly in your browser, **or** use the Live Server extension:

1. Install "Live Server" extension in VS Code (search in Extensions panel)
2. Right-click `index.html` → **Open with Live Server**
3. Your site auto-refreshes whenever you save a file ✓

---

## 🐙 GitHub Setup (First Time)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up (free).

### Step 2 — Install Git
Download from [git-scm.com](https://git-scm.com). Follow the installer.

### Step 3 — Configure Git (one-time)
Open a terminal (VS Code has one built in — Terminal → New Terminal):
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Step 4 — Initialize your project as a Git repo
```bash
# In your money-and-meaning/ folder:
git init
git add .
git commit -m "Initial commit: Money and Meaning website"
```

### Step 5 — Create a new repo on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Name it: `money-and-meaning`
3. Leave it **Public** (required for free Vercel)
4. Do NOT add README (you already have one)
5. Click **Create repository**

### Step 6 — Push your code to GitHub
GitHub will show you these commands after you create the repo — copy & paste them:
```bash
git remote add origin https://github.com/YOUR-USERNAME/money-and-meaning.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub.

---

## ⚡ Vercel Deployment (Free Hosting)

### Step 1 — Sign up for Vercel
Go to [vercel.com](https://vercel.com) → **Sign Up with GitHub**

### Step 2 — Import your project
1. Click **Add New → Project**
2. Find `money-and-meaning` in your GitHub repos
3. Click **Import**

### Step 3 — Configure (leave defaults)
- Framework Preset: **Other**
- Root Directory: `./` (leave blank)
- Build Command: (leave blank — no build needed for static sites)
- Output Directory: (leave blank)

### Step 4 — Click Deploy
Vercel will give you a free URL like `money-and-meaning.vercel.app` ✓

### Automatic deploys
Every time you push to GitHub, Vercel auto-deploys. Your workflow:
```bash
# Make changes in VS Code, then:
git add .
git commit -m "Updated hero section"
git push
# → Vercel auto-deploys in ~30 seconds
```

---

## 🌐 Connecting Your Real Domain (Later)

When you're ready to use your own domain (e.g. `moneyandmeaning.com`):

1. Go to your Vercel project → **Settings → Domains**
2. Add your domain name
3. Vercel gives you DNS records to add (usually an `A` record and `CNAME`)
4. Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.)
5. Add the DNS records Vercel provides
6. Wait up to 24 hours for DNS to propagate

Vercel handles **SSL/HTTPS automatically** — no extra setup needed.

---

## 🖼️ Adding Real Images

Replace the placeholder `<div class="img-placeholder">` elements with real `<img>` tags:

```html
<!-- BEFORE (placeholder): -->
<div class="img-placeholder img-placeholder--large">
  <div class="img-icon">🏦</div>
</div>

<!-- AFTER (real image): -->
<img 
  src="../images/your-photo.jpg" 
  alt="Description of the image"
  class="feat-card-img-photo"
  loading="lazy"
/>
```

**Recommended image sources:**
- [Unsplash](https://unsplash.com) — free, high quality
- [Pexels](https://pexels.com) — free
- Your own photos

**Recommended sizes:**
- Hero card: 800×500px
- Featured article: 1200×700px
- Blog card thumbnail: 800×450px

---

## 📧 Connecting a Real Newsletter

Currently the newsletter form shows a success message but doesn't actually send emails.

To connect a real email list, replace the form submit handler in `script.js` with an API call to one of these services (all have free tiers):

- **[ConvertKit](https://convertkit.com)** — great for editorial/blog
- **[Mailchimp](https://mailchimp.com)** — most popular
- **[Buttondown](https://buttondown.email)** — minimal, writer-focused
- **[Beehiiv](https://beehiiv.com)** — excellent for newsletters

Each service provides a simple embed form or API endpoint. Their docs are beginner-friendly.

---

## ✏️ How to Add a New Article

1. Create `pages/article-name.html` (copy structure from `blog.html`)
2. Add your article content inside the page's main `<section>`
3. Add a card linking to it in `pages/blog.html`
4. Add a card to the homepage `index.html` if it's featured

---

## 🎨 Customizing the Design

All colors and fonts live in `style.css` at the top inside `:root {}`:

```css
:root {
  --gold: #D4AF37;        /* Change this for a different accent color */
  --bg:   #0A0A0B;        /* Main background */
  --font-display: 'Libre Baskerville', serif;  /* Headings font */
  --font-body:    'Outfit', sans-serif;        /* Body text font */
}
```

To change fonts, update the Google Fonts `<link>` in your HTML files and update these variables.

---

## 📋 Checklist Before Going Live

- [ ] Replace all placeholder images with real photos
- [ ] Update site title, description, and OG tags in `<head>` of all pages
- [ ] Connect real newsletter service
- [ ] Connect contact form to a real backend (e.g. [Formspree](https://formspree.io) — free & easy)
- [ ] Add `favicon.png` to `images/` and link it in `<head>`
- [ ] Add Google Analytics (optional)
- [ ] Test on mobile phone
- [ ] Connect your domain on Vercel

---

## 🆘 Common Issues

**Site looks broken?**
→ Make sure CSS paths are correct. From `pages/`, use `../style.css`. From root, use `style.css`.

**Git push rejected?**
→ Run `git pull origin main` first, then push again.

**Vercel shows old version?**
→ Vercel deploys automatically on push. Check the Deployments tab on vercel.com to see status.

**Fonts not loading?**
→ You need an internet connection for Google Fonts. They won't load if you open the file offline without a local server.

---

Built with purpose. © 2024 Money and Meaning.
