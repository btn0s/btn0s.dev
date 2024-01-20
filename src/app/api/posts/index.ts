import { getSlugsByDir } from "@/app/api/shared";
import { FOLDER_EXCLUDES } from "@/constants/api";

const POSTS_DIRECTORY = "./src/content/posts";

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  image: string;
  published: boolean;
}

interface Post {
  meta: PostMeta;
  slug: string;
}

export const getPosts: () => Promise<Post[]> = async () => {
  const postSlugs = await getSlugsByDir(POSTS_DIRECTORY, FOLDER_EXCLUDES);

  const posts: Post[] = await Promise.all(
    postSlugs.map(async (filePath) => {
      const content = await import(`@/app/posts/${filePath}/page.mdx`);
      return { ...content, slug: filePath };
    }),
  );

  return posts.filter((post) => post.meta.published);
};
