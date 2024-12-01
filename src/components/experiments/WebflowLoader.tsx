import Image from "next/image";

import webflowGlyphImg from "@/assets/images/logos/webflow-glyph.svg";
import { Experiment } from "@/components/experiment";
import { Button } from "@/components/ui/button";

import { ExperimentContainer } from "@/components/ExperimentContainer";

const WebflowLoader = () => {
  return (
    <Experiment>
      <ExperimentContainer>
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6">
          <Image src={webflowGlyphImg} width={32} alt="Webflow logo" />
          <div className="relative h-[2px] w-[150px] bg-white">
            <div className="absolute inset-y-0 w-1/2 bg-blue-600 blur-[2px]"></div>
            <div className="absolute inset-y-0  w-1/2 bg-blue-600"></div>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Run
        </Button>
      </ExperimentContainer>
    </Experiment>
  );
};

export default WebflowLoader;
