import { EntryType } from "@/types";

export const TYPE_META_DESCRIPTIONS: Record<EntryType, string> = {
  [EntryType.WORK]: "I've been working on a variety of projects.",
  [EntryType.LAB]: "My laboratory. A collection of experiments and prototypes.",
  [EntryType.NOTES]:
    "A slice of my mind, a collection of thoughts, ideas, and notes.",
};
