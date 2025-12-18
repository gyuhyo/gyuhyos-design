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
import useDtUtils from "../hooks/useDtUtils";
import DevsDtTFoot from "../devs-dt-tfoot";
import useDragTds from "../hooks/useDragTds";

type TDevsDtTBody = {
  tbody: React.MutableRefObject<HTMLDivElement | null>;
  headerWidth: number;
};

function DevsDtTBody({ tbody, headerWidth }: TDevsDtTBody) {
  const {
    columns,
    dataSource,
    setDataSource,
    options,
    formsRef,
    sorter,
    currentPage,
    onCellDragging,
    onCellDragEnd,
  } = useDt();
  const [limit, setLimit] = React.useState(30);
  const [isDrop, setIsDrop] = React.useState(false);
  const {
    setTableRef,
    isDragging,
    cells,
    rowCount,
    cellCount,
    fields,
    data,
    csv,
  } = useDragTds();
  useDtUtils();

  React.useEffect(() => {
    if (!data) return;

    if (isDragging) {
      onCellDragging?.({ cells, rowCount, cellCount, fields, data, csv });
    } else {
      onCellDragEnd?.({ cells, rowCount, cellCount, fields, data, csv });
    }
  }, [isDragging, data]);

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

  const getDefaultValue = (
    col: IDataTableColumn,
    row: IDataSource,
    rowIndex: number,
    val: any
  ) => {
    if (col?.render !== undefined) {
      const form = formsRef.current[row.rowId];
      const renderResult = col?.render({
        row: row,
        value: val,
        index: rowIndex,
        getValue: form?.getValues,
        watch: form?.watch,
      });

      if (
        typeof renderResult === "string" ||
        typeof renderResult === "number" ||
        typeof renderResult === "boolean" ||
        typeof renderResult === "bigint"
      ) {
        if (typeof renderResult === "string") {
          const isNanCheck = isNaN(parseFloat(renderResult));

          if (!isNanCheck) {
            return parseFloat(renderResult.replace(",", ""));
          }
        }
        return renderResult;
      }
    }

    if (col?.defaultValue !== undefined) {
      const value = col.defaultValue({
        row,
        value: val,
        index: rowIndex,
      });

      return value;
    }

    return val;
  };

  const sortDataSource = React.useCallback(
    (d: IDataSource[]): IDataSource[] => {
      const findSorterField = columns.find(
        (col) => col.field === sorter.field!
      );
      //if (!findSorterField) return d;

      const newRows = d.filter((x) => x.mode === "c");
      const nullRows =
        findSorterField?.isNotNullSort === true
          ? d.filter((x, idx) => {
              const val = getDefaultValue(
                findSorterField,
                x,
                idx,
                x[sorter.field!]
              );

              return val === "" || val === null || val === undefined;
            })
          : [];

      if (sorter.field === null || sorter.field === undefined) {
        if (options?.pagination) {
          const limit = options?.paginationLimit ?? 20;

          return [
            ...d
              .filter((x) => x.mode !== "c")
              .sort(
                (a: IDataSource, b: IDataSource) =>
                  a.originIndex - b.originIndex
              )
              .slice((currentPage - 1) * limit, currentPage * limit),
          ];
        }

        return [
          ...d.sort(
            (a: IDataSource, b: IDataSource) => a.originIndex - b.originIndex
          ),
        ];
      }

      const sortedDataSource = d
        .filter((x, idx) => {
          if (findSorterField?.isNotNullSort === true) {
            const val = getDefaultValue(
              findSorterField,
              x,
              idx,
              x[sorter.field!]
            );

            return (
              x.mode !== "c" && val !== "" && val !== null && val !== undefined
            );
          }

          return x.mode !== "c";
        })
        .sort((a: IDataSource, b: IDataSource) => {
          const valA = getDefaultValue(
            findSorterField!,
            a,
            a.originIndex,
            a[sorter.field!]
          );

          const valB = getDefaultValue(
            findSorterField!,
            b,
            b.originIndex,
            b[sorter.field!]
          );

          if (sorter.type === "desc") {
            if (valA === valB) {
              return a.originIndex - b.originIndex;
            } else {
              if (valA > valB) {
                return -1;
              } else {
                return 1;
              }
            }
          }

          if (valA === valB) {
            return a.originIndex - b.originIndex;
          } else {
            if (valA > valB) {
              return 1;
            } else {
              return -1;
            }
          }
        });

      if (options?.pagination) {
        const limit = options?.paginationLimit ?? 20;

        return [
          ...(currentPage === 1 ? newRows : []),
          ...[...sortedDataSource, ...nullRows].slice(
            (currentPage - 1) * limit,
            currentPage * limit
          ),
        ];
      }

      return [...newRows, ...sortedDataSource, ...nullRows];
    },
    [
      sorter,
      columns,
      options?.pagination,
      options?.paginationLimit,
      currentPage,
    ]
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
  }, [dataSource, lastNode, sorter, currentPage]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !tbody.current) return;

    const handleScroll = () => {
      if (
        tbody.current &&
        tbody.current.scrollHeight -
          tbody.current.scrollTop -
          tbody.current.clientHeight <=
          20
      ) {
        setLimit((prev) => prev + 20);
      }
    };

    tbody.current.addEventListener("scroll", handleScroll);

    return () => {
      if (tbody.current) {
        tbody.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
          style={{ width: headerWidth - 15, height: "100%" }}
        >
          <div className="devs-dt-tbody" style={{ position: "relative" }}></div>
        </div>
        <EmptySvg />
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
              ref={(el) => {
                provided.innerRef(el);
                setTableRef(el);
              }}
              {...provided.droppableProps}
            >
              <tbody className="devs-dt-tbody">
                {mergedDataSource &&
                  mergedDataSource
                    .filter((f) => f.rowId)
                    .slice(0, limit)
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
      {lastNode.filter((f) => f.footer).length > 0 && <DevsDtTFoot />}
    </div>
  );
}

export default React.memo(DevsDtTBody);
