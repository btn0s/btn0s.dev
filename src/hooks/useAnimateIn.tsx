import { useEffect } from "react";

import { useAnimate } from "framer-motion";
import { usePathname } from "next/navigation";

const useAnimateIn = () => {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();

  const hasUserVisited = sessionStorage.getItem("hasUserVisited") === "true";

  useEffect(() => {
    const animateIn = () => {
      animate(
        scope.current,
        {
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          delay: hasUserVisited ? 0 : 0.5,
          duration: hasUserVisited ? 0.5 : 1,
        },
      );
    };

    if (pathname! === "/" || hasUserVisited) {
      animateIn();
    }

    window.addEventListener("home-content-loaded", animateIn);
    return () => {
      window.removeEventListener("home-content-loaded", animateIn);
    };
  }, [pathname]);

  return scope;
};

export default useAnimateIn;
