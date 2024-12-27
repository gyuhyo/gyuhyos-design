import React from "react";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import DevsDtRow from "../devs-dt-row";
import EmptySvg from "../assets/empty.svg";
import {
  DragDropContext,
  Draggable,
  DragUpdate,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

type TDevsDtTBody = {
  tbody: React.RefObject<HTMLDivElement>;
  headerWidth: number;
};

function DevsDtTBody({ tbody, headerWidth }: TDevsDtTBody) {
  const { columns, dataSource, setDataSource, options, formsRef, sorter } =
    useDt();
  const [isDrop, setIsDrop] = React.useState(false);

  const keyField: string | undefined = React.useMemo(() => {
    return columns.find((col) => col.key)?.field;
  }, [columns]);

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

  const lastNode = React.useMemo(() => getLastNodes(columns), [columns]);

  const nodeCount = React.useMemo(() => {
    const fixedCount =
      (options?.enabledExpand ? 1 : 0) +
      (options?.enabledRowCheck ? 1 : 0) +
      (options?.showRowNumber ? 1 : 0) +
      (options?.enabledRowOrder ? 1 : 0);
    return lastNode.length + fixedCount;
  }, [lastNode, options]);

  const sortDataSource = React.useCallback(
    (d: IDataSource[]): IDataSource[] => {
      const findSorterField = columns.find(
        (col) => col.field === sorter.field!
      );
      const newRows = d.filter((x) => x.mode === "c");
      const nullRows =
        findSorterField?.isNotNullSort === true
          ? d.filter(
              (x) =>
                x[sorter.field!] === "" ||
                x[sorter.field!] === null ||
                x[sorter.field!] === undefined
            )
          : [];

      if (sorter.field === null || sorter.field === undefined) {
        return [
          ...newRows,
          ...d
            .filter((x) => x.mode !== "c")
            .sort(
              (a: IDataSource, b: IDataSource) => a.originIndex - b.originIndex
            ),
        ];
      }

      const sortedDataSource = d
        .filter((x) => {
          if (findSorterField?.isNotNullSort === true) {
            return (
              x.mode !== "c" &&
              x[sorter.field!] !== "" &&
              x[sorter.field!] !== null &&
              x[sorter.field!] !== undefined
            );
          }

          return x.mode !== "c";
        })
        .sort((a: IDataSource, b: IDataSource) => {
          if (sorter.type === "desc") {
            if (a[sorter.field!] === b[sorter.field!]) {
              return a.originIndex - b.originIndex;
            } else {
              if (a[sorter.field!] > b[sorter.field!]) {
                return -1;
              } else {
                return 1;
              }
            }
          }

          if (a[sorter.field!] === b[sorter.field!]) {
            return a.originIndex - b.originIndex;
          } else {
            if (a[sorter.field!] > b[sorter.field!]) {
              return 1;
            } else {
              return -1;
            }
          }
        });

      return [...newRows, ...sortedDataSource, ...nullRows];
    },
    [sorter, columns]
  );

  const mergedDataSource: IDataSource[] | undefined = React.useMemo(() => {
    if (
      dataSource.length === 0 ||
      (dataSource.length > 0 && !dataSource[0].hasOwnProperty("mode"))
    )
      return;

    const copyDataSource = JSON.parse(
      JSON.stringify(sortDataSource(dataSource))
    );

    for (let d of copyDataSource) {
      delete d["_merge"];
    }

    const isMergedField = lastNode.filter((x) => x.merge === true);

    for (let d of isMergedField) {
      let end = false;

      for (let i = 0; i < copyDataSource.length - 1; i++) {
        copyDataSource[i]["_merge"] = {
          ...copyDataSource[i]["_merge"],
          [d.field]: {
            rowSpan: 1,
            hidden: false,
          },
        };

        if (
          copyDataSource[i].mode === "c" ||
          copyDataSource[i].mode === "u" ||
          copyDataSource[i].expand === true ||
          copyDataSource[i].editedCells?.includes(d.field)
        ) {
          continue;
        }

        for (let j = i + 1; j < copyDataSource.length; j++) {
          if (
            copyDataSource[i][d.field] !== copyDataSource[j][d.field] ||
            copyDataSource[j]["mode"] === "c" ||
            copyDataSource[j]["mode"] === "u" ||
            copyDataSource[j].expand === true ||
            copyDataSource[j].editedCells?.includes(d.field)
          ) {
            i = j - 1;
            break;
          }

          if (d.mergeOptions !== undefined) {
            const nextData =
              j + 1 > copyDataSource.length ? null : copyDataSource[j + 1];

            if (
              !d.mergeOptions({
                prev: copyDataSource[j - 1],
                curr: copyDataSource[j],
                next: nextData,
              })
            ) {
              i = j - 1;
              break;
            }
          }

          copyDataSource[i]["_merge"] = {
            ...copyDataSource[i]["_merge"],
            [d.field]: {
              rowSpan: copyDataSource[i]["_merge"][d.field]["rowSpan"] + 1,
              hidden: false,
            },
          };

          copyDataSource[j]["_merge"] = {
            ...copyDataSource[j]["_merge"],
            [d.field]: { rowSpan: 1, hidden: true },
          };

          if (j === copyDataSource.length - 1) {
            end = true;
          }
        }

        if (end) break;
      }
    }

    if (JSON.stringify(copyDataSource) !== JSON.stringify(dataSource)) {
      return copyDataSource;
    }

    return dataSource;
  }, [dataSource, lastNode, sorter]);

  const setRowOrderChange = React.useCallback(
    (e: DropResult<string>) => {
      setIsDrop(false);
      if (!e.destination) return;

      const startIndex = e.source.index;
      const endIndex = e.destination.index;

      if (startIndex === endIndex) return;

      // 데이터 순서 변경
      const newDataSource = [...dataSource];
      const [removed] = newDataSource.splice(startIndex, 1);
      newDataSource.splice(endIndex, 0, removed);

      setDataSource(
        newDataSource.map((x, idx) => ({ ...x, originIndex: idx }))
      );

      if (options?.rowOrderEnd !== undefined) {
        options.rowOrderEnd(newDataSource);
      }
    },
    [dataSource]
  );

  const onDragUpdate = React.useCallback(
    (e: DragUpdate<string>) => {
      let targetIndex = e.destination?.index;

      if (!targetIndex) return;

      if (dataSource[targetIndex].mode === "c") {
        setIsDrop(true);
      }
    },
    [dataSource]
  );

  if (dataSource === undefined || dataSource.length === 0) {
    return (
      <div ref={tbody} className="devs-dt-tbody-wrapper">
        <div
          className="devs-dt-table devs-dt-table-fixed"
          style={{ width: headerWidth, height: "100%" }}
        >
          <div className="devs-dt-tbody" style={{ position: "relative" }}>
            <EmptySvg />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={tbody} className="devs-dt-tbody-wrapper">
      <DragDropContext
        onDragEnd={setRowOrderChange}
        onDragStart={(e) => {}}
        onDragUpdate={onDragUpdate}
      >
        <Droppable
          droppableId="droppable"
          mode="standard"
          type=""
          direction="vertical"
          isDropDisabled={isDrop}
        >
          {(provided) => (
            <table
              className="devs-dt-table devs-dt-table-fixed"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <tbody className="devs-dt-tbody">
                {mergedDataSource &&
                  mergedDataSource
                    .filter((f) => f.rowId)
                    .map((row, index) => {
                      return (
                        <Draggable
                          draggableId={row.rowId}
                          index={index}
                          key={row.rowId}
                          isDragDisabled={
                            !options?.enabledRowOrder || row.mode === "c"
                          }
                        >
                          {(provided2, snapshot) => {
                            var style = provided2.draggableProps.style;
                            if (style !== undefined) {
                              var transform =
                                provided2.draggableProps.style!.transform;
                              if (transform) {
                                var t = transform.split(",")[1];
                                provided2.draggableProps.style!.transform =
                                  "translate(0px," + t;
                              }
                            }
                            return (
                              <React.Fragment key={row.rowId}>
                                <DevsDtRow
                                  key={row.rowId}
                                  index={index}
                                  rowKey={row.rowId}
                                  data={row}
                                  lastNode={lastNode}
                                  dragProvided={provided2}
                                  dragSnapshot={snapshot}
                                />
                                {options?.enabledExpand === true && (
                                  <tr
                                    style={{
                                      display: row.expand
                                        ? "table-row"
                                        : "none",
                                    }}
                                  >
                                    <td
                                      className="devs-dt-cell devs-dt-td"
                                      style={{
                                        padding: "7px",
                                        height: "0px",
                                      }}
                                      colSpan={nodeCount}
                                    >
                                      {options?.expandContent?.(row)}
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default React.memo(DevsDtTBody);
