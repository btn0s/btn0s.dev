import { FC, PropsWithChildren } from "react";

const EmptyPageMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="z-10 text-sm text-muted-foreground opacity-50">
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      // nothing here yet. check back later.
    </div>
  );
};

export default EmptyPageMessage;
