/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { useResizeObserver } from "../devs-datatable/hooks/useResizeObserver";

export type TDevsSplitContainer = {
  children: React.ReactNode | React.ReactNode[];
  align?: "column" | "row";
  sizes?: Array<number | string>;
  onSizeChanged?: (sizes: number[]) => void;
  onLoaded?: ({
    width,
    height,
    sizes,
  }: {
    width: number;
    height: number;
    sizes: number[];
  }) => void;
  disabled?: Array<boolean>;
};

const DevsSplitContainer: React.FC<TDevsSplitContainer> = React.memo(
  ({
    children,
    align = "column",
    sizes,
    onSizeChanged,
    onLoaded,
    disabled,
  }) => {
    const selectorRef = React.useRef<{
      target: HTMLDivElement;
      startPosition: number;
      prevSize: number;
      nextSize: number;
    } | null>(null);

    const changedPanelsPercent = React.useRef<number[]>([]);

    const [isSet, setIsSet] = React.useState<boolean>(false);
    const [isMobile, setIsMobile] = React.useState<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { width, height } = useResizeObserver(containerRef);
    const childrenLength = Array.isArray(children) ? children.length : 1;
    const realAlign = isMobile ? "column" : align;
    const usingSize = realAlign === "row" ? width : height;
    const availableSize = usingSize - 9 * (childrenLength - 1);

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

    React.useEffect(() => {
      if (!containerRef.current || usingSize <= 0) return;
      if (!Array.isArray(children)) return;

      let size: string[] = [];
      if (changedPanelsPercent.current.length > 0) {
        let remainingSize = availableSize;
        for (let i = 0; i < childrenLength; i++) {
          if (changedPanelsPercent.current?.[i] === undefined) break;

          if (changedPanelsPercent.current?.[i] !== undefined) {
            const s = changedPanelsPercent.current[i];

            const sz = (availableSize / 100) * s;
            size.push(`${sz}px`);
            remainingSize -= sz;
          }
        }

        if (size.length < childrenLength) {
          const minus = childrenLength - size.length;
          for (let i = 0; i < minus; i++) {
            size.push(`${remainingSize / minus}px`);
          }
        }
      } else {
        if (sizes === undefined) {
          size = Array.from(
            { length: childrenLength },
            () => `${availableSize / childrenLength}px`
          );
        } else {
          let remainingSize = availableSize;
          for (let i = 0; i < childrenLength; i++) {
            if (!sizes?.[i]) break;

            if (sizes?.[i]) {
              if (typeof sizes[i] === "number") {
                size.push(`${sizes[i]}px`);
                remainingSize -= sizes[i] as number;
              } else {
                const s = sizes[i] as string;
                if (s.includes("%")) {
                  const sz =
                    (availableSize / 100) * parseFloat(s.replace("%", ""));
                  size.push(`${sz}px`);
                  remainingSize -= sz;
                } else {
                  size.push(s);
                  remainingSize -= parseFloat(s.replace("px", ""));
                }
              }
            }
          }

          if (size.length < childrenLength) {
            const minus = childrenLength - size.length;
            for (let i = 0; i < minus; i++) {
              size.push(`${remainingSize / minus}px`);
            }
          }
        }
      }

      const panels = containerRef.current.querySelectorAll(
        "& > [data-split-type='panel']"
      );

      const containerSize =
        realAlign === "column"
          ? containerRef.current.clientHeight
          : containerRef.current.clientWidth;

      for (const idx in size) {
        const sizeNumber = parseFloat(size[idx].replace("px", ""));
        if (
          sizeNumber > containerSize ||
          sizeNumber > 10000 ||
          containerSize > 10000
        )
          continue;
        if (panels?.[idx]) {
          (panels[idx] as HTMLDivElement).style.flexBasis = size[idx];
        }
      }

      onLoaded?.({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        sizes: size.map((s) => parseFloat(s.replace("px", ""))),
      });
      onSizeChanged?.(size.map((s) => parseFloat(s.replace("px", ""))));
    }, [width, height, usingSize, realAlign]);

    const onSplitBarMouseDown = (
      e: React.MouseEvent | React.TouchEvent,
      index: number
    ) => {
      if (disabled?.[index] ?? false) return;

      changedPanelsPercent.current = [];
      const prev = e.currentTarget.parentElement!
        .previousElementSibling as HTMLDivElement;
      const next = e.currentTarget.parentElement!
        .nextElementSibling as HTMLDivElement;

      let startPosiition: number = 0;
      if (e.nativeEvent instanceof MouseEvent) {
        startPosiition =
          realAlign === "row" ? e.nativeEvent.clientX : e.nativeEvent.clientY;
      }

      if (e.nativeEvent instanceof TouchEvent) {
        startPosiition =
          realAlign === "row"
            ? e.nativeEvent.touches[0].clientX
            : e.nativeEvent.touches[0].clientY;
      }

      selectorRef.current = {
        target: e.currentTarget as HTMLDivElement,
        startPosition: startPosiition,
        prevSize: parseFloat(prev.style.flexBasis.replace("px", "")),
        nextSize: parseFloat(next.style.flexBasis.replace("px", "")),
      };

      if (e.nativeEvent instanceof MouseEvent) {
        document.addEventListener("mousemove", onSplitBarMouseMove);
        document.addEventListener("mouseup", onSplitBarMouseUp);
      } else {
        document.addEventListener("touchmove", onSplitBarMouseMove);
        document.addEventListener("touchend", onSplitBarMouseUp);
      }
    };

    const onSplitBarMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!selectorRef.current) return;

      let deltaX: number = 0;
      if (e instanceof MouseEvent) {
        deltaX =
          (realAlign === "row" ? e.clientX : e.clientY) -
          selectorRef.current.startPosition;
      }

      if (e instanceof TouchEvent) {
        deltaX =
          (realAlign === "row" ? e.touches[0].clientX : e.touches[0].clientY) -
          selectorRef.current.startPosition;
      }

      const prev = selectorRef.current.target.parentElement!
        .previousElementSibling as HTMLDivElement;
      const next = selectorRef.current.target.parentElement!
        .nextElementSibling as HTMLDivElement;

      const prevSize = Math.max(selectorRef.current.prevSize + deltaX, 0);
      const nextSize = Math.max(selectorRef.current.nextSize - deltaX, 0);
      const summarySize =
        selectorRef.current.prevSize + selectorRef.current.nextSize;

      if (prevSize === 0) {
        prev.style.flexBasis = `0px`;
        next.style.flexBasis = `${summarySize}px`;
        return;
      }

      if (nextSize === 0) {
        prev.style.flexBasis = `${summarySize}px`;
        next.style.flexBasis = `0px`;
        return;
      }

      prev.style.flexBasis = `${prevSize}px`;
      next.style.flexBasis = `${nextSize}px`;
    };

    const onSplitBarMouseUp = () => {
      if (!selectorRef.current) return;

      selectorRef.current = null;
      const panels = Array.from(containerRef.current!.children).filter(
        (el) => el.getAttribute("data-split-type") === "panel"
      );

      const sizes = [];
      for (const panel of panels) {
        const p = panel as HTMLDivElement;
        const flexBasis = parseFloat(p.style.flexBasis.replace("px", ""));

        sizes.push(flexBasis);
        const per = (flexBasis / availableSize) * 100;
        changedPanelsPercent.current.push(per);
      }

      onSizeChanged?.(sizes);

      document.removeEventListener("mousemove", onSplitBarMouseMove);
      document.removeEventListener("mouseup", onSplitBarMouseUp);
      document.removeEventListener("touchmove", onSplitBarMouseMove);
      document.removeEventListener("touchend", onSplitBarMouseUp);
    };

    return (
      <SplitContainer ref={containerRef} align={realAlign}>
        {Array.from({ length: childrenLength }, (v, i) => (
          <React.Fragment key={`spanel-${i}`}>
            <SplitPanel
              data-split-type="panel"
              size={Array.isArray(children) ? sizes?.[i] ?? "100%" : "100%"}
            >
              {Array.isArray(children) ? children[i] : children}
            </SplitPanel>
            {i !== childrenLength - 1 && (
              <SplitBar align={realAlign} fullSize={usingSize}>
                <SplitterTrack
                  data-split-type="track"
                  align={realAlign}
                  onMouseDown={(e) => onSplitBarMouseDown(e, i)}
                  onTouchStart={(e) => onSplitBarMouseDown(e, i)}
                  disabled={disabled?.[i] ?? false}
                />
                <Splitter data-split-type="splitter" align={realAlign} />
                {/* {realAlign === "row" && (
                  <React.Fragment>
                    <LeftArrow />
                    <RightArrow />
                  </React.Fragment>
                )} */}
              </SplitBar>
            )}
          </React.Fragment>
        ))}
      </SplitContainer>
    );
  }
);

