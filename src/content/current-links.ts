import { StaticImageData } from "next/image";

import backboneShareCardImg from "@/assets/images/work/backbone-share-card.png";
import thinkhumanShareCardImg from "@/assets/images/work/thinkhuman-share-card.webp";

export interface CurrentLink {
  title: string;
  description: string;
  role: string;
  url: string;
  image: StaticImageData;
}

export const CURRENT_LINKS: CurrentLink[] = [
  {
    title: "Backbone",
    description:
      "Backbone is a mobile gaming controller with intuitive controls, clickable thumbsticks & zero latency that works with cloud and remote gaming.",
    role: "design engineer",
    url: "https://playbackbone.com/",
    image: backboneShareCardImg,
  },
  {
    title: "thinkhuman",
    description:
      "We use a design-driven approach to build sustainable startups that are uniquely human.",
    role: "partner",
    url: "https://thinkhuman.co/",
    image: thinkhumanShareCardImg,
  },
];
