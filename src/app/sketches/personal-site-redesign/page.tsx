import personalSiteRedesignImage01 from "@/assets/images/shots/personal-site-redesign-01.png";
import personalSiteRedesignImage02 from "@/assets/images/shots/personal-site-redesign-02.png";
import personalSiteRedesignImage03 from "@/assets/images/shots/personal-site-redesign-03.png";
import personalSiteRedesignImage04 from "@/assets/images/shots/personal-site-redesign-04.png";
import { ViewMoreSketchesCTA } from "@/components/ctas";
import LightboxImage from "@/components/lightbox-image";
import { LightboxProvider } from "@/components/lightbox-provider";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Personal Site Redesign",
  description: "A look at my latest personal site redesign.",
};

const images = [
  {
    src: personalSiteRedesignImage01,
    alt: "Homepage with current roles and Backbone One preview",
    id: "redesign-1",
  },
  {
    src: personalSiteRedesignImage02,
    alt: "Backbone One project overview with device showcase",
    id: "redesign-2",
  },
  {
    src: personalSiteRedesignImage03,
    alt: "Navigation menu with home, work, notes, and lab sections",
    id: "redesign-3",
  },
  {
    src: personalSiteRedesignImage04,
    alt: "Bento grid layout showing multiple views of the site",
    id: "redesign-4",
  },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white">
          Personal Site Redesign
        </h1>
        <p className="text-sm text-muted-foreground">
          A fresh take on my personal site. I&apos;m particularly proud of the
          footer navigation bar.
        </p>
      </div>

      <LightboxProvider images={images}>
        <div className="grid grid-cols-1 gap-4">
          {images.map((image) => (
            <LightboxImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              id={image.id}
            />
          ))}
        </div>
      </LightboxProvider>

      <Separator className="my-8" />
      <ViewMoreSketchesCTA />
    </div>
  );
}
