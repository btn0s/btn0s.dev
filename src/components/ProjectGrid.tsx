"use client";

import classNames from "classnames";
import { useRef, useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import { FEATURED_PROJECTS } from "@/content/projects";

const ProjectGrid = () => {
  const centerViewportRef = useRef(null);
  const [cardsHovered, setCardsHovered] = useState<string[]>([]);

  const handleOverlapStart = (cardTitle: string) => {
    setCardsHovered((prevHovered) => [...prevHovered, cardTitle]);
  };

  const handleOverlapEnd = (cardTitle: string) => {
    setCardsHovered((prevHovered) =>
      prevHovered.filter((title) => title !== cardTitle),
    );
  };

  return (
    <>
      <div
        className={classNames(
          "group/cards flex flex-col gap-4 sm:grid pb-12 sm:grid-cols-2",
        )}
      >
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            overlapTargetRef={centerViewportRef}
            cardsHovered={cardsHovered}
            onOverlapStart={handleOverlapStart}
            onOverlapEnd={handleOverlapEnd}
          />
        ))}
      </div>
      <div
        ref={centerViewportRef}
        className="fixed left-0 top-[50svh] h-[1px] w-full"
      />
    </>
  );
};

export default ProjectGrid;
