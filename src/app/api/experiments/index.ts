import { promises as fs } from "fs";

import { FOLDER_EXCLUDES } from "@/constants/api";

const EXPERIMENTS_CONTENT_DIRECTORY = "./src/content/experiments";

export interface ExperimentMeta {
  title: string;
  description: string;
  date: string;
  image: string;
  published: boolean;
}

export interface Experiment {
  slug: string;
  meta: ExperimentMeta;
}

async function getExperimentSlugs(): Promise<string[]> {
  const dirs: string[] = await fs.readdir(EXPERIMENTS_CONTENT_DIRECTORY);
  const cleanDirs = dirs.map((dir) => dir.replace(".mdx", ""));
  return cleanDirs.filter((dir) => !FOLDER_EXCLUDES.includes(dir));
}

export const getExperiments: () => Promise<Experiment[]> = async () => {
  const experimentSlugs = await getExperimentSlugs();

  const experiments = await Promise.all(
    experimentSlugs.map(async (filePath) => {
      const content = await import(`@/content/experiments/${filePath}.mdx`);
      return { ...content, slug: filePath };
    }),
  );

  return experiments.filter((experiment) => experiment.meta.published);
};
