import React from "react";
import { IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getDefaultValue } from "./devs-dt-slider-form";

const DateInput: React.FC<any> = React.memo(
  ({ col }: { col: IDataTableColumn }) => {
    const {
      focusedRow: row,
      dataSource,
      setDataSource,
      focusedRowForm,
    } = useDt();
    const defaultValue = row?.[col.field];
    const rowIndex = dataSource.indexOf(row!);

    if (focusedRowForm.current === null) return null;

    return (
      <Controller
        control={focusedRowForm.current!.control}
        name={col.field}
        defaultValue={getDefaultValue({
          val: defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null,
          col: col,
          row: row!,
          rowIndex,
          getValue: focusedRowForm.current!.getValues,
        })}
        rules={{ required: col.required }}
        render={({ field: { onChange } }) => (
          <DatePicker
            style={{ width: "100%" }}
            placeholder="날짜 선택"
            value={getDefaultValue({
              val: defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null,
              col: col,
              row: row!,
              rowIndex,
              getValue: focusedRowForm.current!.getValues,
            })}
            onChange={(_, v) => {
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
            {...col.inputOptions}
          />
        )}
      />
    );
  }
);

export default React.memo(DateInput);
