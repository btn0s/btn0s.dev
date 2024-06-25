"use client";

import { FC, PropsWithChildren } from "react";

import { motion, MotionProps } from "framer-motion";

interface FadeBlurLoaderProps extends MotionProps {
  className?: string;
}

const FadeBlurLoader: FC<PropsWithChildren<FadeBlurLoaderProps>> = ({
  className,
  children,
  ...otherProps
}) => {
  const props: FadeBlurLoaderProps = {
    className,
    variants: {
      hidden: { opacity: 0, filter: "blur(4px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    initial: "hidden",
    animate: "visible",
    ...otherProps,
  };

  return <motion.div {...props}>{children}</motion.div>;
};

export default FadeBlurLoader;
