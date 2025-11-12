import React from "react";
import newStyled from "@emotion/styled";
import { IDataTableColumn } from "../types";
import { useGyudDt } from "../context";

const GyudDtTd = ({
  column,
  rowId,
  data,
}: {
  column: IDataTableColumn;
  rowId: string;
  data: any;
}) => {
  const [onLoad, setOnLoad] = React.useState(false);
  const tdRef = React.useRef<HTMLTableCellElement | null>(null);
  const { setFocusedCell, focusedCell, setDataSource, columns } = useGyudDt(
    (state) => state
  );

  const isFocused = React.useMemo(
    () => focusedCell.rowId === rowId && focusedCell.field === column.field,
    [focusedCell, rowId, column.field]
  );

  const isRowFocused = React.useMemo(
    () => focusedCell.rowId === rowId,
    [focusedCell, rowId]
  );

  const getStickyPosition = React.useMemo(() => {
    if (!tdRef.current || !column.sticky) return 0;

    const parent = tdRef.current.parentElement;
    const index = Array.from(parent?.children || []).indexOf(tdRef.current);

    let offsetLeft = 0;
    for (let i = 0; i < index; i++) {
      const child = parent?.children[i];
      if (
        child?.classList.contains("gyud-dt-sticky-col") ||
        (child as HTMLElement).style.getPropertyValue("position") === "sticky"
      ) {
        offsetLeft += (child as HTMLElement).getBoundingClientRect().width || 0;
      }
    }

    return offsetLeft;
  }, [column.sticky, onLoad]);

  return (
    <GyudDtTdWrapper
      key={column.field}
      ref={(e) => {
        if (onLoad || !e) return;
        tdRef.current = e;
        setOnLoad(true);
      }}
      className={`gyud-dt-td gyud-dt-cell`}
      data-field={column.field}
      data-is-cell-focused={isFocused}
      data-is-last-sticky-col={column.isLastStickyCol}
      data-is-row-focused={isRowFocused}
      style={{
        position: column.sticky ? "sticky" : "relative",
        left: column.sticky ? getStickyPosition : "auto",
        width: `${column.width || 100}px`,
        zIndex: column.sticky ? 1 : 0,
      }}
      onClick={(e) => {
        setFocusedCell({ rowId: rowId, field: column.field });
      }}
      onDoubleClick={(e) => {
        setDataSource((prev) =>
          prev.map((p) =>
            p.rowId === rowId ? { ...p, mode: "u", [column.field]: "123" } : p
          )
        );
      }}
    >
      <GyudDtTdContent className="gyud-dt-td-content">{data}</GyudDtTdContent>
    </GyudDtTdWrapper>
  );
};

export default GyudDtTd;

const GyudDtTdContent = newStyled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  alignContent: "center",
  padding: "0px 3px",
});

const GyudDtTdWrapper = newStyled.td({
  display: "table-cell",
  "&[data-is-row-focused='true']": {
    backgroundColor: "#8fffe2 !important",
  },
  "&[data-is-cell-focused='true']": {
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "1px dashed blue",
    },
  },
});
