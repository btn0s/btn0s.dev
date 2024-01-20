import { promises as fs } from "fs";

export async function getSlugsByDir(
  dir: string,
  excludes: string[],
): Promise<string[]> {
  const dirs: string[] = await fs.readdir(dir);
  const cleanDirs = dirs.map((dir) => dir.replace(".mdx", ""));
  return cleanDirs.filter((dir) => !excludes.includes(dir));
}
