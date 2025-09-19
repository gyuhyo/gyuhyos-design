import React from "react";
import { IDataTableColumn } from "../types";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context";

const GyudDtTh = ({
  column,
  rowSpan,
  colSpan,
  isLastNode,
}: {
  column: IDataTableColumn;
  rowSpan: number;
  colSpan: number;
  isLastNode: boolean;
}) => {
  const { tableRef, setColumnWidth } = useGyudDt((state) => state);
  const resizingColumnRef = React.useRef<{
    startX: number;
    startWidth: number;
    newWidth: number;
  } | null>(null);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (resizingColumnRef.current) {
        const { startX, startWidth } = resizingColumnRef.current;
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, 100);

        if (tableRef?.current) {
          resizingColumnRef.current.newWidth = newWidth;
          const cols = tableRef.current.querySelectorAll(
            `[data-field="${column.field}"]`
          );
          if (cols) {
            cols.forEach((col) => {
              (col as HTMLElement).style.width = `${newWidth}px`;
            });
          }
        }
      }
    },
    [tableRef]
  );

  const handleMouseUp = React.useCallback(() => {
    setColumnWidth(column.field, resizingColumnRef.current?.newWidth ?? 100);
    resizingColumnRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      resizingColumnRef.current = {
        startX: e.clientX,
        startWidth:
          e.currentTarget.parentElement?.getBoundingClientRect().width ?? 100,
        newWidth:
          e.currentTarget.parentElement?.getBoundingClientRect().width ?? 100,
      };

      document.addEventListener(
        "mousemove",
        handleMouseMove as (e: MouseEvent) => void
      );
      document.addEventListener("mouseup", handleMouseUp);
    },
    [tableRef, handleMouseUp]
  );

  return (
    <GyudDtThWrapper
      key={column.field}
      className="gyud-dt-th gyud-dt-cell"
      rowSpan={rowSpan}
      colSpan={colSpan}
      data-is-last-node={isLastNode}
    >
      <GyudDtThCotent>
        {column.title}
        {isLastNode && (
          <GyudDtThResizeHandle
            className="gyud-dt-th-resize-handle"
            onMouseDown={handleMouseDown}
          />
        )}
      </GyudDtThCotent>
    </GyudDtThWrapper>
  );
};

export default React.memo(GyudDtTh);

export const GyudDtThWrapper = newStyled.th({
  display: "table-cell",
  height: "40px",
  background: "linear-gradient(180deg, #f0f0f0, #d9d9d9)",
  zIndex: 2,
  fontWeight: "bold",
  alignContent: "center",
  textAlign: "center",
  padding: 0,
  "&[data-is-last-node='true']:hover": {
    background: "linear-gradient(180deg, #dddddd, #b3b3b3) !important",
  },
  ":has(.gyud-dt-th-resize-handle:hover)": {
    borderInlineEndColor: "#3cafff",
  },
});

export const GyudDtThCotent = newStyled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const GyudDtThResizeHandle = newStyled.div({
  position: "absolute",
  right: 0,
  top: 0,
  width: "5px",
  height: "100%",
  background: "transparent",
  cursor: "col-resize",
  "&:hover": {
    background: "#3cafff",
  },
});
