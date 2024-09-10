import { defineArrayMember, type SchemaTypeDefinition } from "sanity";
import { defineField } from "sanity";

const tag: SchemaTypeDefinition = {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

const post: SchemaTypeDefinition = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverMedia",
      title: "Cover Media",
      type: "array",
      of: [{ type: "image" }, { type: "file", options: { accept: "video/*" } }],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: "parent",
      title: "Parent",
      type: "reference",
      to: [{ type: "post" }],
    },
    {
      name: "children",
      title: "Children",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
    },
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, tag],
};
