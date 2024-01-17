import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";
import { getPosts } from "@/app/api/posts";
import { ExternalLinkWithPreview } from "@/components/ExternalLinkWithPreview";
import { CURRENT_LINKS } from "@/content/current-links";

export default async function Home() {
  const posts = await getPosts();
  const experiments = await getExperiments();

  return (
    <>
      <p>
        I&apos;m part designer, part programmer, and fully obsessed with making
        things that are beautiful, functional, and uniquely human.
      </p>
      <div className="flex flex-col gap-5">
        <span>focus</span>
        <div className="flex flex-col gap-1">
          {CURRENT_LINKS.map(({ role, url }) => (
            <div
              key={url}
              className="flex items-center justify-between gap-2 text-muted-foreground hover:text-white"
            >
              <span>{role} @</span>
              <ExternalLinkWithPreview href={url}>
                {url.split("//")[1].split("/")[0]}
              </ExternalLinkWithPreview>
            </div>
          ))}
        </div>
      </div>
      {posts.length > 0 && (
        <div className="flex flex-col gap-5">
          <span>thoughts</span>
          <div className="flex flex-col ">
            {posts.map(({ slug, metadata }) => (
              <Link
                key={slug}
                href={`/posts/${slug}`}
                className="-m-3 flex flex-col rounded-md p-3 transition-colors duration-200 hover:bg-white/5"
              >
                <h3 className="text-white">{metadata.title}</h3>
                <p className="text-muted-foreground">{metadata.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {experiments.length > 0 && (
        <div className="flex flex-col gap-5">
          <span>experiments</span>
          <div className="flex flex-col text-muted-foreground">
            {experiments.map(({ slug, metadata }) => (
              <Link
                key={slug}
                href={`/experiments/${slug}`}
                className="-m-3 flex flex-col rounded-md p-3 transition-colors duration-200 hover:bg-white/5"
              >
                <h3 className="text-white">{`${metadata.title}`}</h3>
                <p className="text-muted-foreground">{`${metadata.description}`}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
