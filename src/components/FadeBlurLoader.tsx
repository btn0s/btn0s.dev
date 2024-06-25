"use client";

import { CSSProperties, FC, PropsWithChildren } from "react";

import { DynamicAnimationOptions } from "framer-motion";

import useAnimateIn from "@/hooks/useAnimateIn";

interface FadeBlurLoaderProps {
  className?: string;
  options?: DynamicAnimationOptions;
  style?: CSSProperties;
}

const FadeBlurLoader: FC<PropsWithChildren<FadeBlurLoaderProps>> = ({
  children,
  className,
  options = {},
  style,
}) => {
  const scope = useAnimateIn({ options });
  return (
    <div
      ref={scope}
      className={className}
      style={{
        opacity: 0,
        filter: "blur(4px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FadeBlurLoader;
