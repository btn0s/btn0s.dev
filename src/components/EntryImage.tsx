import { cn } from "@/lib/utils";

const EntryImage = ({
  src,
  caption,
  isHero,
}: {
  src: string;
  caption?: string;
  isHero?: boolean;
}) => (
  <div
    className={cn("relative", {
      "mb-12": isHero,
    })}
  >
    <img
      src={src}
      alt={caption}
      className={cn(
        "m-0 aspect-video rounded-lg border border-white/5 object-cover",
      )}
    />
    {/*<div className="prose prose-sm absolute inset-0 flex flex-col justify-end p-4 text-xs leading-none">*/}
    {/*  <p>{caption}</p>*/}
    {/*</div>*/}
  </div>
);

export default EntryImage;
