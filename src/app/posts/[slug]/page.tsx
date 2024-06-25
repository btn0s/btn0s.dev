export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(`../../../content/posts/${slug}.mdx`);
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
    title: "an experiment by ✦ bt norris",
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
  const MDXContent = await import(`../../../content/posts/${slug}.mdx`);
  return <MDXContent.default />;
}
