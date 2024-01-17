import { promises as fs } from "fs";

import { load } from "cheerio";
import fetch from "node-fetch";

import { CURRENT_LINKS } from "@/content/current-links";

const METADATA_FILE_PATH = "./src/content/current-links-metadata.ts";

async function fetchHTML(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return "";
  }
}

function extractSEOMetadata(html: string): Record<string, string> {
  const $ = load(html);
  const metadata: Record<string, string> = {};

  metadata["title"] = $("title").text();
  metadata["description"] = $('meta[name="description"]').attr("content") || "";
  metadata["image"] = $('meta[property="og:image"]').attr("content") || "";

  return metadata;
}

type MetadataConfig = { [url: string]: Record<string, string> };

let globalMetadataConfig: MetadataConfig = {};

async function saveMetadata(url: string, metadata: Record<string, string>) {
  globalMetadataConfig[url] = metadata;
}

async function writeMetadataToFile() {
  const content = `export const CURRENT_LINKS_METADATA: { [url: string]: Record<string, string> } = ${JSON.stringify(globalMetadataConfig, null, 2)};`;
  await fs.writeFile(METADATA_FILE_PATH, content);
  console.log(`Metadata saved to ${METADATA_FILE_PATH}`);
}

async function main() {
  const urls = CURRENT_LINKS.map((linkData) => linkData.url);

  for (const url of urls) {
    const html = await fetchHTML(url);
    if (html) {
      const metadata = extractSEOMetadata(html);
      await saveMetadata(url, metadata);
      console.log(`Metadata extracted for ${url}`);
    }
  }

  await writeMetadataToFile();
}

void main();
