# AI Resume Builder

An AI-powered Resume Builder built with React and Google Gemini AI. Generate professional summaries and polish work experience descriptions using Gemini (completely FREE!).

## Features

- Fill in personal info, experience, education, and skills
- Generate professional summary with Gemini AI (FREE!)
- Polish work experience bullet points with AI
- Live resume preview
- Download as HTML file

## Tech Stack

- React 18
- Google Gemini API (FREE - no credit card needed!)
- CSS Modules

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/md-shoriful-alam-robin/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your FREE Gemini API key

**No credit card needed!** 🎉

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Create `.env` file in your project:

```bash
notepad .env
```

5. Add this line:

```
REACT_APP_GEMINI_API_KEY=your_free_api_key_here
```

Replace with your actual key and save.

### 4. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── App.jsx              # Root component, state management
├── App.css              # App layout styles
├── index.js             # Entry point
├── index.css            # Global styles & CSS variables
├── components/
│   ├── Sidebar.jsx      # Form inputs + AI generation
│   ├── Sidebar.css
│   ├── ResumePreview.jsx  # Resume preview + download
│   └── ResumePreview.css
└── utils/
    └── geminiApi.js     # Google Gemini API helper
```

## Pricing

**Completely FREE!** Google Gemini offers free API access with generous usage limits.

## Author

**MD Shoriful Alam Robin**  
Full Stack Developer & Data Analyst  
[www.shorifulrobin.me](https://www.shorifulrobin.me) | [Fiverr](https://www.fiverr.com/typical_robin)
