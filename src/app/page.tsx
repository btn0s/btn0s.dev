import { LightningBoltIcon } from "@radix-ui/react-icons";
import { FlaskConicalIcon, NotebookPenIcon } from "lucide-react";
import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";
import { getPosts } from "@/app/api/posts";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { ExternalLinkWithPreview } from "@/components/experiments/ExternalLinkWithPreview";
import { CURRENT_LINKS } from "@/content/current-links";

export default async function Home() {
  const posts = await getPosts();
  const experiments = await getExperiments();

  return (
    <>
      <FadeBlurLoader transition={{ delay: 0.5 }}>
        <h1 className="text-xl">
          <span className="font-light opacity-50">Designer, programmer, </span>
          <span className="font-bold">human.</span>
        </h1>
      </FadeBlurLoader>
      <FadeBlurLoader transition={{ delay: 1 }}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-sm">
              <LightningBoltIcon className="size-3" />
              current
            </span>
          </div>
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
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-sm">
                <NotebookPenIcon className="size-3" />
                thoughts
              </span>
              {posts.length > 3 && (
                <Link className="text-muted-foreground underline" href="/posts">
                  view all
                </Link>
              )}
            </div>
            <div className="flex flex-col ">
              {posts.map(({ slug, meta }) => (
                <Link
                  key={slug}
                  href={`/posts/${slug}`}
                  className="-m-3 flex flex-col rounded-md p-3 transition-colors duration-200 hover:bg-white/5"
                >
                  <h3 className="text-white">{meta.title}</h3>
                  <p className="max-w-[95%] text-pretty text-muted-foreground">
                    {meta.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {experiments.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-sm">
                <FlaskConicalIcon className="size-3" />
                experiments
              </span>
              {experiments.length > 3 && (
                <Link
                  className="text-muted-foreground underline"
                  href="/experiments"
                >
                  view all
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-5 text-muted-foreground">
              {experiments.map(({ slug, meta }) => (
                <Link
                  key={slug}
                  href={`/experiments/${slug}`}
                  className="-mx-3 -my-2 flex flex-col rounded-md px-3 py-2 transition-colors duration-200 hover:bg-white/5"
                >
                  <h3 className="text-white">{`${meta.title}`}</h3>
                  <p className="max-w-[95%] text-pretty text-muted-foreground">{`${meta.description}`}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </FadeBlurLoader>
    </>
  );
}
