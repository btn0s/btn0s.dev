import { BriefcaseBusiness, Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

export const GetInTouchCTA = ({ topic }: { topic: string }) => {
  return (
    <Link
      href="mailto:brendan.t.norris@gmail.com"
      className="group relative flex flex-col gap-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-white/20"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col text-sm">
          <h3 className="font-medium text-white">Get in touch</h3>
          <p className="text-muted-foreground">Let&apos;s chat about {topic}</p>
        </div>
        <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};

export const ViewMoreWorkCTA = ({
  href,
  imageSrc,
  projectName,
}: {
  href: string;
  imageSrc: StaticImageData;
  projectName: string;
}) => {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-white/20"
    >
      <div className="flex items-center gap-4">
        <Image
          src={imageSrc}
          alt={projectName}
          className="h-12 w-12 rounded-lg border border-white/10"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-white">
            More {projectName} work
          </h3>
          <p className="text-sm text-muted-foreground">
            See other projects I built at {projectName}
          </p>
        </div>
        <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};

export const ViewMoreProjectsCTA = () => {
  return (
    <Link
      href="/work"
      className="group relative flex flex-col gap-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-white/20"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <BriefcaseBusiness className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col text-sm">
          <h3 className="font-medium text-white">View more of my work</h3>
          <p className="text-muted-foreground">Check out my journey so far</p>
        </div>
        <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};
