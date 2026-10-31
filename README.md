# WORTH Association — Women of Recreation, Tourism & Hospitality

A modern, production-ready website built for **WORTH Association**, a Canadian non-profit society registered in British Columbia (Society No. S0069800). WORTH educates, elevates, and engages women and gender-diverse individuals across recreation, tourism, and hospitality through mentorship, leadership cohorts (WORTH Academy), direct educational scholarships, signature culinary galas (*Yes Shef Vancouver*), and community connection.

---

## 🌟 Client Context & Features

- **Tagline**: *"Educate | Elevate | Engage"*
- **Journey**: `Subscribe → Attend → Learn → Lead → Mentor`
- **Dual Pathways**:
  - **Pathway A**: For women in the industry advancing into management, general management, and ownership.
  - **Pathway B**: For employers, partners, and donors looking to underwrite diverse leadership cohorts and recruit vetted talent.
- **Featured Gala**: **Yes Shef Vancouver** — November 18, 2026 at Fairmont Pacific Rim with live countdown timer.
- **Land Acknowledgement**: WORTH operates on the traditional, ancestral, and unceded territory of the Coast Salish peoples, including the Musqueam, Squamish, and Tsleil-Waututh Nations.

---

## 🎨 Visual Identity & Brand System

- **Signature Palette**:
  - Sunset Orange: `#F2994A`
  - Coral: `#E8907E`
  - Rose: `#EC5F8B`
  - Magenta: `#D6336C`
  - Berry: `#9C1F5A` (deep contrast accent)
  - Cream: `#FDF7F4` (primary canvas)
  - Blush: `#FBE9E4` (section alternate surface)
  - Ink: `#1F1A1C` (body text)
  - Muted: `#6B5E62`
- **Typography**:
  - Headings: `Jost` (geometric, matching WORTH's brand)
  - Editorial Accents: `Fraunces` italic
  - Body Prose: `Inter`
- **Curated Imagery**: All images in `src/data/images.js` use verified Unsplash photography featuring Canadian hospitality, culinary arts, Pacific Northwest landscapes, and women in leadership. Wrapped in `<SmartImage>` with shimmering blush skeletons and gradient fallbacks.

---

## 🛠️ Tech Stack

- **React 18 / 19** with **Vite**
- **React Router v6** (Multi-page client-side routing)
- **Tailwind CSS** (Custom brand tokens and utilities)
- **Framer Motion** (`motion/react`) for fluid transitions, mega menus, wordmark reveal, and modals
- **lucide-react** for accessible iconography
- **canvas-confetti** for donation and application confirmations
- **Vercel Rewrite Configuration** (`vercel.json`) to prevent 404s on page refresh

---

## 🚀 Local Development

1. **Clone & Install Dependencies**:
   ```bash
   git clone <repository-url>
   cd worth-association
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

3. **Verify Production Build**:
   ```bash
   npm run build
   ```

---

## ☁️ Vercel Deployment

This project includes `vercel.json` configured with SPA rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Steps to Deploy to Vercel:

1. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via Vercel Web Dashboard (GitHub / GitLab / Bitbucket)**:
   - Push your code to your Git repository.
   - Import the repository into your Vercel Dashboard.
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**.

---

## 📱 Mobile-First Quality & Responsiveness

- Tested for viewport widths: 360px, 390px, 430px, 768px, 1024px, 1280px, 1536px+.
- Uses `100svh` on hero section for mobile browser navigation bar compensation.
- Mobile bottom sheets for modal forms.
- Hamburger morphs into full-screen gradient overlay menu with 44px+ tap targets.
- Touch-friendly swipeable testimonial slider and interactive step cards.
