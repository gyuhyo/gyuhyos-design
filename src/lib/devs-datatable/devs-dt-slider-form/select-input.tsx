import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import { getDefaultValue } from "./devs-dt-slider-form";
import { useFormErrors } from "./data-form-error-context";

const SelectInput: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const errors = useFormErrors();
    const {
      focusedRow: row,
      dataSource,
      setDataSource,
      focusedRowForm,
    } = useDt();
    const defaultValue = focusedRowForm?.getValues(col.field);

    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm === null) return null;

    return (
      <Controller
        control={focusedRowForm.control}
        name={col.field}
        defaultValue={getDefaultValue({
          val: defaultValue,
          col: col,
          row: row!,
          rowIndex,
          getValue: focusedRowForm.getValues,
        })}
        rules={{ required: col.required }}
        render={({ field: { onChange } }) => (
          <Select
            status={errors?.hasOwnProperty(col.field) ? "error" : undefined}
            style={{ width: "100%" }}
            showSearch={true}
            onChange={(v) => {
              onChange(v);
              if (col.onChange !== undefined) {
                col.onChange({
                  value: v,
                  row: row!,
                  index: rowIndex,
                  setDataSource: setDataSource,
                  setValue: focusedRowForm.setValue,
                  getValue: focusedRowForm.getValues,
                });
              }
            }}
            defaultValue={getDefaultValue({
              val: defaultValue,
              col: col,
              row: row!,
              rowIndex,
              getValue: focusedRowForm.getValues,
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
