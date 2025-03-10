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
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth <= 1200) {
      setIsMobile(true);
    }

    const browserResizing = () => {
      if (window.innerWidth <= 1200) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", browserResizing);

    return () => window.removeEventListener("resize", browserResizing);
  }, []);

  return (
    <React.Suspense>
      <Split
        horizontal={isMobile ? true : align == "column" ? true : false}
        initialPrimarySize={defaultSize ?? "50%"}
      >
        {children}
      </Split>
    </React.Suspense>
  );
};

export default React.memo(DevsSplitContainer);
