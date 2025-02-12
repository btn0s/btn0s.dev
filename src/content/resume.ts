interface Job {
  company: string;
  period: string;
  roles: {
    title: string;
    period: string;
    achievements: string[];
  }[];
}

interface PreviousRole {
  title: string;
  company: string;
  period: string;
}

interface Project {
  title: string;
  description: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface ResumeData {
  name: string;
  title: string;
  contact: {
    location: string;
    website: string;
  };
  summary: string;
  experience: Job[];
  previousRoles: PreviousRole[];
  currentProjects: Project[];
  skills: Skill[];
}

export const resumeData: ResumeData = {
  name: "Brendan T. Norris",
  title: "Senior Design Engineer",
  contact: {
    location: "Remote",
    website: "btn0s.dev",
  },
  summary:
    "Design Engineer specializing in rapid validation and product development. I build high-impact systems across the stack, from user interfaces to developer tooling. My focus is on strengthening product direction through early prototyping and creating experiences that empower both users and developers.",
  experience: [
    {
      company: "Backbone",
      period: "2021 - Present",
      roles: [
        {
          title: "Senior Design Engineer, Labs",
          period: "2023 - Present",
          achievements: [
            "Founded and led Backbone Labs, the company's first Design Engineering team, operating as an independent unit to rapidly validate and ship focused, high-impact projects.",
            "Transformed internal workflows through strategic UX improvements: built a Figma plugin reducing design handoff time by 80% and implemented staging environments to increase shipping confidence.",
            "Led 15+ high-impact projects from concept to production, supporting 3 product teams while reducing development cycles by 40% through improved tooling and automated workflows.",
          ],
        },
        {
          title: "Senior Frontend Engineer, Web",
          period: "2021 - 2023",
          achievements: [
            "Architected and led development of Backbone's global ecommerce platform using Next.js and headless Shopify, scaling from startup to worldwide brand.",
            "Built a dynamic game discovery system generating hundreds of SEO-optimized landing pages, increasing organic traffic by 30% and improving conversion rates.",
            "Implemented a custom cart system with intelligent upsells and localization support, driving a 20% increase in average order value.",
          ],
        },
      ],
    },
    {
      company: "American Express",
      period: "2020 - 2021",
      roles: [
        {
          title: "Senior Software Engineer",
          period: "2020 - 2021",
          achievements: [
            "Designed and built TimeMachine, a bi-directional bridge system that enabled incremental React adoption while maintaining 99.9% uptime across millions of daily customer interactions.",
            "Unlocked a new market segment by architecting and shipping the travel vertical launch, expanding operations to 300+ specialized agents with zero downtime.",
            "Established patterns for legacy modernization that enabled continuous feature delivery in React while preserving Angular stability.",
          ],
        },
      ],
    },
  ],
  previousRoles: [
    {
      title: "Product Designer",
      company: "Sobol",
      period: "2019-2020",
    },
    {
      title: "Frontend Engineer",
      company: "Hownd",
      period: "2018-2019",
    },
    {
      title: "UI/UX Designer",
      company: "Yandy",
      period: "2017-2018",
    },
  ],
  currentProjects: [
    {
      title: "Strella",
      description:
        "an IDE built by design technologists, for design technologists.",
    },
    {
      title: "thinkhuman.co",
      description:
        "Independent design studio focused on rapid validation and design-driven development.",
    },
  ],
  skills: [
    {
      category: "Design Engineering",
      items: [
        "UI Development",
        "Design Systems",
        "Rapid Prototyping",
        "User Experience",
      ],
    },
    {
      category: "Development",
      items: ["React", "TypeScript", "Frontend Architecture", "Design Tools"],
    },
    {
      category: "Leadership",
      items: [
        "Team Enablement",
        "Process Design",
        "Technical Strategy",
        "Rapid Validation",
      ],
    },
  ],
};
