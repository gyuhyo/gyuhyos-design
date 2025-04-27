import React, { JSX } from "react";
import { useDt } from "../context/devs-dt-context";
import DevsDtTh from "./devs-dt-th";
import { IDataSource, IDataTableColumn } from "../_types";

type TDevsDtThead = {
  thead: React.MutableRefObject<HTMLDivElement | null>;
  setHeaderWidth: React.Dispatch<React.SetStateAction<number>>;
};

const RowNumberCell: React.FC<{ maxDepth: number }> = ({ maxDepth }) => {
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border"
      style={{ "--width": "50px" } as React.CSSProperties}
      rowSpan={maxDepth}
    >
      No
    </th>
  );
};

const RowExpandCell: React.FC<{
  maxDepth: number;
  setDataSource: React.Dispatch<React.SetStateAction<IDataSource[]>>;
}> = React.memo(({ maxDepth, setDataSource }) => {
  const [isExpand, setIsExpand] = React.useState(false);
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border"
      style={{ "--width": "30px", cursor: "pointer" } as React.CSSProperties}
      rowSpan={maxDepth}
      onClick={() => {
        setIsExpand(!isExpand);
        setDataSource((prev) => {
          return prev.map((p) => ({ ...p, expand: !isExpand }));
        });
      }}
    >
      <button
        className={`expand_ico2 ${isExpand ? "expand_ico_active2" : ""}`}
      ></button>
    </th>
  );
});

const RowCheckCell: React.FC<{
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
  maxDepth: number;
  isMultipleCheck: boolean | undefined;
  rowCheckable?: ({
    index,
    row,
  }: {
    index: number;
    row: IDataSource;
  }) => boolean;
}> = ({ setDataSource, maxDepth, isMultipleCheck, rowCheckable }) => {
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border"
      style={{ "--width": "30px" } as React.CSSProperties}
      rowSpan={maxDepth}
    >
      {(isMultipleCheck === undefined || isMultipleCheck === true) && (
        <input
          name="allCheck"
          type="checkbox"
          onChange={(e) => {
            setDataSource((prev) =>
              prev.map((p, index) => {
                if (rowCheckable !== undefined) {
                  if (rowCheckable({ index, row: p })) {
                    return { ...p, checked: e.target.checked };
                  }
                  return p;
                }

                return { ...p, checked: e.target.checked };
              })
            );
          }}
        />
      )}
    </th>
  );
};

// 트리의 깊이 계산
function calculateDepth(column: IDataTableColumn): number {
  if (!column.children) return 1;
  return 1 + Math.max(...column.children.map(calculateDepth));
}

// 트리의 폭(리프 노드의 개수) 계산
function calculateWidth(column: IDataTableColumn): number {
  if (!column.children) return 1;
  return column.children.reduce((sum, child) => sum + calculateWidth(child), 0);
}

const RowChangeOrderCell: React.FC<{ maxDepth: number }> = ({ maxDepth }) => {
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border"
      style={{ "--width": "30px" } as React.CSSProperties}
      rowSpan={maxDepth}
    >
      &nbsp;
    </th>
  );
};

function getMaxDepth(columns: IDataTableColumn[], currentDepth = 0) {
  if (!columns) {
    return currentDepth;
  }

  let maxDepth = currentDepth;
  columns.forEach((column) => {
    // 자식 컬럼이 있을 경우, 재귀적으로 깊이를 계산
    if (column.children && column.children.length > 0) {
      const childDepth = getMaxDepth(column.children, currentDepth + 1);
      maxDepth = Math.max(maxDepth, childDepth);
    }
  });

  return maxDepth;
}

