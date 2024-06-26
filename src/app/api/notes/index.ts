import { getSlugsByDir } from "@/app/api/shared";
import { FOLDER_EXCLUDES } from "@/types/api";

const NOTES_DIRECTORY = "./src/content/notes";

export interface NoteMeta {
  title: string;
  description: string;
  date: string;
  image: string;
  published: boolean;
}

export interface Note {
  meta: NoteMeta;
  slug: string;
}

export const getNotes: () => Promise<Note[]> = async () => {
  const postSlugs = await getSlugsByDir(NOTES_DIRECTORY, FOLDER_EXCLUDES);

  const posts: Note[] = await Promise.all(
    postSlugs.map(async (filePath) => {
      const content = await import(`@/content/notes/${filePath}.mdx`);
      return { meta: content.meta, slug: filePath };
    }),
  );

  return posts.filter((post) => post.meta.published);
};
