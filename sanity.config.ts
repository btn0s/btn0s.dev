"use client";

import { presentationTool } from "@sanity/presentation";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";

import MarkdownEditor from "@/components/MarkdownEditor";

import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft/enable",
        },
      },
    }),
    markdownSchema(),
  ],
  form: {
    components: {
      input: (props: any) => {
        if (props.schemaType.name === "content") {
          return MarkdownEditor(props);
        }
        return props.renderDefault(props);
      },
    },
  },
});
