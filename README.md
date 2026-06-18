# 🤖 AI Resume Builder

<div align="center">

![AI Resume Builder](https://img.shields.io/badge/AI%20Resume%20Builder-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Powered-4285F4?style=for-the-badge&logo=google)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify)

**A modern, AI-powered resume builder built with React and Google Gemini AI.**  
Generate professional resumes in minutes — no design skills required.

[🚀 Live Demo](https://robin-ai-resume-builder.netlify.app/) • [📂 GitHub](https://github.com/md-shoriful-alam-robin/ai-resume-builder) • [👤 Portfolio](https://www.shorifulrobin.me)

</div>

---

## ✨ Features

- **AI-Powered Content Generation** — Generate professional summaries and bullet points using Google Gemini AI
- **Dynamic Section Management** — Add, remove, and reorder resume sections (Experience, Education, Skills, Projects, Languages, Certifications, and Custom)
- **Live Preview** — See your resume update in real time as you type
- **Print & Download** — Print directly or download as an HTML file
- **Accordion UI** — Clean, collapsible sections for easy editing
- **Fully Responsive** — Works on desktop and mobile
- **No Backend Required** — Runs entirely in the browser

---

## 🖥️ Demo

🔗 **[https://robin-ai-resume-builder.netlify.app/](https://robin-ai-resume-builder.netlify.app/)**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend UI framework |
| **Google Gemini API** | AI content generation (free) |
| **CSS Modules** | Component-scoped styling |
| **Netlify** | Deployment & hosting |
| **Create React App** | Project scaffolding |

---

## 📁 Project Structure

```
ai-resume-builder/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx              # Root component & state management
│   ├── App.css              # Global layout styles
│   ├── index.js             # React entry point
│   ├── index.css            # CSS variables & resets
│   ├── components/
│   │   ├── Sidebar.jsx      # Form inputs & AI generation buttons
│   │   ├── Sidebar.css      # Sidebar styles
│   │   ├── ResumePreview.jsx  # Live resume preview & download
│   │   └── ResumePreview.css  # Resume & print styles
│   └── utils/
│       └── geminiApi.js     # Google Gemini API helper
├── .env.example             # Environment variable template
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm v8+
- A free Google Gemini API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/md-shoriful-alam-robin/ai-resume-builder.git
cd ai-resume-builder

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Configure API Key

Open `.env` and add your free Gemini API key:

```env
REACT_APP_GEMINI_API_KEY=your_free_api_key_here
```

> 🆓 Get a **free** API key at: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — no credit card required!

### Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🌐 Deploy to Netlify

1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable `REACT_APP_GEMINI_API_KEY` in Netlify dashboard
6. Deploy!

---

## 📋 How to Use

1. **Fill in Personal Info** — Name, email, phone, website, GitHub, LinkedIn
2. **Write Your Summary** — Describe your goals, or click **"Generate with AI"** to auto-generate
3. **Manage Sections** — Click **"▶ Work Experience"** to expand and fill in details, or click **"Polish with AI"** for bullet points
4. **Add / Remove Sections** — Use the Manage Sections panel to add Projects, Languages, Certifications, or Custom sections
5. **Build Resume** — Click **"Build resume"** to update the live preview
6. **Print or Download** — Click **"Print"** to save as PDF, or **"Download HTML"** for a portable file

---

## 🔒 Security Note

> ⚠️ This project uses a frontend API key for demonstration purposes.  
> For production use, move API calls to a backend (Node.js/Express) to protect your key.  
> The `.env` file is listed in `.gitignore` and will **never** be committed to GitHub.

---

## 🗺️ Roadmap

- [ ] PDF export (direct download)
- [ ] Multiple resume templates
- [ ] Dark mode
- [ ] Save/load resume from localStorage
- [ ] Multi-language support (Bengali, German, English)
- [ ] AI job description matching

---

## 👨‍💻 About the Developer

<div align="center">

**MD Shoriful Alam Robin**  
Full Stack Developer & Data Analyst  
📍 Bangladesh &nbsp;|&nbsp; 🎯 Open to opportunities internationally

</div>

| Skill Area | Technologies |
|---|---|
| **Frontend** | React, Next.js, JavaScript, HTML/CSS |
| **Backend** | Node.js, Express |
| **Database** | MySQL, SQL |
| **Data & BI** | Power BI, Python, Pandas |
| **Tools** | Git, GitHub, Netlify, VS Code |
| **Languages** | Bengali (native), English (fluent), German (learning — A2) |

### 🔗 Connect with me

[![Portfolio](https://img.shields.io/badge/Portfolio-shorifulrobin.me-blue?style=flat-square&logo=google-chrome)](https://www.shorifulrobin.me)
[![GitHub](https://img.shields.io/badge/GitHub-md--shoriful--alam--robin-181717?style=flat-square&logo=github)](https://github.com/md-shoriful-alam-robin)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-md--shoriful--alam--robin-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/md-shoriful-alam-robin/)
[![Fiverr](https://img.shields.io/badge/Fiverr-typical__robin-1DBF73?style=flat-square&logo=fiverr)](https://www.fiverr.com/typical_robin)
[![Email](https://img.shields.io/badge/Email-typicalrobin@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:typicalrobin@gmail.com)

---

### 🇩🇪 Für deutsche Arbeitgeber / For German Employers

I am actively seeking full-time opportunities in Germany as a **Full Stack Developer** or **Data Analyst**.  
I am currently applying for the **Chancenkarte (Opportunity Card)** visa and am prepared to relocate.

- ✅ Available for remote work immediately
- ✅ Open to relocation to Germany
- ✅ Currently learning German (targeting Goethe-Zertifikat B1)
- ✅ Experienced with international collaboration

> 📩 Feel free to reach out: **typicalrobin@gmail.com**

---

</div>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

Made with ❤️ by [MD Shoriful Alam Robin](https://www.shorifulrobin.me)

</div>
