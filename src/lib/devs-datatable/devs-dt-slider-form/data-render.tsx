import React from "react";
import { useDt } from "../context/devs-dt-context";
import { IDataTableColumn } from "../_types";

const DataRender: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const { focusedRow: row, dataSource, focusedRowForm } = useDt();
    const defaultValue = row?.[col.field];
    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm === null) return null;

    return col.render!({
      value: defaultValue,
      row: row!,
      index: rowIndex,
      getValue: focusedRowForm.getValues,
    });
  }
);

export default DataRender;
