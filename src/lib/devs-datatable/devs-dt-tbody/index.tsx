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
  const { columns, dataSource, setDataSource, options, formsRef } = useDt();
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

  const mergedDataSource: IDataSource[] = React.useMemo(() => {
    if (
      dataSource.length === 0 ||
      (dataSource.length > 0 && !dataSource[0].hasOwnProperty("mode"))
    )
      return;

    let end = false;
    const copyDataSource = JSON.parse(JSON.stringify(dataSource));

    for (let d of copyDataSource) {
      delete d["_merge"];
    }

    const isMergedField = lastNode.filter((x) => x.merge === true);

    for (let d of isMergedField) {
      for (let i = 0; i < copyDataSource.length - 1; i++) {
        copyDataSource[i]["_merge"] = {
          ...copyDataSource[i]["_merge"],
          [d.field]: {
            rowSpan: 1,
            hidden: false,
          },
        };

        if (copyDataSource[i].mode === "c" || copyDataSource[i].mode === "u")
          continue;

        for (let j = i + 1; j < copyDataSource.length; j++) {
          if (
            copyDataSource[i][d.field] !== copyDataSource[j][d.field] ||
            copyDataSource[j]["mode"] === "c" ||
            copyDataSource[j]["mode"] === "u"
          ) {
            i = j - 1;
            break;
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
  }, [dataSource, lastNode]);

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

      setDataSource(newDataSource);
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
        onDragStart={(e) => console.log("start", e)}
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
                          {(provided2, snapshot) => (
                            <DevsDtRow
                              key={row.rowId}
                              index={index}
                              rowKey={row.rowId}
                              data={row}
                              lastNode={lastNode}
                              dragProvided={provided2}
                              dragSnapshot={snapshot}
                            />
                          )}
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
