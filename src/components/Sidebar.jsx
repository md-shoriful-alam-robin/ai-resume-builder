import React, { useState } from "react";
import "./Sidebar.css";
import { callGemini } from "../utils/geminiApi";

export default function Sidebar({
  formData,
  skills,
  setSkills,
  updateField,
  buildResume,
  clearAll,
  sections,
  setSections,
  updateSectionData,
  moveSection,
}) {
  const [skillInput, setSkillInput] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [expLoading, setExpLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const addSkill = () => {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) setSkills((prev) => [...prev, val]);
    setSkillInput("");
  };

  const removeSkill = (index) =>
    setSkills((prev) => prev.filter((_, i) => i !== index));

  const generateSummary = async () => {
    if (!formData.summaryContext) return;
    setSummaryLoading(true);
    try {
      const text = await callGemini(
        `Write a concise, professional 3-sentence CV summary for ${formData.name || "this person"}.
Context: ${formData.summaryContext}
Skills: ${skills.join(", ")}
Rules: Write in third person, active voice, no buzzwords. Output only the summary text, nothing else.`,
      );
      updateField("summary", text);
    } catch (e) {
      alert(
        "Error generating summary. Make sure you have REACT_APP_GEMINI_API_KEY in .env file",
      );
    }
    setSummaryLoading(false);
  };

  const generateExpDesc = async (
    secId,
    currentTitle,
    currentCompany,
    currentDesc,
  ) => {
    if (!currentDesc) return;
    setExpLoading(true);
    try {
      const text = await callGemini(
        `Rewrite this work experience for a CV as 3 bullet points starting with strong action verbs.
Role: ${currentTitle} at ${currentCompany}
Description: ${currentDesc}
Format: • Point 1\n• Point 2\n• Point 3
Output only the bullet points, nothing else.`,
      );
      updateSectionData(secId, "expPolished", text);
    } catch (e) {
      alert(
        "Error polishing experience. Make sure you have REACT_APP_GEMINI_API_KEY in .env file",
      );
    }
    setExpLoading(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-scroll">
        {/* Section 1: Personal Info */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">1</div>
            <span className="step-title">Personal info</span>
          </div>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="field">
            <label>Job title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              placeholder="Full Stack Developer & Data Analyst"
            />
          </div>
          <div className="row">
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+880 ..."
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="yoursite.com"
              />
            </div>
            <div className="field">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Dhaka, Bangladesh"
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>GitHub</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => updateField("github", e.target.value)}
                placeholder="github.com/username"
              />
            </div>
            <div className="field">
              <label>LinkedIn</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                placeholder="linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Section 2: Summary */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">2</div>
            <span className="step-title">Professional summary</span>
          </div>
          <div className="field">
            <label>Your goals & focus</label>
            <textarea
              value={formData.summaryContext}
              onChange={(e) => updateField("summaryContext", e.target.value)}
              placeholder="e.g. full-time job in Bangladesh, freelance Power BI on Fiverr..."
              rows={3}
            />
          </div>
          <button
            className="ai-btn"
            onClick={generateSummary}
            disabled={summaryLoading}
          >
            {summaryLoading ? (
              <>
                <span className="spinner"></span> Generating...
              </>
            ) : (
              <>
                <i className="ti ti-sparkles"></i> Generate with AI
              </>
            )}
          </button>
          {formData.summary && (
            <div className="ai-output">
              <span className="ai-label">AI generated</span>
              <p>{formData.summary}</p>
              <button
                className="edit-btn"
                onClick={() => updateField("summary", "")}
              >
                <i className="ti ti-x"></i> Clear
              </button>
            </div>
          )}
        </div>

        {/* Manage Sections — Accordion */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">+</div>
            <span className="step-title">Manage Sections</span>
          </div>

          {sections.map((sec, i) => (
            <div
              key={sec.id}
              style={{
                borderBottom: "1px solid #f3f4f6",
                paddingBottom: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setExpandedSection(expandedSection === sec.id ? null : sec.id)
                }
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  {expandedSection === sec.id ? "▼" : "▶"} {sec.title}
                </span>

                {/* উপরে-নিচে করার বাতন এবং ডিলিট কন্ট্রোল */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => moveSection(i, "up")}
                    disabled={i === 0}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: i === 0 ? "not-allowed" : "pointer",
                      color: i === 0 ? "#ccc" : "#4b5563",
                      fontSize: "14px",
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveSection(i, "down")}
                    disabled={i === sections.length - 1}
                    style={{
                      background: "none",
                      border: "none",
                      cursor:
                        i === sections.length - 1 ? "not-allowed" : "pointer",
                      color: i === sections.length - 1 ? "#ccc" : "#4b5563",
                      fontSize: "14px",
                    }}
                  >
                    ▼
                  </button>
                  <button
                    onClick={() =>
                      setSections((prev) => prev.filter((s) => s.id !== sec.id))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: "18px",
                      marginLeft: "4px",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {expandedSection === sec.id && (
                <div
                  style={{
                    paddingTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* WORK EXPERIENCE FIELDS */}
                  {sec.type === "experience" && (
                    <>
                      <div className="field">
                        <label>Job title</label>
                        <input
                          type="text"
                          value={sec.data?.expTitle || ""}
                          onChange={(e) =>
                            updateSectionData(
                              sec.id,
                              "expTitle",
                              e.target.value,
                            )
                          }
                          placeholder="Business Analyst"
                        />
                      </div>
                      <div className="field">
                        <label>Company</label>
                        <input
                          type="text"
                          value={sec.data?.expCompany || ""}
                          onChange={(e) =>
                            updateSectionData(
                              sec.id,
                              "expCompany",
                              e.target.value,
                            )
                          }
                          placeholder="Company name"
                        />
                      </div>
                      <div className="row">
                        <div className="field">
                          <label>From</label>
                          <input
                            type="text"
                            value={sec.data?.expFrom || ""}
                            onChange={(e) =>
                              updateSectionData(
                                sec.id,
                                "expFrom",
                                e.target.value,
                              )
                            }
                            placeholder="Jan 2024"
                          />
                        </div>
                        <div className="field">
                          <label>To</label>
                          <input
                            type="text"
                            value={sec.data?.expTo || ""}
                            onChange={(e) =>
                              updateSectionData(sec.id, "expTo", e.target.value)
                            }
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label>Description</label>
                        <textarea
                          value={sec.data?.expDesc || ""}
                          onChange={(e) =>
                            updateSectionData(sec.id, "expDesc", e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                      <button
                        className="ai-btn"
                        onClick={() =>
                          generateExpDesc(
                            sec.id,
                            sec.data?.expTitle,
                            sec.data?.expCompany,
                            sec.data?.expDesc,
                          )
                        }
                        disabled={expLoading}
                      >
                        {expLoading ? (
                          <>
                            <span className="spinner"></span> Polishing...
                          </>
                        ) : (
                          <>
                            <i className="ti ti-sparkles"></i> Polish with AI
                          </>
                        )}
                      </button>
                      {sec.data?.expPolished && (
                        <div className="ai-output">
                          <span className="ai-label">AI generated</span>
                          <p style={{ whiteSpace: "pre-line" }}>
                            {sec.data.expPolished}
                          </p>
                          <button
                            className="edit-btn"
                            onClick={() =>
                              updateSectionData(sec.id, "expPolished", "")
                            }
                          >
                            <i className="ti ti-x"></i> Clear
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* EDUCATION FIELDS */}
                  {sec.type === "education" && (
                    <>
                      <div className="field">
                        <label>Degree</label>
                        <input
                          type="text"
                          value={sec.data?.degree || ""}
                          onChange={(e) =>
                            updateSectionData(sec.id, "degree", e.target.value)
                          }
                          placeholder="Bachelor of..."
                        />
                      </div>
                      <div className="field">
                        <label>University</label>
                        <input
                          type="text"
                          value={sec.data?.university || ""}
                          onChange={(e) =>
                            updateSectionData(
                              sec.id,
                              "university",
                              e.target.value,
                            )
                          }
                          placeholder="University name"
                        />
                      </div>
                      <div className="row">
                        <div className="field">
                          <label>Graduation year</label>
                          <input
                            type="text"
                            value={sec.data?.gradYear || ""}
                            onChange={(e) =>
                              updateSectionData(
                                sec.id,
                                "gradYear",
                                e.target.value,
                              )
                            }
                            placeholder="Feb 2020"
                          />
                        </div>
                        <div className="field">
                          <label>CGPA</label>
                          <input
                            type="text"
                            value={sec.data?.cgpa || ""}
                            onChange={(e) =>
                              updateSectionData(sec.id, "cgpa", e.target.value)
                            }
                            placeholder="3.97/4.0"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* SKILLS FIELDS */}
                  {sec.type === "skills" && (
                    <>
                      <div className="skill-input-row">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addSkill()}
                          placeholder="Add a skill..."
                        />
                        <button className="add-btn" onClick={addSkill}>
                          Add
                        </button>
                      </div>
                      <div className="skill-tags">
                        {skills.map((skill, i) => (
                          <span key={i} className="skill-tag">
                            {skill}
                            <button onClick={() => removeSkill(i)}>×</button>
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* PROJECTS, LANGUAGES, CERTIFICATIONS, CUSTOM FIELDS */}
                  {[
                    "projects",
                    "languages",
                    "certifications",
                    "custom",
                  ].includes(sec.type) && (
                    <div className="field">
                      <label>Content</label>
                      <textarea
                        value={sec.data?.customContent || ""}
                        onChange={(e) =>
                          updateSectionData(sec.id, "customContent", e.target.value)
                        }
                        placeholder={`Write your ${sec.title} here...`}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add new section */}
          <div style={{ marginTop: "10px" }}>
            <select
              id="newSectionType"
              style={{
                width: "100%",
                padding: "7px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "7px",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              <option value="experience">Work Experience</option>
              <option value="education">Education</option>
              <option value="skills">Skills</option>
              <option value="projects">Projects</option>
              <option value="languages">Languages</option>
              <option value="certifications">Certifications</option>
              <option value="custom">Custom Section</option>
            </select>
            <input
              type="text"
              id="newSectionTitle"
              placeholder="Section title..."
              style={{
                width: "100%",
                padding: "7px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "7px",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            />
            <button
              className="ai-btn"
              onClick={() => {
                const type = document.getElementById("newSectionType").value;
                const title = document
                  .getElementById("newSectionTitle")
                  .value.trim();
                if (!title) return alert("Title দাও!");
                setSections((prev) => [
                  ...prev,
                  { id: Date.now(), type, title, data: {} },
                ]);
                document.getElementById("newSectionTitle").value = "";
              }}
            >
              <i className="ti ti-plus"></i> Add Section
            </button>
          </div>
        </div>

        {/* Build Button */}
        <button className="build-btn" onClick={buildResume}>
          <i className="ti ti-file-cv"></i> Build resume
        </button>

        {/* Clear Button */}
        <button
          className="build-btn"
          onClick={() => {
            if (window.confirm("Clear all data?")) clearAll();
          }}
          style={{ background: "#ef4444", marginTop: "8px" }}
        >
          <i className="ti ti-trash"></i> Clear All
        </button>
      </div>
    </aside>
  );
}
