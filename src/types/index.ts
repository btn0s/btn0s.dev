export enum EntryType {
  WORK = "WORK",
  NOTES = "NOTES",
  LAB = "LAB",
}

export interface EntryMetadata {
  title: string;
  description: string;
  published: boolean;
  image: string;
  tags: string[];
  company: string;
}
