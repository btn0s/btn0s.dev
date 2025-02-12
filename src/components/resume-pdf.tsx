import { Document, Page, Text, View, Font, Link } from "@react-pdf/renderer";
import { GeistSans } from "geist/font/sans";
import { createTw } from "react-pdf-tailwind";

import { resumeData } from "@/content/resume";

import twConfig from "../../tailwind.config";

// Register Geist font family
Font.register({
  family: "Geist",
  fonts: [
    {
      src: GeistSans.style.fontFamily,
      fontWeight: 400,
    },
    {
      src: GeistSans.style.fontFamily,
      fontWeight: 700,
    },
  ],
});

// Create a Tailwind theme using our shared configuration
const tw = createTw(twConfig);

// Reusable Components
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={tw("text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3")}
  >
    {children}
  </Text>
);

const JobHeader = ({
  company,
  period,
}: {
  company: string;
  period: string;
}) => (
  <View style={tw("flex flex-row justify-between")}>
    <Text style={tw("text-base font-bold text-white")}>{company}</Text>
    <Text style={tw("text-sm text-zinc-500")}>{period}</Text>
  </View>
);

const JobTitle = ({
  title,
  location,
}: {
  title: string;
  location?: string;
}) => (
  <Text style={tw("text-sm font-bold text-zinc-400")}>
    {title}
    {location ? ` • ${location}` : ""}
  </Text>
);

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <View style={tw(`mb-8 ${className}`)}>{children}</View>;

const BulletList = ({ children }: { children: React.ReactNode }) => (
  <View style={tw("mt-2")}>{children}</View>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <Text style={tw("text-sm mb-2 text-zinc-300 leading-relaxed")}>
    • {children}
  </Text>
);

export const ResumePDF = () => (
  <Document>
    <Page size="A4" style={tw("p-10 bg-zinc-900")}>
      {/* Header */}
      <View style={tw("mb-8 pb-5 border-b border-zinc-800")}>
        <Text style={tw("text-2xl font-bold text-white")}>
          {resumeData.name}
        </Text>
        <Text style={tw("text-base mb-0 mt-0 pt-0 text-zinc-400")}>
          {resumeData.title}
        </Text>
        <Text style={tw("text-sm text-zinc-500")}>
          {resumeData.contact.location} •{" "}
          <Link
            style={tw("text-zinc-500")}
            src={`https://${resumeData.contact.website}`}
          >
            {resumeData.contact.website}
          </Link>
        </Text>
      </View>

      {/* Summary */}
      <Section>
        <SectionHeader>Summary</SectionHeader>
        <Text style={tw("text-sm text-zinc-300 leading-relaxed")}>
          {resumeData.summary}
        </Text>
      </Section>

      {/* Experience */}
      <Section>
        <SectionHeader>Experience</SectionHeader>

        {resumeData.experience.map((job) => (
          <View key={`${job.company}-${job.period}`} style={tw("mb-6")}>
            <JobHeader company={job.company} period={job.period} />

            {job.roles.map((role) => (
              <View key={`${role.title}-${role.period}`} style={tw("mb-4")}>
                <JobTitle title={role.title} />
                <Text style={tw("text-sm text-zinc-500 mb-2")}>
                  {role.period}
                </Text>
                <BulletList>
                  {role.achievements.map((achievement, i) => (
                    <BulletPoint key={i}>{achievement}</BulletPoint>
                  ))}
                </BulletList>
              </View>
            ))}
          </View>
        ))}
      </Section>

      {/* Previous Experience */}
      <Section>
        <Text style={tw("text-base font-bold text-white mb-2")}>
          Earlier Experience
        </Text>
        <BulletList>
          {resumeData.previousRoles.map((role, i) => (
            <BulletPoint key={i}>
              <Text style={tw("text-white font-bold")}>{role.title}</Text> at{" "}
              {role.company} ({role.period})
            </BulletPoint>
          ))}
        </BulletList>
      </Section>

      {/* Current Projects */}
      <Section>
        <SectionHeader>Current Projects</SectionHeader>
        <BulletList>
          {resumeData.currentProjects.map((project, i) => (
            <BulletPoint key={i}>
              <Text style={tw("text-white font-bold")}>{project.title}</Text> -{" "}
              {project.description}
            </BulletPoint>
          ))}
        </BulletList>
      </Section>

      {/* Skills */}
      <Section className="mb-0">
        <SectionHeader>Skills & Expertise</SectionHeader>
        <BulletList>
          {resumeData.skills.map((skill, i) => (
            <BulletPoint key={i}>
              <Text style={tw("text-white font-bold")}>{skill.category}: </Text>
              {skill.items.join(", ")}
            </BulletPoint>
          ))}
        </BulletList>
      </Section>
    </Page>
  </Document>
);
