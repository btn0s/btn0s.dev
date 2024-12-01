import { ViewMoreSketchesCTA } from "@/components/ctas";
import ProgressiveBlur from "@/components/experiments/progressive-blur";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Progressive Blur Effect",
  description:
    "A simple experiment exploring the use of CSS mask images and backdrop blur to create a progressive fade effect.",
};

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white">
          Progressive Blur Effect
        </h1>
        <p className="text-sm text-muted-foreground">
          A simple experiment exploring the use of CSS mask images and backdrop
          blur to create a progressive fade effect. The technique combines a
          semi-transparent background with a linear gradient mask, creating a
          smooth transition from solid to transparent while maintaining a
          consistent blur effect.
        </p>
      </div>

      <ProgressiveBlur />

      <Separator className="my-8" />
      <ViewMoreSketchesCTA />
    </div>
  );
}
