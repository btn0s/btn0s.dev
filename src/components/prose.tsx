import { FC, PropsWithChildren } from "react";

const Prose: FC<PropsWithChildren> = ({ children }) => {
  return (
    <article className="prose prose-sm prose-invert max-w-none">
      {children}
    </article>
  );
};

export default Prose;
