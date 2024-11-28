import dayjs from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
import { DatePicker, InputNumber, Select } from "antd";
import { useDt } from "../context/devs-dt-context";

type TDevsDtCell = {
  col: IDataTableColumn;
  mode: string;
  defaultValue: any;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  error: boolean;
  autoFocus: boolean;
  row: IDataSource;
  merge?: {
    rowSpan: number;
    hidden: boolean;
  };
};

function DevsDtCell({
  register,
  control,
  col,
  mode,
  defaultValue,
  error,
  autoFocus,
  row,
  merge,
}: TDevsDtCell) {
  const { focusedRow, focusedCell, setFocusedCell } = useDt();
  const cellRef = React.useRef<HTMLTableCellElement>(null);
  const classString = React.useMemo(() => {
    var classes: string[] = [];

    if (cellRef.current) {
      const refClasses = cellRef.current.classList.value.split(" ");
      if (refClasses.indexOf("devs-dt-cell") === -1) {
        refClasses.push("devs-dt-cell");
      }

      if (
        col.sticky == true &&
        refClasses.indexOf("devs-dt-sticky-col") === -1
      ) {
        refClasses.push("devs-dt-sticky-col");
      }

      if (error) {
        if (refClasses.indexOf("devs-dt-cell-error") === -1) {
          refClasses.push("devs-dt-cell-error");
        }
      } else {
        const index = refClasses.indexOf("devs-dt-cell-error");
        if (index > -1) {
          refClasses.splice(index, 1);
        }
      }

      classes = refClasses;
    } else {
      classes = ["devs-dt-cell"];
      if (col.sticky == true) {
        classes.push("devs-dt-sticky-col");
      }
    }
    const index = classes.indexOf("devs-dt-focused-cell");
    if (index > -1) {
      classes.splice(index, 1);
    }
    if (focusedRow === row && focusedCell === col.field && index === -1) {
      classes.push("devs-dt-focused-cell");
    }

    return classes.join(" ");
  }, [col.sticky, error, focusedCell, focusedRow]);

  const cellComp = React.useMemo(() => {
    if (col.type === "date") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue ? dayjs(defaultValue) : null}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <DatePicker
              size="small"
              placeholder="날짜 선택"
              defaultValue={defaultValue ? dayjs(defaultValue) : null}
              onChange={(_, v) => onChange(v)}
              autoFocus={autoFocus}
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (col.type === "select") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue || null}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <Select
              size="small"
              onChange={onChange}
              defaultValue={defaultValue || null}
              autoFocus={autoFocus}
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

    if (col.type === "number") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue || null}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <InputNumber
              size="small"
              onChange={onChange}
              defaultValue={defaultValue || null}
              autoFocus={autoFocus}
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (col.editor !== undefined) {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue || null}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) =>
            col.editor!({
              value: defaultValue,
              rowData: row,
              index: -1,
              onChange,
            })
          }
        />
      );
    }

    return (
      <input
        {...register(col.field, {
          required: col.required ? "필수 입력사항 입니다." : false,
        })}
        type="text"
        defaultValue={defaultValue || null}
        autoFocus={autoFocus}
        {...col.inputOptions}
      />
    );
  }, [col]);

  const Cell = React.useMemo(() => {
    if (
      mode === undefined ||
      mode === "r" ||
      (mode === "u" && col.updatable === false) ||
      (mode === "c" && col.editable === false)
    ) {
      if (col.render !== undefined) {
        return col.render({ value: defaultValue, rowData: row, index: -1 });
      } else {
        return <span>{defaultValue}</span>;
      }
    } else {
      return cellComp;
    }
  }, [defaultValue, row, col, mode]);

  if (merge !== undefined && merge.hidden === true) {
    return (
      <td
        ref={cellRef}
        className={classString}
        rowSpan={0}
        data-hidden={true}
        data-width={col.width}
        style={
          {
            display: "none",
            "--width": col.width ? `${col.width}px` : `100px`,
            textAlign: col.align ?? "left",
            ...col.style,
          } as React.CSSProperties
        }
      />
    );
  }

  return (
    <td
      ref={cellRef}
      className={classString}
      rowSpan={merge?.rowSpan}
      data-hidden={false}
      data-width={col.width ?? 100}
      style={
        {
          "--width": col.width ? `${col.width}px` : `100px`,
          textAlign: col.align ?? "left",
          ...col.style,
        } as React.CSSProperties
      }
    >
      {Cell}
    </td>
  );
}

export default React.memo(DevsDtCell);
