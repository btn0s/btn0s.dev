import { useEffect } from "react";

import { useAnimate } from "framer-motion";
import { usePathname } from "next/navigation";

const useAnimateIn = () => {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();

  const hasUserVisited = sessionStorage.getItem("hasUserVisited") === "true";

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
