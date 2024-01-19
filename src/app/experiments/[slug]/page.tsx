export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(`../../../content/experiments/${slug}.mdx`);
  const { metadata } = MDXContent;

  if (metadata) {
    return {
      title: `${metadata.title} | an experiment by @btn0s`,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(
              metadata.title,
            )}&description=${encodeURIComponent(metadata.description)}&category=experiments`,
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
