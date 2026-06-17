import React, { useState } from 'react';
import './Sidebar.css';
import { callGemini } from '../utils/geminiApi';

export default function Sidebar({ formData, skills, setSkills, updateField, buildResume }) {
  const [skillInput, setSkillInput] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [expLoading, setExpLoading] = useState(false);

  const addSkill = () => {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills(prev => [...prev, val]);
    }
    setSkillInput('');
  };

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const generateSummary = async () => {
    if (!formData.summaryContext) return;
    setSummaryLoading(true);
    try {
      const text = await callGemini(
        `Write a concise, professional 3-sentence CV summary for ${formData.name || 'this person'}.
Context: ${formData.summaryContext}
Skills: ${skills.join(', ')}
Rules: Write in third person, active voice, no buzzwords. Output only the summary text, nothing else.`
      );
      updateField('summary', text);
    } catch (e) {
      alert('Error generating summary. Make sure you have REACT_APP_GEMINI_API_KEY in .env file');
    }
    setSummaryLoading(false);
  };

  const generateExpDesc = async () => {
    if (!formData.expDesc) return;
    setExpLoading(true);
    try {
      const text = await callGemini(
        `Rewrite this work experience for a CV as 3 bullet points starting with strong action verbs.
Role: ${formData.expTitle} at ${formData.expCompany}
Description: ${formData.expDesc}
Format: • Point 1\n• Point 2\n• Point 3
Output only the bullet points, nothing else.`
      );
      updateField('expPolished', text);
    } catch (e) {
      alert('Error polishing experience. Make sure you have REACT_APP_GEMINI_API_KEY in .env file');
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
            <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="Your full name" />
          </div>
          <div className="field">
            <label>Job title</label>
            <input type="text" value={formData.jobTitle} onChange={e => updateField('jobTitle', e.target.value)} placeholder="Full Stack Developer & Data Analyst" />
          </div>
          <div className="row">
            <div className="field">
              <label>Email</label>
              <input type="text" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="email@example.com" />
            </div>
            <div className="field">
              <label>Phone</label>
              <input type="text" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+880 ..." />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Website</label>
              <input type="text" value={formData.website} onChange={e => updateField('website', e.target.value)} placeholder="yoursite.com" />
            </div>
            <div className="field">
              <label>Location</label>
              <input type="text" value={formData.location} onChange={e => updateField('location', e.target.value)} placeholder="Dhaka, Bangladesh" />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>GitHub</label>
              <input type="text" value={formData.github} onChange={e => updateField('github', e.target.value)} placeholder="github.com/username" />
            </div>
            <div className="field">
              <label>LinkedIn</label>
              <input type="text" value={formData.linkedin} onChange={e => updateField('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
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
              onChange={e => updateField('summaryContext', e.target.value)}
              placeholder="e.g. full-time job in Bangladesh, freelance Power BI on Fiverr..."
              rows={3}
            />
          </div>
          <button className="ai-btn" onClick={generateSummary} disabled={summaryLoading}>
            {summaryLoading
              ? <><span className="spinner"></span> Generating...</>
              : <><i className="ti ti-sparkles" aria-hidden="true"></i> Generate with AI</>
            }
          </button>
          {formData.summary && (
            <div className="ai-output">
              <span className="ai-label">AI generated</span>
              <p>{formData.summary}</p>
              <button className="edit-btn" onClick={() => updateField('summary', '')}>
                <i className="ti ti-x" aria-hidden="true"></i> Clear
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Experience */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">3</div>
            <span className="step-title">Work experience</span>
          </div>
          <div className="row">
            <div className="field">
              <label>Job title</label>
              <input type="text" value={formData.expTitle} onChange={e => updateField('expTitle', e.target.value)} placeholder="Business Analyst" />
            </div>
            <div className="field">
              <label>Company</label>
              <input type="text" value={formData.expCompany} onChange={e => updateField('expCompany', e.target.value)} placeholder="Company name" />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>From</label>
              <input type="text" value={formData.expFrom} onChange={e => updateField('expFrom', e.target.value)} placeholder="Jan 2024" />
            </div>
            <div className="field">
              <label>To</label>
              <input type="text" value={formData.expTo} onChange={e => updateField('expTo', e.target.value)} placeholder="Present" />
            </div>
          </div>
          <div className="field">
            <label>What did you do?</label>
            <textarea
              value={formData.expDesc}
              onChange={e => updateField('expDesc', e.target.value)}
              placeholder="Describe your responsibilities..."
              rows={3}
            />
          </div>
          <button className="ai-btn" onClick={generateExpDesc} disabled={expLoading}>
            {expLoading
              ? <><span className="spinner"></span> Polishing...</>
              : <><i className="ti ti-sparkles" aria-hidden="true"></i> Polish with AI</>
            }
          </button>
          {formData.expPolished && (
            <div className="ai-output">
              <span className="ai-label">AI generated</span>
              <p style={{ whiteSpace: 'pre-line' }}>{formData.expPolished}</p>
              <button className="edit-btn" onClick={() => updateField('expPolished', '')}>
                <i className="ti ti-x" aria-hidden="true"></i> Clear
              </button>
            </div>
          )}
        </div>

        {/* Section 4: Education */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">4</div>
            <span className="step-title">Education</span>
          </div>
          <div className="field">
            <label>Degree</label>
            <input type="text" value={formData.degree} onChange={e => updateField('degree', e.target.value)} placeholder="Bachelor of Business Administration" />
          </div>
          <div className="field">
            <label>University</label>
            <input type="text" value={formData.university} onChange={e => updateField('university', e.target.value)} placeholder="National University" />
          </div>
          <div className="row">
            <div className="field">
              <label>Graduation year</label>
              <input type="text" value={formData.gradYear} onChange={e => updateField('gradYear', e.target.value)} placeholder="Feb 2020" />
            </div>
            <div className="field">
              <label>CGPA</label>
              <input type="text" value={formData.cgpa} onChange={e => updateField('cgpa', e.target.value)} placeholder="3.97/4.0" />
            </div>
          </div>
        </div>

        {/* Section 5: Skills */}
        <div className="section-card">
          <div className="step-header">
            <div className="step-badge">5</div>
            <span className="step-title">Skills</span>
          </div>
          <div className="skill-input-row">
            <input
              type="text"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
              placeholder="Add a skill..."
            />
            <button className="add-btn" onClick={addSkill}>Add</button>
          </div>
          <div className="skill-tags">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill}
                <button onClick={() => removeSkill(i)} aria-label={`Remove ${skill}`}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Build Button */}
        <button className="build-btn" onClick={buildResume}>
          <i className="ti ti-file-cv" aria-hidden="true"></i>
          Build resume
        </button>

      </div>
    </aside>
  );
}
