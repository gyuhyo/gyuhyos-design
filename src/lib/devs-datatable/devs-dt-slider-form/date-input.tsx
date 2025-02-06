import React from "react";
import { IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getDefaultValue } from "./devs-dt-slider-form";
import { useFormErrors } from "./data-form-error-context";

const DateInput: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const errors = useFormErrors();
    const {
      focusedRow: row,
      dataSource,
      setDataSource,
      focusedRowForm,
    } = useDt();
    const defaultValue = focusedRowForm?.getValues(col.field) ?? undefined;
    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm === null) return null;

    return (
      <Controller
        control={focusedRowForm.control}
        name={col.field}
        defaultValue={getDefaultValue({
          val: defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : undefined,
          col: col,
          row: row!,
          rowIndex,
          getValue: focusedRowForm.getValues,
        })}
        rules={{ required: col.required }}
        render={({ field: { onChange } }) => (
          <DatePicker
            status={errors?.hasOwnProperty(col.field) ? "error" : undefined}
            style={{ width: "100%" }}
            placeholder="날짜 선택"
            defaultValue={getDefaultValue({
              val: defaultValue
                ? dayjs(defaultValue).tz("Asia/Seoul")
                : undefined,
              col: col,
              row: row!,
              rowIndex,
              getValue: focusedRowForm.getValues,
            })}
            onChange={(_, v) => {
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
            {...col.inputOptions}
          />
        )}
      />
    );
  }
);

export default React.memo(DateInput);
