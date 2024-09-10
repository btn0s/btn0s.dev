import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post"] {
  _id,
  title,
  slug,
  description,
  coverMedia[]{
    _type,
    asset->{
      url
    }
  },
  startDate,
  endDate,
  tags[]-> {
    _id,
    name
  }
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]
    {
      _id,
      title,
      slug,
      description,
      coverMedia[]{
        _type,
        asset->{
          url
        }
      },
      startDate,
      endDate,
      tags[]-> {
        _id,
        name
      },
      content
    }
`);
