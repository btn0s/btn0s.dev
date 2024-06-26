export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(`../../../content/notes/${slug}.mdx`);
  const { meta } = MDXContent;

  if (meta) {
    return {
      title: `✦ ${meta.title} | @btn0s`,
      description: meta.description,
      openGraph: {
        title: `✦ ${meta.title} | @btn0s`,
        description: meta.description,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(
              meta.title,
            )}&description=${encodeURIComponent(meta.description)}&category=experiments`,
          },
        ],
      },
    };
  }

  return {
    title: "a note by ✦ btn0s",
    description: "random musings.",
    openGraph: {
      title: "a note by ✦ btn0s",
      description: "random musings.",
      images: [
        {
          url: "https://btn0s.dev/images/og-image.png",
        },
      ],
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(`../../../content/notes/${slug}.mdx`);
  return <MDXContent.default />;
}
