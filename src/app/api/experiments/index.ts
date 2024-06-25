import { getSlugsByDir } from "@/app/api/shared";
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

export const getExperiments: () => Promise<Experiment[]> = async () => {
  const experimentSlugs = await getSlugsByDir(
    EXPERIMENTS_CONTENT_DIRECTORY,
    FOLDER_EXCLUDES,
  );

  const experiments = await Promise.all(
    experimentSlugs.map(async (filePath) => {
      const content = await import(`@/content/experiments/${filePath}.mdx`);
      return { meta: content.meta, slug: filePath };
    }),
  );

  return experiments.filter((experiment) => experiment.meta.published);
};
