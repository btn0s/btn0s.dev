"use client";

import { pdf } from "@react-pdf/renderer";

import { ResumePDF } from "@/components/resume-pdf";
import { resumeData } from "@/content/resume";

const ResumePage = () => {
  const handleDownload = async () => {
    const blob = await pdf(<ResumePDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brendan-norris-resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <button
        onClick={handleDownload}
        className="fixed right-4 top-4 z-10 rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        Download PDF
      </button>

      <article className="prose prose-sm prose-invert mx-auto">
        <header className="mb-8 border-b border-zinc-800 pb-5">
          <h1 className="mb-0">{resumeData.name}</h1>
          <p className="mb-0 mt-0">{resumeData.title}</p>
          <p className="mb-0">
            {resumeData.contact.location} •{" "}
            <a href={`https://${resumeData.contact.website}`}>
              {resumeData.contact.website}
            </a>
          </p>
        </header>

        <section className="mb-8">
          <h2>Summary</h2>
          <p>{resumeData.summary}</p>
        </section>

        <section className="mb-8">
          <h2>Experience</h2>
          {resumeData.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="mb-6">
              <header className="flex items-center justify-between">
                <h3 className="m-0">{job.company}</h3>
                <p className="m-0 text-zinc-500">{job.period}</p>
              </header>

              {job.roles.map((role) => (
                <section key={`${role.title}-${role.period}`} className="mb-4">
                  <h4 className="m-0 text-zinc-400">{role.title}</h4>
                  <p className="m-0 mb-2 text-zinc-500">{role.period}</p>
                  <ul>
                    {role.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </article>
          ))}
        </section>

        <section className="mb-8">
          <h3 className="text-white">Earlier Experience</h3>
          <ul>
            {resumeData.previousRoles.map((role, i) => (
              <li key={i}>
                <strong>{role.title}</strong> at {role.company} ({role.period})
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2>Current Projects</h2>
          <ul>
            {resumeData.currentProjects.map((project, i) => (
              <li key={i}>
                <strong>{project.title}</strong> - {project.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Skills & Expertise</h2>
          <ul>
            {resumeData.skills.map((skill, i) => (
              <li key={i}>
                <strong>{skill.category}: </strong>
                {skill.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default ResumePage;
