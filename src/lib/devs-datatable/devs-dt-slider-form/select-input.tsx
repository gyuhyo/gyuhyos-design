import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import { getDefaultValue } from "./devs-dt-slider-form";

const SelectInput: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const {
      focusedRow: row,
      dataSource,
      setDataSource,
      focusedRowForm,
    } = useDt();
    const defaultValue = row?.[col.field] ?? null;

    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm.current === null) return null;

    return (
      <Controller
        control={focusedRowForm.current!.control}
        name={col.field}
        defaultValue={getDefaultValue({
          val: defaultValue,
          col: col,
          row: row!,
          rowIndex,
          getValue: focusedRowForm.current!.getValues,
        })}
        rules={{ required: col.required }}
        render={({ field: { onChange } }) => (
          <Select
            style={{ width: "auto" }}
            showSearch={true}
            onChange={(v) => {
              onChange(v);
              if (col.onChange !== undefined) {
                col.onChange({
                  value: v,
                  row: row!,
                  index: rowIndex,
                  setDataSource: setDataSource,
                  setValue: focusedRowForm.current!.setValue,
                  getValue: focusedRowForm.current!.getValues,
                });
              }
            }}
            defaultValue={getDefaultValue({
              val: defaultValue,
              col: col,
              row: row!,
              rowIndex,
              getValue: focusedRowForm.current!.getValues,
            })}
            {...col.inputOptions}
          >
            {col.options &&
              col.options.map((op) => (
                <Select.Option key={op.value} value={op.value}>
                  {op.label}
                </Select.Option>
              ))}
          </Select>
        )}
      />
    );
  }
);

export default React.memo(SelectInput);
