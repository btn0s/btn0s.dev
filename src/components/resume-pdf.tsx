import { Document, Page, Text, View, Font, Link } from "@react-pdf/renderer";
import { GeistSans } from "geist/font/sans";
import { createTw } from "react-pdf-tailwind";

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
  <Text style={tw("text-sm mb-2 text-zinc-300")}>• {children}</Text>
);

export const ResumePDF = () => (
  <Document>
    <Page size="A4" style={tw("p-10 bg-zinc-900")}>
      {/* Header */}
      <View style={tw("mb-8 pb-5 border-b border-zinc-800")}>
        <Text style={tw("text-3xl mb-0 font-bold text-white")}>
          Brendan T. Norris
        </Text>
        <Text style={tw("text-base mb-2 mt-0 pt-0 text-zinc-400")}>
          Senior Design Engineer
        </Text>
        <Text style={tw("text-sm text-zinc-500")}>
          Remote (Phoenix) //{" "}
          <Link style={tw("text-zinc-500")} src="https://btn0s.dev">
            btn0s.dev
          </Link>
        </Text>
      </View>

      {/* Summary */}
      <Section>
        <SectionHeader>Summary</SectionHeader>
        <Text style={tw("text-sm text-zinc-300 leading-relaxed")}>
          Design Engineer specializing in rapid validation and internal tooling.
          I build systems that help teams work better together, from Figma
          plugins to staging environments. My focus is on strengthening product
          direction through early prototyping and creating infrastructure that
          makes both designers and developers more effective.
        </Text>
      </Section>

      {/* Experience */}
      <Section>
        <SectionHeader>Experience</SectionHeader>

        {/* Backbone */}
        <View style={tw("mb-6")}>
          <JobHeader company="Backbone" period="2021 - Present" />

          {/* Current Role */}
          <View style={tw("mb-4")}>
            <JobTitle title="Senior Design Engineer, Labs" />
            <Text style={tw("text-sm text-zinc-500 mb-2")}>2023 - Present</Text>
            <BulletList>
              <BulletPoint>
                Founded and led Backbone Labs, the company's first Design
                Engineering team, operating as an independent unit to rapidly
                validate and ship focused, high-impact projects.
              </BulletPoint>
              <BulletPoint>
                Transformed internal workflows through strategic UX
                improvements: built a Figma plugin reducing design handoff time
                by 80% and implemented staging environments to increase shipping
                confidence.
              </BulletPoint>
              <BulletPoint>
                Operated as an autonomous unit taking on experimental
                initiatives from concept to production, while maintaining and
                improving developer tooling across the organization.
              </BulletPoint>
            </BulletList>
          </View>

          {/* Previous Role */}
          <View>
            <JobTitle title="Senior Frontend Engineer, Web" />
            <Text style={tw("text-sm text-zinc-500 mb-2")}>2021 - 2023</Text>
            <BulletList>
              <BulletPoint>
                Architected and led development of Backbone's global ecommerce
                platform using Next.js and headless Shopify, scaling from
                startup to worldwide brand.
              </BulletPoint>
              <BulletPoint>
                Built a dynamic game discovery system generating hundreds of
                SEO-optimized landing pages, increasing organic traffic by 30%
                and improving conversion rates.
              </BulletPoint>
              <BulletPoint>
                Implemented a custom cart system with intelligent upsells and
                localization support, driving a 20% increase in average order
                value.
              </BulletPoint>
            </BulletList>
          </View>
        </View>

        {/* American Express */}
        <View style={tw("mb-6")}>
          <JobHeader company="American Express" period="2020 - 2021" />
          <JobTitle title="SWE II" />
          <BulletList>
            <BulletPoint>
              Architected TimeMachine, a bi-directional bridge system enabling
              incremental React adoption while maintaining 99.9% platform
              reliability for millions of daily customer interactions.
            </BulletPoint>
            <BulletPoint>
              Led successful launch of new travel vertical, expanding operations
              to 300+ specialized agents while delivering continuous feature
              improvements.
            </BulletPoint>
            <BulletPoint>
              Established technical patterns for legacy modernization that
              enabled teams to build new features in React without disrupting
              existing Angular systems.
            </BulletPoint>
          </BulletList>
        </View>

        {/* Earlier Experience */}
        <View>
          <Text style={tw("text-base font-bold text-white mb-2")}>
            Earlier Experience
          </Text>
          <BulletList>
            <BulletPoint>
              <Text style={tw("text-white font-bold")}>Product Designer</Text>{" "}
              at Sobol (2019-2020)
            </BulletPoint>
            <BulletPoint>
              <Text style={tw("text-white font-bold")}>Frontend Engineer</Text>{" "}
              at Hownd (2018-2019)
            </BulletPoint>
            <BulletPoint>
              <Text style={tw("text-white font-bold")}>UI/UX Designer</Text> at
              Yandy (2017-2018)
            </BulletPoint>
          </BulletList>
        </View>
      </Section>

      {/* Current Projects */}
      <Section>
        <SectionHeader>Current Projects</SectionHeader>
        <BulletList>
          <BulletPoint>
            <Text style={tw("text-white font-bold")}>Strella</Text> - an IDE
            built by design technologists, for design technologists.
          </BulletPoint>
          <BulletPoint>
            <Text style={tw("text-white font-bold")}>thinkhuman.co</Text> -
            Independent design studio focused on rapid validation and
            design-driven development.
          </BulletPoint>
        </BulletList>
      </Section>

      {/* Skills */}
      <Section className="mb-0">
        <SectionHeader>Skills & Expertise</SectionHeader>
        <BulletList>
          <BulletPoint>
            <Text style={tw("text-white font-bold")}>Design Engineering: </Text>
            Internal Tooling, Design Systems, Rapid Prototyping, Workflow
            Optimization
          </BulletPoint>
          <BulletPoint>
            <Text style={tw("text-white font-bold")}>Development: </Text>
            React, TypeScript, Figma Plugin Development, Platform Architecture
          </BulletPoint>
          <BulletPoint>
            <Text style={tw("text-white font-bold")}>Leadership: </Text>
            Team Enablement, Process Design, Technical Strategy, Rapid
            Validation
          </BulletPoint>
        </BulletList>
      </Section>
    </Page>
  </Document>
);
