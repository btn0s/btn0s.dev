export enum EntryType {
  WORK = "work",
  NOTES = "notes",
  LAB = "lab",
}

export interface EntryMetadata {
  title: string;
  description: string;
  image: string;
  tags: string[];
  createdAt: string;
  published: boolean;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Entry {
  type: EntryType;
  slug: string;
  metadata: EntryMetadata;
  content: string;
}
