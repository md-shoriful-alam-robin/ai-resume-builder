import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ResumePreview from "./components/ResumePreview";

const defaultFormData = {
  name: "MD SORIFUL ALAM ROBIN",
  jobTitle: "Full Stack Developer & Data Analyst",
  email: "typicalrobin@gmail.com",
  phone: "01710210006",
  website: "www.shorifulrobin.me",
  location: "Wireless Area south, Habiganj, Bangladesh",
  github: "github.com/md-shoriful-alam-robin",
  linkedin: "linkedin.com/in/md-shoriful-alam-robin",
  summaryContext:
    "Full-time job in Bangladesh or international, freelance on Fiverr with Power BI and web dev gigs, strong data analyst skills with Power BI and SQL",
  summary: "",
  expTitle: "Business Analyst",
  expCompany: "Freelance (Fiverr)",
  expFrom: "Jan 2024",
  expTo: "Present",
  expDesc:
    "Delivered Power BI dashboards and full-stack web projects to clients, built React and Node.js applications, analyzed datasets using SQL and Python",
  expPolished: "",
  degree: "Masters of Business Administration – Accounting",
  university: "National University",
  gradYear: "Feb 2020",
  cgpa: "2.97/4.0",
};

const defaultSkills = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "MySQL",
  "Power BI",
  "Python",
  "SQL",
  "HTML/CSS",
  "Fiverr Freelance",
];

export default function App() {
  const [formData, setFormData] = useState(defaultFormData);
  const [skills, setSkills] = useState(defaultSkills);
  const [resumeBuilt, setResumeBuilt] = useState(true);
  const [snapshot, setSnapshot] = useState({
    ...defaultFormData,
    skills: defaultSkills,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildResume = () => {
    setSnapshot({ ...formData, skills });
    setResumeBuilt(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <i className="ti ti-file-cv" aria-hidden="true"></i>
            <span>AI Resume Builder</span>
          </div>
          <span className="header-badge">Powered by Google Gemini</span>
        </div>
      </header>

      <main className="app-main">
        <Sidebar
          formData={formData}
          skills={skills}
          setSkills={setSkills}
          updateField={updateField}
          buildResume={buildResume}
        />
        <ResumePreview data={snapshot} isBuilt={resumeBuilt} />
      </main>
    </div>
  );
}
