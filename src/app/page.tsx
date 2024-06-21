import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";
import { getPosts } from "@/app/api/posts";
import { ExternalLinkWithPreview } from "@/components/experiments/ExternalLinkWithPreview";
import { CURRENT_LINKS } from "@/content/current-links";

export default async function Home() {
  const posts = await getPosts();
  const experiments = await getExperiments();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl">
        <span className="font-light opacity-75">Designer, programmer, </span>
        <span className="font-medium">human.</span>
      </h1>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="relative top-[1px] h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z"
                clipRule="evenodd"
              />
            </svg>
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
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="relative top-[1px] h-3 w-3"
              >
                <path d="M10.618 10.26c-.361.223-.618.598-.618 1.022 0 .226-.142.43-.36.49A6.006 6.006 0 0 1 8 12c-.569 0-1.12-.08-1.64-.227a.504.504 0 0 1-.36-.491c0-.424-.257-.799-.618-1.021a5 5 0 1 1 5.235 0ZM6.867 13.415a.75.75 0 1 0-.225 1.483 9.065 9.065 0 0 0 2.716 0 .75.75 0 1 0-.225-1.483 7.563 7.563 0 0 1-2.266 0Z" />
              </svg>
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
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="relative top-[1px] h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M11 3.5v2.257c0 .597.237 1.17.659 1.591l2.733 2.733c.39.39.608.918.608 1.469a2.04 2.04 0 0 1-1.702 2.024C11.573 13.854 9.803 14 8 14s-3.573-.146-5.298-.426A2.04 2.04 0 0 1 1 11.55c0-.551.219-1.08.608-1.47l2.733-2.732A2.25 2.25 0 0 0 5 5.758V3.5h-.25a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5H11ZM6.5 5.757V3.5h3v2.257a3.75 3.75 0 0 0 1.098 2.652l.158.158a3.36 3.36 0 0 0-.075.034c-.424.2-.916.194-1.335-.016l-1.19-.595a4.943 4.943 0 0 0-2.07-.52A3.75 3.75 0 0 0 6.5 5.757Z"
                  clipRule="evenodd"
                />
              </svg>
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
    </>
  );
}
