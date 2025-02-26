import React from "react";
import { useDt } from "../context/devs-dt-context";
import { IDataTableColumn } from "../_types";
import { Controller } from "react-hook-form";
import { getDefaultValue } from "./devs-dt-slider-form";

const DataEditor: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const {
      focusedRow: row,
      dataSource,
      focusedRowForm,
      setDataSource,
    } = useDt();
    const defaultValue = focusedRowForm?.getValues(col.field);
    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm === null) return null;

    return (
      <Controller
        control={focusedRowForm.control}
        name={col.field}
        defaultValue={getDefaultValue(defaultValue)}
        rules={{ required: col.required }}
        render={({ field: { onChange } }) =>
          col.editor!({
            value: defaultValue,
            row: row!,
            index: rowIndex,
            onChange,
            setValue: focusedRowForm.setValue,
            getValue: focusedRowForm.getValues,
            setDataSource,
          })
        }
      />
    );
  }
);

export default DataEditor;