export default DevsSplitContainer;

type TSplitContainer = {
  align: "column" | "row";
};
const SplitterTrack = styled.div<TSplitContainer & { disabled: boolean }>(
  (props) => ({
    position: "absolute",
    width: props.align === "row" ? "7px" : "100%",
    height: props.align === "row" ? "100%" : "7px",
    background: "#b2d7ff",
    top: props.align === "row" ? 0 : 1,
    left: props.align === "row" ? 1 : 0,
    borderRadius: "5px",
    opacity: 0,
    "&:hover": {
      opacity: props.disabled ? 0 : 1,
      transition: "opacity 200ms ease-in",
      cursor: props.disabled
        ? "not-allowed"
        : props.align === "row"
        ? "col-resize"
        : "row-resize",
    },
    "&:active": {
      opacity: props.disabled ? 0 : 1,
      transition: "opacity 200ms ease-in",
      background: "#8ac2ff",
      cursor: props.disabled
        ? "not-allowed"
        : props.align === "row"
        ? "col-resize"
        : "row-resize",
    },
  })
);

const Splitter = styled.div<TSplitContainer>((props) => ({
  position: "absolute",
  width: props.align === "row" ? "2px" : "50px",
  height: props.align === "row" ? "50px" : "2px",
  background: "#00000090",
  top: props.align === "row" ? "50%" : "calc(50% - calc(1px / 2))",
  left: props.align === "row" ? "calc(50% - calc(1px / 2))" : "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "5px",
  pointerEvents: "none",
}));

type TSplitBar = TSplitContainer & { fullSize: number };
const SplitBar = styled.div<TSplitBar>((props) => ({
  width: props.align === "row" ? "9px" : "100%",
  height: props.align === "row" ? "100%" : "9px",
  position: "relative",
  transition: "width 200ms ease-in, height 200ms ease-in",
}));

type TSplitPanel = {
  size: number | string;
};
const SplitPanel = styled.div<TSplitPanel>((props) => ({
  flexBasis: props.size,
  flexGrow: 0,
  overflow: "hidden",
}));

const SplitContainer = styled.div<TSplitContainer>((props) => ({
  flex: 1,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: props.align,
  overflow: "hidden",
}));
