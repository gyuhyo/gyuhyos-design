/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useDt } from "../context/devs-dt-context";
import { IDataTableColumn } from "../_types";

const getLastNodes = (columns: IDataTableColumn[]): IDataTableColumn[] => {
  let lastNodes: IDataTableColumn[] = [];

  const findLastNodes = (column: IDataTableColumn) => {
    if (column.children && column.children.length > 0) {
      column.children.forEach(findLastNodes);
    } else {
      lastNodes.push(column);
    }
  };

  columns.forEach(findLastNodes);
  return lastNodes;
};

const DevsDtTFoot = React.memo(() => {
  const footRef = React.useRef<HTMLTableElement | null>(null);
  const { options, dataSource, columns, tbody } = useDt();
  const [position, setPosition] = React.useState<
    "static" | "relative" | "absolute" | "sticky" | "fixed"
  >("absolute");

  const lastNode = React.useMemo(() => getLastNodes(columns), [columns]);

  const mergedCellsCount = React.useMemo(() => {
    const { order, orderWidth } = options?.enabledRowOrder
      ? { order: 1, orderWidth: 30 }
      : { order: 0, orderWidth: 0 };
    const { expand, expandWidth } = options?.enabledExpand
      ? { expand: 1, expandWidth: 30 }
      : { expand: 0, expandWidth: 0 };
    const { rowNo, rowNoWidth } = options?.showRowNumber
      ? { rowNo: 1, rowNoWidth: 50 }
      : { rowNo: 0, rowNoWidth: 0 };
    const { check, checkWidth } = options?.enabledRowCheck
      ? { check: 1, checkWidth: 30 }
      : { check: 0, checkWidth: 0 };

    return {
      mergeCount: order + expand + rowNo + check,
      widths: orderWidth + expandWidth + rowNoWidth + checkWidth,
    };
  }, [options]);

  React.useEffect(() => {
    if (!tbody?.current || !footRef?.current || dataSource.length === 0) return;

    if (tbody.current.scrollHeight > tbody.current.clientHeight) {
      setPosition("sticky");
    } else {
      setPosition("absolute");
    }
  }, [JSON.stringify(dataSource)]);

  return (
    <table
      ref={footRef}
      data-table-type="devs-dt-tfoot"
      className="devs-dt-table devs-dt-table-fixed"
      css={css({
        height: 40,
        position: position,
        bottom: 0,
        zIndex: 3,
        boxShadow: "0px -5px 12px #00000050",
      })}
    >
      <tfoot className="devs-dt-tbody">
        <tr className="devs-dt-row">
          {mergedCellsCount.mergeCount > 0 && (
            <td
              className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
              style={
                {
                  left: 0,
                  "--width": `${mergedCellsCount.widths}px`,
                  borderTop: "1px solid #c6c6c6",
                  textAlign: "right",
                } as React.CSSProperties
              }
            >
              합계
            </td>
          )}
          {lastNode &&
            lastNode.map((col) => {
              let className = "devs-dt-cell";
              if (col.sticky) className += " devs-dt-sticky-col";

              return (
                <td
                  key={col.field}
                  data-cell-type="data-cell"
                  data-field={col.field}
                  className={className}
                  style={
                    {
                      borderTop: "1px solid #c6c6c6",
                      "--width": `${col.width ?? 100}px`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      whiteSpace: "pre",
                      textOverflow: "ellipsis",
                      wordBreak: "keep-all",
                      width: "100%",
                      height: "100%",
                      alignContent: "center",
                      zIndex: 2,
                    }}
                  >
                    {col.footer?.(dataSource)}
                  </div>
                </td>
              );
            })}
        </tr>
      </tfoot>
    </table>
  );
});

export default DevsDtTFoot;
