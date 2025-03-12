import React from "react";

export const useResizeObserver = (
  target: React.RefObject<HTMLDivElement | null> | undefined
) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!target?.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(target!.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return size;
};
