import { useEffect, useState } from "react";

import {
  DynamicAnimationOptions,
  MotionProps,
  Transition,
  useAnimate,
} from "framer-motion";
import { usePathname } from "next/navigation";

interface useAnimateInProps {
  options: DynamicAnimationOptions;
}

export const useHasUserVisited = () => {
  const pathname = usePathname();
  const [hasUserVisited, setHasUserVisited] = useState(false);

  useEffect(() => {
    setHasUserVisited(sessionStorage.getItem("hasUserVisited") === "true");
  }, [pathname]);

  return hasUserVisited;
};

const useAnimateIn = ({ options }: useAnimateInProps) => {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();
  const hasUserVisited = useHasUserVisited();

  useEffect(() => {
    console.log({
      pathname,
      hasUserVisited,
    });

    const animateIn = () => {
      animate(
        scope.current,
        {
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          duration: hasUserVisited ? 1 : 0.5,
          ...options,
        },
      );
    };

    if (pathname !== "/" || hasUserVisited) {
      console.log("animateIn");
      animateIn();
    }

    window.addEventListener("home-content-loaded", animateIn);
    return () => {
      window.removeEventListener("home-content-loaded", animateIn);
    };
  }, [pathname, hasUserVisited]);

  return scope;
};

export default useAnimateIn;
