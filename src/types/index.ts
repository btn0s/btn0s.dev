export enum EntryType {
  WORK = "WORK",
  NOTES = "NOTES",
  LAB = "LAB",
}

export interface BaseEntryMetadata {
  title: string;
  description: string;
  published: boolean;
  image: string;
  tags: string[];
  company: string;
}

export interface BaseEntry {
  slug: string;
  type: EntryType;
  meta: BaseEntryMetadata;
}
