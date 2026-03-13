# Tanvir Visuals Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer Motion-12.6-ff0069?style=for-the-badge" alt="Framer Motion">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=github-actions" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/cPanel-FF6C2F?style=for-the-badge&logo=cpanel" alt="cPanel">
</p>

<p align="center">
  A stunning, high-performance portfolio website showcasing creative design work with smooth animations and modern aesthetics.
</p>

---

## ✨ Features

- 🎨 **Modern UI/UX** — Clean, visually stunning design with fluid animations
- 🚀 **High Performance** — Optimized Next.js build with standalone deployment
- 📱 **Fully Responsive** — Seamless experience across all devices
- 🎬 **Video Gallery** — Cloudflare R2 powered video content delivery
- ✉️ **Contact Form** — Functional contact form with Resend email API
- 🔍 **SEO Optimized** — Sitemap generation and metadata optimization
- ⚡ **Automatic Deployments** — GitHub Actions powered CI/CD to cPanel

---

## 🖥️ Live Demo

<div align="center">

### **[tanvirvisuals.com](https://tanvirvisuals.com)**

</div>

---

## 🛠️ Tech Stack

| Category       | Technology                   |
| -------------- | ---------------------------- |
| **Framework**  | Next.js 15                   |
| **Language**   | TypeScript                   |
| **Styling**    | Tailwind CSS                 |
| **Animations** | Framer Motion                |
| **Forms**      | React Hook Form + Zod        |
| **Email**      | Resend API                   |
| **Storage**    | Cloudflare R2                |
| **Deployment** | GitHub Actions → cPanel      |
| **Hosting**    | cPanel (Node.js Application) |

---

## 🚀 Deployment Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Push     │───▶│   Build     │───▶│   Upload    │───▶│   Deploy    │
│  to Main    │    │  Next.js    │    │  via FTP    │    │  cPanel     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

Every push to the `main` branch automatically:

1. ✅ Checks out the code
2. ✅ Installs dependencies
3. ✅ Builds the Next.js application (standalone mode)
4. ✅ Uploads files to cPanel via FTP
5. ✅ Deploys to production

---

## 📦 Installation

### Prerequisites

- Node.js 22+
- npm or yarn
- Git

### Clone & Install

```bash
git clone https://github.com/proffesergio/creative-designer-portfolio.git
cd creative-designer-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Site Configuration
SITE_URL=https://tanvirvisuals.com

# Email (Required for contact form)
RESEND_API_KEY=your_resend_api_key_here

# Video Storage (Cloudflare R2)
NEXT_PUBLIC_VIDEO_BASE_URL=https://pub-xxxxxxxx.r2.dev/videos
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔧 GitHub Actions Setup

### Required Secrets

Configure these in your GitHub repository under **Settings → Secrets and Variables → Actions**:

| Secret               | Description                                      |
| -------------------- | ------------------------------------------------ |
| `CPANEL_HOST`        | FTP server hostname (e.g., `ftp.yourdomain.com`) |
| `CPANEL_USERNAME`    | FTP username                                     |
| `CPANEL_PASSWORD`    | FTP password                                     |
| `CPANEL_REMOTE_PATH` | Deployment directory path                        |
| `VIDEO_BASE_URL`     | Cloudflare R2 public URL with `/videos` suffix   |

### cPanel Configuration

1. **Create Node.js Application**
   - Node.js Version: `22.x`
   - Application Mode: `Production`
   - Application Root: `your-app-folder`
   - Application Startup File: `server.js`

2. **Environment Variables** (in cPanel)
   - `NODE_ENV=production`
   - `HOST=0.0.0.0`
   - `SITE_URL=https://yourdomain.com`
   - `RESEND_API_KEY=your_api_key`
   - `NEXT_PUBLIC_VIDEO_BASE_URL=your_r2_url`

3. **FTP Account**
   - Home Directory: `/home/username/your-app-folder`

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/            # React components
│   ├── lib/                   # Utilities & data
│   └── styles/                # Global styles
├── .env.local                 # Local environment
├── .env.production            # Production environment
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── package.json               # Dependencies
```

---

## 📄 License

This project is for personal use. All rights reserved.

---

## 📧 Contact

For inquiries or collaborations:

- **Email:** [tanvir07@gmail.com](mailto:tanvir07@gmail.com)
- **Website:** [tanvirvisuals.com](https://tanvirvisuals.com)

---

<div align="center">

**Built with ❤️ using Next.js & Tailwind CSS**

</div>
