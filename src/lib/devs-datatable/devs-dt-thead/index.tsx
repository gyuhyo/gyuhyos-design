import React from "react";
import { useDt } from "../context/devs-dt-context";
import DevsDtTh from "./devs-dt-th";
import { IDataTableColumn } from "../_types";

type TDevsDtThead = {
  thead: React.RefObject<HTMLDivElement>;
  setHeaderWidth: React.Dispatch<React.SetStateAction<number>>;
};

const RowNumberCell: React.FC<{ maxDepth: number }> = ({ maxDepth }) => {
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
      style={{ "--width": "50px" } as React.CSSProperties}
      rowSpan={maxDepth}
    >
      No
    </th>
  );
};

const RowCheckCell: React.FC<{
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
  maxDepth: number;
}> = ({ setDataSource, maxDepth }) => {
  return (
    <th
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
      style={{ "--width": "30px" } as React.CSSProperties}
      rowSpan={maxDepth}
    >
      <input
        name="allCheck"
        type="checkbox"
        onChange={(e) => {
          setDataSource((prev) =>
            prev.map((p) => ({ ...p, checked: e.target.checked }))
          );
        }}
      />
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
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
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
  const { columns, options, setDataSource, setColumns } = useDt();
  const resizingColumnRef = React.useRef<{
    startX: number;
    startWidth: number;
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

  // 마우스 이동 핸들러
  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (resizingColumnRef.current && setColumns !== undefined) {
        const { startX, startWidth } = resizingColumnRef.current;
        const col = columns.find(
          (f) => f.field === resizingColumnRef.current!.column.field
        );

        const deltaX = e.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, col?.width ?? 100); // 최소 너비 50px
        setColumns((prevColumns) =>
          prevColumns.map((m) =>
            m.field === resizingColumnRef.current?.column.field
              ? { ...m, width: newWidth }
              : { ...m }
          )
        );
      }
    },
    [resizingColumnRef, setColumns]
  );

  // 마우스 업 핸들러
  const handleMouseUp = React.useCallback(() => {
    resizingColumnRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  // 마우스 다운 핸들러
  const handleMouseDown = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      col: IDataTableColumn
    ) => {
      resizingColumnRef.current = {
        startX: e.clientX,
        startWidth: col.width ?? 100,
        column: col, // 현재 컬럼 정보 저장
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  function generateTableRows(columns: IDataTableColumn[]) {
    const maxDepth = Math.max(...columns.map(calculateDepth));
    const rows: JSX.Element[][] = Array.from({ length: maxDepth }, () => []);

    function fillRows(columns: IDataTableColumn[], depth: number) {
      columns.forEach((column) => {
        const rowspan = column.children ? 1 : maxDepth - depth;
        const colspan = calculateWidth(column);

        const defaultClassString = "devs-dt-cell devs-dt-th";
        const classString = column.sticky
          ? `${defaultClassString} devs-dt-sticky-col`
          : defaultClassString;

        rows[depth].push(
          <th
            key={`col-${column.field}`}
            className={classString}
            rowSpan={rowspan}
            colSpan={colspan}
            data-col={true}
            style={
              {
                "--width": `${column.width ?? 100}px`,
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
              <p>{column.title}</p>
              {/* <div>
                <span className="asc_ico"></span>
                <span className="desc_ico"></span>
              </div> */}
            </div>

            {column.resizing === true && (
              <div
                className={"devs-dt-resize-col"}
                onMouseDown={(e) => handleMouseDown(e, column)}
              />
            )}
          </th>
        );

        if (column.children) {
          fillRows(column.children, depth + 1);
        }
      });
    }

    fillRows(columns, 0);
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
                  {options?.showRowNumber && (
                    <RowNumberCell maxDepth={maxDepth} />
                  )}
                  {options?.enabledRowCheck && (
                    <RowCheckCell
                      setDataSource={setDataSource}
                      maxDepth={maxDepth}
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
