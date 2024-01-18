import { promises as fs } from "fs";

import { FOLDER_EXCLUDES } from "@/constants/api";

const POSTS_DIRECTORY = "./src/app/posts";

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  image: string;
  published: boolean;
}

interface Post {
  metadata: PostMetadata;
  slug: string;
}

async function getPostSlugs(): Promise<string[]> {
  const dirs: string[] = await fs.readdir(POSTS_DIRECTORY);
  return dirs.filter((dir) => !FOLDER_EXCLUDES.includes(dir));
}

export const getPosts: () => Promise<Post[]> = async () => {
  const postSlugs = await getPostSlugs();

  const posts: Post[] = await Promise.all(
    postSlugs.map(async (filePath) => {
      const content = await import(`@/app/posts/${filePath}/page.mdx`);
      return { ...content, slug: filePath };
    }),
  );

  return posts.filter((post) => post.metadata.published);
};
