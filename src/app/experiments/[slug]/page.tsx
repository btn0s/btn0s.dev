export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(`../../../content/experiments/${slug}.mdx`);
  const { meta } = MDXContent;

  if (meta) {
    return {
      title: `${meta.title} | an experiment by @btn0s`,
      description: meta.description,
      openGraph: {
        title: meta.title,
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
    title: "an experiment by @btn0s",
    description:
      "this is a small peek into my lab, where i experiment with code, design, and other things.",
    openGraph: {
      title: "an experiment by @btn0s",
      description: "an experiment by @btn0s",
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
  const MDXContent = await import(`../../../content/experiments/${slug}.mdx`);
  return <MDXContent.default />;
}
