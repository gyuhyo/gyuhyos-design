import "./split.container.css";
import React from "react";
const Split = React.lazy(() =>
  import("@geoffcox/react-splitter").then((mod) => ({ default: mod.Split }))
);

export interface DevsSplitContainerProps {
  align?: "column" | "row";
  defaultSize?: string;
  children: any;
}

const DevsSplitContainer: React.FC<DevsSplitContainerProps> = ({
  align = "column",
  defaultSize,
  children,
}) => {
  return (
    <React.Suspense>
      <Split
        horizontal={align == "column" ? true : false}
        initialPrimarySize={defaultSize ?? "50%"}
      >
        {children}
      </Split>
    </React.Suspense>
  );
};

export default React.memo(DevsSplitContainer);
