export enum EntryType {
  WORK = "WORK",
  NOTES = "NOTES",
  LAB = "LAB",
}

export interface BaseEntryMetadata {
  title: string;
  description: string;
  image: string;
  tags: string[];
  createdAt: string;
  published: boolean;
  featured?: boolean;
  company?: string;
  roles?: string[];
  startDate?: string;
  endDate?: string;
}

export interface BaseEntry {
  slug: string;
  type: EntryType;
  meta: BaseEntryMetadata;
}
