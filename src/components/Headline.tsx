"use client";

import { motion } from "framer-motion";

const Headline = () => {
  return (
    <h1 className="text-2xl sm:text-3xl">
      <motion.span
        variants={{
          initial: { opacity: 1, fontWeight: 500 },
          muted: { opacity: 0.75, fontWeight: 300 },
        }}
        initial="initial"
        animate="muted"
      >
        Empowering designers, engineers, and founders to build{" "}
      </motion.span>
      <span className="font-medium">products users love</span>.
    </h1>
  );
};

export default Headline;