function DevsDtTHead({ thead, setHeaderWidth }: TDevsDtThead) {
  const {
    columns,
    options,
    setDataSource,
    setColumns,
    sorter,
    setSorter,
    tbody,
    COLUMNS_STYLE_FORCE_UPDATE,
  } = useDt();
  const isResizingRef = React.useRef<boolean>(false);
  const resizingColumnRef = React.useRef<{
    startX: number;
    startWidth: number;
    endWidth: number;
    column: IDataTableColumn;
  } | null>(null);
  const rows = generateTableRows(columns);
  const maxDepth = getMaxDepth(columns, 0) + 1;
  const theadRef = React.useRef<HTMLTableElement>(null);

  React.useEffect(() => {
    if (!theadRef.current) return;

    const { width }: { width: number } =
      theadRef.current.getBoundingClientRect();

    setHeaderWidth(width);
  }, [rows]);

  const updateColumnWidth = (
    columns: IDataTableColumn[],
    targetField: string,
    newWidth: number
  ): IDataTableColumn[] => {
    return columns.map((column) => {
      // 컬럼이 자식 컬럼을 가지는 경우
      if (column.children) {
        return {
          ...column,
          children: updateColumnWidth(column.children, targetField, newWidth),
        };
      }

      // field가 일치하는 컬럼을 찾아서 width 업데이트
      if (column.field === targetField) {
        return { ...column, width: newWidth };
      }

      return column;
    });
  };

  // 마우스 이동 핸들러
  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (resizingColumnRef.current && setColumns !== undefined) {
        const { startX, startWidth } = resizingColumnRef.current;
        const flatColumns = columns.flatMap((x) =>
          x.children !== undefined && x.children.length > 0 ? x.children : x
        );

        const col = flatColumns.find(
          (f) => f.field === resizingColumnRef.current!.column.field
        );

        if (!col) return;

        const deltaX = e.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, col?.width ?? 100); // 최소 너비 50px

        resizingColumnRef.current.endWidth = newWidth;
        // columns 배열을 자식 컬럼까지 고려하여 업데이트
        const target = thead.current?.querySelector(
          `th[data-field='${col!.field}']`
        );

        const targetBodyCell = tbody!.current?.querySelectorAll(
          `tr > td[data-field='${col!.field}']`
        );

        const targetFootCell = tbody!.current?.querySelectorAll(
          `tr > td[data-field='${col!.field}']`
        );

        if (target) {
          (target as HTMLTableCellElement).style.setProperty(
            "--width",
            `${newWidth}px`
          );
        }

        if (targetBodyCell) {
          for (const cell of targetBodyCell) {
            const c = cell as HTMLTableCellElement;

            c.style.setProperty("--width", `${newWidth}px`);
          }
        }

        if (targetFootCell) {
          for (const cell of targetFootCell) {
            const c = cell as HTMLTableCellElement;

            c.style.setProperty("--width", `${newWidth}px`);
          }
        }

        COLUMNS_STYLE_FORCE_UPDATE((prev) => !prev);
      }
    },
    [setColumns, columns.length]
  );

  // 마우스 업 핸들러
  const handleMouseUp = React.useCallback(
    (e: MouseEvent) => {
      setColumns((prevColumns) =>
        updateColumnWidth(
          prevColumns,
          resizingColumnRef.current?.column.field!,
          resizingColumnRef.current?.endWidth!
        )
      );
      resizingColumnRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setTimeout(() => {
        isResizingRef.current = false;
      }, 100);
    },
    [handleMouseMove]
  );

  // 마우스 다운 핸들러
  const handleMouseDown = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      col: IDataTableColumn
    ) => {
      e.stopPropagation();
      isResizingRef.current = true;
      resizingColumnRef.current = {
        startX: e.clientX,
        startWidth: col.width ?? 100,
        endWidth: col.width ?? 100,
        column: col, // 현재 컬럼 정보 저장
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const checkOverflow = (col: IDataTableColumn) => {
    const { width, field } = col;

    const targetTds = document.querySelectorAll(
      `.devs-dt-tbody tr td[data-field='${field}']`
    );

    let maxWidth = width ?? 100;
    let findContentWidth = maxWidth;

    for (let td of targetTds) {
      const div = td.querySelector("div:first-child");

      if (!div) continue;

      // div의 콘텐츠 너비
      const contentWidth = div.scrollWidth;

      maxWidth = contentWidth > maxWidth ? contentWidth : maxWidth;
      findContentWidth = contentWidth > maxWidth ? contentWidth : maxWidth;
    }

    setColumns((prev) => updateColumnWidth(prev, field, maxWidth + 12));
  };

  function generateTableRows(allColumns: IDataTableColumn[]) {
    const maxDepth = Math.max(...allColumns.map(calculateDepth));
    const rows: JSX.Element[][] = Array.from({ length: maxDepth }, () => []);
    let idx = 0;

    function fillRows(columns: IDataTableColumn[], depth: number) {
      columns.forEach((column, index) => {
        const rowspan = column.children ? 1 : maxDepth - depth;
        const colspan = calculateWidth(column);

        const defaultClassString = "devs-dt-cell devs-dt-th";
        let classString = column.sticky
          ? `${defaultClassString} devs-dt-sticky-col`
          : defaultClassString;

        if (
          depth > 1 &&
          columns.length - 1 === index &&
          allColumns.length > idx
        ) {
          classString = classString + " devs-dt-no-hidden-border";
        }

        if (depth === 1) idx++;

        rows[depth].push(
          <th
            key={`col-${column.field}`}
            className={classString}
            rowSpan={rowspan}
            colSpan={colspan}
            data-field={column.field}
            data-col={true}
            data-sortable={
              column.children === undefined &&
              (column.sortable === undefined || column.sortable === true)
            }
            data-sorted={sorter.field === column.field}
            onClick={(e) => {
              if (
                column.children === undefined &&
                (column.sortable === undefined || column.sortable === true) &&
                !isResizingRef.current
              ) {
                setSorter((prev) => ({
                  field:
                    prev.field !== column.field
                      ? column.field
                      : prev.type === "desc"
                      ? null
                      : column.field,
                  type:
                    prev.field === column.field
                      ? prev.type === "asc"
                        ? "desc"
                        : "asc"
                      : "asc",
                }));
              }
            }}
            style={
              {
                "--width": `${
                  column.children !== undefined
                    ? "auto"
                    : (column.width ?? 100) + "px"
                }`,
                cursor:
                  column.children === undefined &&
                  (column.sortable === undefined || column.sortable === true)
                    ? "pointer"
                    : "inherit",
                ...column.style?.({ target: "thead", value: null, row: null }),
              } as React.CSSProperties
            }
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {column.title}
              </p>
              {column.children === undefined &&
                (column.sortable === undefined || column.sortable === true) && (
                  <div>
                    <span
                      className={`asc_ico${
                        sorter.field === column.field && sorter.type === "asc"
                          ? " sorter_active"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`desc_ico${
                        sorter.field === column.field && sorter.type === "desc"
                          ? " sorter_active"
                          : ""
                      }`}
                    ></span>
                  </div>
                )}
            </div>

            {column.children === undefined &&
              (column.resizing === undefined || column.resizing === true) && (
                <div
                  className={"devs-dt-resize-col"}
                  onMouseDown={(e) => handleMouseDown(e, column)}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={() => checkOverflow(column)}
                />
              )}
          </th>
        );

        if (column.children) {
          fillRows(column.children, depth + 1);
        }
      });
    }

    fillRows(allColumns, 0);
    return rows;
  }

  return (
    <div ref={thead} className="devs-dt-thead-wrapper">
      <table ref={theadRef} className="devs-dt-table devs-dt-table-fixed">
        <thead className="devs-dt-thead">
          {rows.map((row, rowIndex) => {
            if (rowIndex === 0) {
              return (
                <tr className="devs-dt-row" key={rowIndex}>
                  {options?.enabledRowOrder && (
                    <RowChangeOrderCell maxDepth={maxDepth} />
                  )}
                  {options?.enabledExpand && (
                    <RowExpandCell
                      maxDepth={maxDepth}
                      setDataSource={setDataSource}
                    />
                  )}
                  {options?.showRowNumber && (
                    <RowNumberCell maxDepth={maxDepth} />
                  )}
                  {options?.enabledRowCheck && (
                    <RowCheckCell
                      setDataSource={setDataSource}
                      maxDepth={maxDepth}
                      isMultipleCheck={options.multipleRowCheck}
                      rowCheckable={options?.rowCheckable}
                    />
                  )}
                  {row}
                  <th
                    className="devs-dt-cell devs-dt-th devs-dt-empty-header"
                    rowSpan={maxDepth}
                  ></th>
                  <th
                    className="devs-dt-cell devs-dt-th devs-dt-scrollbar-header"
                    rowSpan={maxDepth}
                  ></th>
                </tr>
              );
            } else {
              return (
                <tr className="devs-dt-row" key={rowIndex}>
                  {row}
                </tr>
              );
            }
          })}
        </thead>
      </table>
    </div>
  );
}

export default React.memo(DevsDtTHead);
