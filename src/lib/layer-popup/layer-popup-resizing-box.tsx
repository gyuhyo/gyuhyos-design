/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface LayerPopupResizingBoxProps {
  isMaximized: boolean;
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}

const LayerPopupResizingBox: React.FC<LayerPopupResizingBoxProps> = React.memo(
  (props) => {
    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeStart, setResizeStart] = React.useState({
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
    });

    // 크기 조절 시작
    const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsResizing(true);
      setResizeStart({
        width: props.size.width,
        height: props.size.height,
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    };

    // 크기 조절 중
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return;

      if (props.isMaximized) {
        props.setIsMaximized(false);
      }

      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;

      const newWidth = Math.max(resizeStart.width + deltaX, 300); // 최소 너비 300px
      const newHeight = Math.max(resizeStart.height + deltaY, 200); // 최소 높이 200px

      props.setSize({
        width: newWidth,
        height: newHeight,
      });
    };

    // 크기 조절 종료
    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    React.useEffect(() => {
      if (isResizing) {
        window.addEventListener("mousemove", handleResize);
        window.addEventListener("mouseup", handleResizeEnd);
      } else {
        window.removeEventListener("mousemove", handleResize);
        window.removeEventListener("mouseup", handleResizeEnd);
      }

      return () => {
        window.removeEventListener("mousemove", handleResize);
        window.removeEventListener("mouseup", handleResizeEnd);
      };
    }, [isResizing]);

    return (
      <i
        className="fa-solid fa-caret-down"
        onMouseDown={handleResizeStart}
        css={css({
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "16px",
          cursor: "se-resize",
          transform: "rotate(-45deg)",
          color: "#aaa",
        })}
      />
    );
  }
);

export default LayerPopupResizingBox;
