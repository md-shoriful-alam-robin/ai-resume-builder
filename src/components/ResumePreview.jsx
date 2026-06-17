import React, { useRef } from "react";
import "./ResumePreview.css";

export default function ResumePreview({ data, isBuilt }) {
  const resumeRef = useRef(null);

  // App.js থেকে আসা snapshot data-র sections চেক করা হচ্ছে
  const sections = data.sections || [
    { id: 1, type: "experience", title: "Work Experience" },
    { id: 2, type: "education", title: "Education" },
    { id: 3, type: "skills", title: "Skills" },
  ];

  const downloadHTML = () => {
    if (!resumeRef.current) return;
    const content = resumeRef.current.innerHTML;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Resume – ${data.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #1a1a1a; background: #fff; }
    .paper { max-width: 760px; margin: 40px auto; padding: 2.5rem; }
    .r-name { font-size: 28px; font-weight: 700; font-family: Georgia, serif; }
    .r-jobtitle { font-size: 14px; color: #555; margin-top: 3px; font-style: italic; }
    .r-contacts { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; font-size: 12px; color: #444; }
    hr { border: none; border-top: 2px solid #111; margin: 14px 0 10px; }
    .r-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #333; margin-bottom: 8px; }
    .r-summary { font-size: 13px; line-height: 1.75; color: #333; }
    .r-exp { margin-bottom: 14px; }
    .r-exp-header { display: flex; justify-content: space-between; }
    .r-exp-title { font-size: 14px; font-weight: 600; }
    .r-exp-date { font-size: 11px; color: #666; }
    .r-exp-company { font-size: 13px; color: #555; font-style: italic; margin-top: 2px; }
    .r-exp-bullets { font-size: 12px; color: #444; margin-top: 6px; padding-left: 16px; line-height: 1.7; }
    .r-skills { display: flex; flex-wrap: wrap; gap: 6px; }
    .r-skill { font-size: 11px; padding: 3px 9px; border: 1px solid #ccc; border-radius: 3px; color: #333; }
  </style>
</head>
<body>
  <div class="paper">${content}</div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `resume-${(data.name || "resume").replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="preview-panel">
      <div className="preview-header">
        <span className="preview-label">
          <i className="ti ti-eye" aria-hidden="true"></i> Live preview
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="download-btn"
            onClick={handlePrint}
            disabled={!isBuilt}
          >
            <i className="ti ti-printer" aria-hidden="true"></i> Print
          </button>
          <button
            className="download-btn"
            onClick={downloadHTML}
            disabled={!isBuilt}
          >
            <i className="ti ti-download" aria-hidden="true"></i> Download HTML
          </button>
        </div>
      </div>

      {!isBuilt ? (
        <div className="empty-state">
          <i className="ti ti-file-cv" aria-hidden="true"></i>
          <p>
            Fill in your details and click <strong>Build resume</strong>
          </p>
        </div>
      ) : (
        <div className="paper-wrapper">
          <div className="paper" ref={resumeRef}>
            {/* Header */}
            <div className="r-name">{data.name}</div>
            {data.jobTitle && <div className="r-jobtitle">{data.jobTitle}</div>}
            <div className="r-contacts">
              {data.email && (
                <span>
                  <i className="ti ti-mail" aria-hidden="true"></i> {data.email}
                </span>
              )}
              {data.phone && (
                <span>
                  <i className="ti ti-phone" aria-hidden="true"></i>{" "}
                  {data.phone}
                </span>
              )}
              {data.location && (
                <span>
                  <i className="ti ti-map-pin" aria-hidden="true"></i>{" "}
                  {data.location}
                </span>
              )}
              {data.website && (
                <span>
                  <i className="ti ti-world" aria-hidden="true"></i>{" "}
                  {data.website}
                </span>
              )}
              {data.github && (
                <span>
                  <i className="ti ti-brand-github" aria-hidden="true"></i>{" "}
                  {data.github}
                </span>
              )}
              {data.linkedin && (
                <span>
                  <i className="ti ti-brand-linkedin" aria-hidden="true"></i>{" "}
                  {data.linkedin}
                </span>
              )}
            </div>

            {/* Summary */}
            {(data.summary || data.summaryContext) && (
              <>
                <hr />
                <div className="r-section-title">Summary</div>
                <div className="r-summary">
                  {data.summary || data.summaryContext}
                </div>
              </>
            )}

            {/* Dynamic Sections (এখানে .map শুরু করা হলো) */}
            {sections.map((sec) => (
              <React.Fragment key={sec.id}>
                {/* 1. Experience Type */}
                {sec.type === "experience" &&
                  (sec.data?.expTitle || sec.data?.expCompany) && (
                    <>
                      <hr />
                      <div className="r-section-title">{sec.title}</div>
                      <div className="r-exp">
                        <div className="r-exp-header">
                          <div className="r-exp-title">{sec.data.expTitle}</div>
                          <div className="r-exp-date">
                            {sec.data.expFrom}
                            {sec.data.expTo ? ` – ${sec.data.expTo}` : ""}
                          </div>
                        </div>
                        <div className="r-exp-company">
                          {sec.data.expCompany}
                        </div>
                        <ul className="r-exp-bullets">
                          {(sec.data.expPolished || sec.data.expDesc || "")
                            .split("\n")
                            .filter((l) => l.trim())
                            .map((line, i) => (
                              <li key={i}>{line.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      </div>
                    </>
                  )}

                {/* 2. Education Type */}
                {sec.type === "education" &&
                  (sec.data?.degree || sec.data?.university) && (
                    <>
                      <hr />
                      <div className="r-section-title">{sec.title}</div>
                      <div className="r-exp">
                        <div className="r-exp-header">
                          <div className="r-exp-title">
                            {sec.data.university}
                          </div>
                          <div className="r-exp-date">{sec.data.gradYear}</div>
                        </div>
                        <div className="r-exp-company">{sec.data.degree}</div>
                        {sec.data.cgpa && (
                          <div className="r-exp-meta">
                            CGPA: {sec.data.cgpa}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                {/* 3. Skills Type */}
                {sec.type === "skills" && data.skills?.length > 0 && (
                  <>
                    <hr />
                    <div className="r-section-title">{sec.title}</div>
                    <div className="r-skills">
                      {data.skills.map((s, i) => (
                        <span key={i} className="r-skill">
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* 4. Projects Type */}
                {sec.type === "projects" && (
                  <>
                    <hr />
                    <div className="r-section-title">{sec.title}</div>
                    <div
                      className="r-summary"
                      style={{ color: "#999", fontStyle: "italic" }}
                    >
                      Add your projects here...
                    </div>
                  </>
                )}

                {/* 5. Languages Type */}
                {sec.type === "languages" && (
                  <>
                    <hr />
                    <div className="r-section-title">{sec.title}</div>
                    <div
                      className="r-summary"
                      style={{ color: "#999", fontStyle: "italic" }}
                    >
                      Add your languages here...
                    </div>
                  </>
                )}

                {/* 6. Certifications Type */}
                {sec.type === "certifications" && (
                  <>
                    <hr />
                    <div className="r-section-title">{sec.title}</div>
                    <div
                      className="r-summary"
                      style={{ color: "#999", fontStyle: "italic" }}
                    >
                      Add your certifications here...
                    </div>
                  </>
                )}

                {/* 7. Custom Type */}
                {sec.type === "custom" && (
                  <>
                    <hr />
                    <div className="r-section-title">{sec.title}</div>
                    <div
                      className="r-summary"
                      style={{ color: "#999", fontStyle: "italic" }}
                    >
                      Add your content here...
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
