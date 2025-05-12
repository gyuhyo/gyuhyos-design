import React from "react";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";

const useDtUtils = () => {
  const {
    columns,
    focusedCell,
    setFocusedCell,
    dataSource,
    setDataSource,
    focusedRow,
    setFocusedRow,
    options,
    formsRef,
  } = useDt();

  const lastNodes = React.useMemo((): IDataTableColumn[] => {
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
  }, [columns]);

  React.useEffect(() => {
    if (
      !focusedRow ||
      !focusedCell ||
      options?.editType === "cell" ||
      focusedRow.mode === "r"
    )
      return;

    const onFocusedCellKeyDown = (e: KeyboardEvent) => {
      const current = document.querySelector(
        ".devs-dt-cell:has(input:not([type='submit'],[type='checkbox']):focus)"
      );

      if (!current) return;
      const currentForm = formsRef.current[focusedRow.rowId];

      if (!currentForm) return;

      const currentField = current.getAttribute("data-field");
    };

    window.addEventListener("keydown", onFocusedCellKeyDown);

    return () => {
      window.removeEventListener("keydown", onFocusedCellKeyDown);
    };
  }, [focusedCell, lastNodes, dataSource, focusedRow, options]);
};

export default useDtUtils;
