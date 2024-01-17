import { promises as fs } from "fs";

const EXPERIMENTS_DIRECTORY = "./src/app/experiments";

export interface ExperimentMetadata {
  title: string;
  description: string;
  date: string;
  image: string;
  published: boolean;
}

export interface Experiment {
  slug: string;
  metadata: ExperimentMetadata;
}

async function getExperimentSlugs(): Promise<string[]> {
  const dirs: string[] = await fs.readdir(EXPERIMENTS_DIRECTORY);
  return dirs.filter((dir) => dir !== "page.tsx");
}

export const getExperiments: () => Promise<Experiment[]> = async () => {
  const experimentSlugs = await getExperimentSlugs();

  const experiments = await Promise.all(
    experimentSlugs.map(async (filePath) => {
      const content = await import(`@/app/experiments/${filePath}/page.mdx`);
      return { ...content, slug: filePath };
    }),
  );
  return experiments.filter((experiment) => experiment.metadata.published);
};
