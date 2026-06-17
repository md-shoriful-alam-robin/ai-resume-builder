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
};

// ২. এখানে আলাদা আইডি দিয়ে Bachelor এবং Masters দুটি শিক্ষাগত যোগ্যতাই যুক্ত করা হয়েছে
const defaultSections = [
  {
    id: 1,
    type: "experience",
    title: "Work Experience",
    data: {
      expTitle: "Business Analyst",
      expCompany: "Freelance (Fiverr)",
      expFrom: "Jan 2024",
      expTo: "Present",
      expDesc:
        "Delivered Power BI dashboards and full-stack web projects to clients, built React and Node.js applications, analyzed datasets using SQL and Python",
      expPolished: "",
    },
  },
  {
    id: 2,
    type: "education",
    title: "Education (Bachelor)",
    data: {
      degree: "Bachelor of Business Administration – Accounting",
      university: "National University",
      gradYear: "Nov 2018",
      cgpa: "2.90/4.0",
    },
  },
  {
    id: 3,
    type: "education",
    title: "Education (Masters)",
    data: {
      degree: "Masters of Business Administration – Accounting",
      university: "National University",
      gradYear: "Feb 2020",
      cgpa: "2.97/4.0",
    },
  },
  {
    id: 4,
    type: "skills",
    title: "Skills",
    data: {},
  },
];

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
  const [sections, setSections] = useState(defaultSections);
  const [formData, setFormData] = useState(defaultFormData);
  const [skills, setSkills] = useState(defaultSkills);
  const [resumeBuilt, setResumeBuilt] = useState(true);

  // প্রথমবার লোড হওয়ার সময়ও যেন সিভিতে সেকশনগুলো দেখায়, তাই sections যুক্ত করা হয়েছে
  const [snapshot, setSnapshot] = useState({
    ...defaultFormData,
    skills: defaultSkills,
    sections: defaultSections,
  });

  const updateSectionData = (sectionId, field, value) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? { ...sec, data: { ...sec.data, [field]: value } }
          : sec,
      ),
    );
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildResume = () => {
    setSnapshot({ ...formData, skills, sections });
    setResumeBuilt(true);
  };

  const clearAll = () => {
    setSections(defaultSections);
    setFormData(defaultFormData);
    setSkills(defaultSkills);
    setResumeBuilt(false);
    setSnapshot({
      ...defaultFormData,
      sections: defaultSections,
      skills: defaultSkills,
    });
  };

  const moveSection = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setSections(newSections);
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
          clearAll={clearAll}
          sections={sections}
          setSections={setSections}
          updateSectionData={updateSectionData}
          moveSection={moveSection}
        />
        <ResumePreview data={snapshot} isBuilt={resumeBuilt} />
      </main>
    </div>
  );
}
