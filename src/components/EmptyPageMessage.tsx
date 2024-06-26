import { FC, PropsWithChildren } from "react";

const EmptyPageMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="z-10 text-sm text-muted-foreground opacity-50">
      // nothing here yet. check back later.
    </div>
  );
};

export default EmptyPageMessage;
