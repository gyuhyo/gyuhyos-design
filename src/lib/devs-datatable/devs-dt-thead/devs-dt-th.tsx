import React from "react";
import { IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";

const DevsDtTh = ({ col }: { col: IDataTableColumn }) => {
  const { setColumns } = useDt();

  const resizingColumnRef = React.useRef<{
    startX: number;
    startWidth: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    resizingColumnRef.current = {
      startX: e.clientX,
      startWidth: col.width ?? 100,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingColumnRef.current && setColumns !== undefined) {
      const { startX, startWidth } = resizingColumnRef.current;
      const deltaX = e.clientX - startX;

      const newWidth = Math.max(startWidth + deltaX, col.width ?? 100); // 최소 너비 50px

      setColumns((prevColumns) =>
        prevColumns.map((m) =>
          m.field === col.field ? { ...m, width: newWidth } : { ...m }
        )
      );
    }
  };

  const handleMouseUp = () => {
    resizingColumnRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const defaultClassString = "devs-dt-cell devs-dt-th";
  const classString = col.sticky
    ? `${defaultClassString} devs-dt-sticky-col`
    : defaultClassString;

  return (
    <th
      key={`col-${col.field}`}
      className={classString}
      style={
        {
          position: "relative",
          "--width": `${col.width ?? 100}px`,
        } as React.CSSProperties
      }
    >
      {col.title}
      {/* 드래그 핸들 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "5px",
          height: "100%",
          cursor: "col-resize",
          backgroundColor: "transparent",
        }}
        onMouseDown={(e) => handleMouseDown(e)}
      />
    </th>
  );
};

export default React.memo(DevsDtTh);
