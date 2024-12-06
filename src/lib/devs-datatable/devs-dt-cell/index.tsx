import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
import { DatePicker, InputNumber, Select } from "antd";
import { useDt } from "../context/devs-dt-context";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("ko");

type TDevsDtCell = {
  col: IDataTableColumn;
  mode: string;
  defaultValue: any;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  error: boolean;
  autoFocus: boolean;
  row: IDataSource;
  rowIndex: number;
  merge?: {
    rowSpan: number;
    hidden: boolean;
  };
  setValue: UseFormSetValue<IDataSource>;
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
  setValue,
  rowIndex,
}: TDevsDtCell) {
  const { focusedRow, focusedCell, setFocusedCell, setDataSource, setColumns } =
    useDt();
  const cellRef = React.useRef<HTMLTableCellElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateColumnWidth = (
      columns: IDataTableColumn[],
      targetField: string,
      newWidth: number
    ): IDataTableColumn[] => {
      return columns.map((column) => {
        // 컬럼이 자식 컬럼을 가지는 경우
        if (column.children) {
          return {
            ...column,
            children: updateColumnWidth(column.children, targetField, newWidth),
          };
        }

        // field가 일치하는 컬럼을 찾아서 width 업데이트
        if (column.field === targetField) {
          return { ...column, width: newWidth };
        }

        return column;
      });
    };

    const checkOverflow = () => {
      const tdElement = cellRef.current;
      const divElement = divRef.current;

      if (!tdElement || !divElement) return;

      // td의 실제 너비
      const tdWidth = tdElement.getBoundingClientRect().width;

      // div의 콘텐츠 너비
      const contentWidth = divElement.scrollWidth;

      // 콘텐츠가 td보다 크다면
      if (contentWidth > tdWidth && contentWidth > (col.width ?? 100)) {
        setColumns((prev) =>
          updateColumnWidth(prev, col.field, contentWidth + 12)
        );
      }
    };

    // 초기에 한 번 실행
    checkOverflow();
  }, []);

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
              onChange={(_, v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                  });
                }
              }}
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
              showSearch={true}
              onChange={(v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                  });
                }
              }}
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
              onChange={(v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                  });
                }
              }}
              defaultValue={defaultValue || null}
              autoFocus={autoFocus}
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (col.type === "textarea") {
      return (
        <textarea
          {...register(col.field, {
            required: col.required,
            onChange: (e) => {
              if (col.onChange !== undefined) {
                col.onChange({
                  value: e.target.value,
                  row: row,
                  index: rowIndex,
                  setDataSource: setDataSource,
                  setValue: setValue,
                });
              }
            },
          })}
          defaultValue={defaultValue || null}
          autoFocus={autoFocus}
          {...col.inputOptions}
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
              row: row,
              index: rowIndex,
              onChange,
            })
          }
        />
      );
    }

    return (
      <input
        {...register(col.field, {
          required: col.required,
          onChange: (e) => {
            if (col.onChange !== undefined) {
              col.onChange({
                value: e.target.value,
                row: row,
                index: rowIndex,
                setDataSource: setDataSource,
                setValue: setValue,
              });
            }
          },
        })}
        type="text"
        defaultValue={defaultValue || null}
        autoFocus={autoFocus}
        autoComplete="off"
        {...col.inputOptions}
      />
    );
  }, [col, autoFocus, defaultValue, row, rowIndex]);

  const Cell = React.useMemo(() => {
    if (
      mode === undefined ||
      mode === "r" ||
      (mode === "u" && col.updatable === false) ||
      (mode === "c" && col.editable === false)
    ) {
      if (col.render !== undefined) {
        return col.render({ value: defaultValue, row: row, index: rowIndex });
      } else {
        return (
          <span>
            {col.type === "number"
              ? defaultValue?.toLocaleString()
              : defaultValue}
          </span>
        );
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
      data-editable={col.editable ?? true}
      data-updatable={col.updatable ?? true}
      data-required={col.required ?? false}
      onClick={() => setFocusedCell(col.field)}
      style={
        {
          "--width": col.width ? `${col.width}px` : `100px`,
          textAlign: col.align ?? "left",
          ...col.style?.({ target: "thead", value: defaultValue, row: row }),
        } as React.CSSProperties
      }
    >
      <div
        ref={divRef}
        style={{
          position: "relative",
          overflow: "hidden",
          whiteSpace: "pre",
          textOverflow: "ellipsis",
          wordBreak: "keep-all",
          width: "100%",
          height: "100%",
          alignContent: "center",
          zIndex: 2,
        }}
      >
        {Cell}
      </div>
      <div className="devs-dt-bg-cell" />
    </td>
  );
}

export default React.memo(DevsDtCell);
