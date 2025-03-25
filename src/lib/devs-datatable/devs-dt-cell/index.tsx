/** @jsxImportSource @emotion/react */

import { DatePicker, InputNumber, Radio, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

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
  getValue: UseFormGetValues<IDataSource>;
  trigger: UseFormTrigger<IDataSource>;
  watch: UseFormWatch<IDataSource>;
  prevRow: IDataSource;
  nextRow: IDataSource;
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
  getValue,
  rowIndex,
  trigger,
  watch,
  prevRow,
  nextRow,
}: TDevsDtCell) {
  const {
    focusedRow,
    focusedCell,
    setFocusedCell,
    setFocusedRow,
    setDataSource,
    setColumns,
    options,
    editMode,
    tbody,
    formsRef,
  } = useDt();

  const colType = typeof col.type === "function" ? col.type(row) : col.type;

  const isCellEdit = React.useMemo(() => {
    if (options?.editType === undefined || options?.editType === "row")
      return false;

    return (row.editedCells as string[])?.includes(col.field);
  }, [options?.editType, row]);

  const cellRef = React.useRef<HTMLTableCellElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    // 초기에 한 번 실행
    checkOverflow();
  }, []);

  React.useEffect(() => {
    if (!options?.enabledEditingAutoColumnWidth) return;

    if (mode === "c" || mode === "u" || isCellEdit) {
      if (col?.editorWidth !== undefined) {
        setColumns((prev) =>
          updateColumnWidth(prev, col.field, col.editorWidth!)
        );
        return;
      }
      checkOverflow();
    }
  }, [mode, isCellEdit, options?.enabledEditingAutoColumnWidth]);

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

    if (
      focusedRow?.rowId === row.rowId &&
      focusedCell === col.field &&
      index === -1
    ) {
      classes.push("devs-dt-focused-cell");
    }

    return classes.join(" ");
  }, [col.sticky, error, focusedCell, focusedRow]);

  const onInputArrowClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (prevRow && (prevRow.mode === "c" || prevRow.mode === "u")) {
        const form = formsRef.current[prevRow.rowId];

        if (form) {
          setTimeout(() => {
            form.setFocus(col.field);
            setFocusedCell(col.field);
            setFocusedRow(prevRow);
          });
        }
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (nextRow && (nextRow.mode === "c" || nextRow.mode === "u")) {
        const form = formsRef.current[nextRow.rowId];

        if (form) {
          setTimeout(() => {
            form.setFocus(col.field);
            setFocusedCell(col.field);
            setFocusedRow(nextRow);
          });
        }
      }
    }
  };

  const cellComp = React.useMemo(() => {
    if (col.editor !== undefined) {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) =>
            col.editor!({
              value: defaultValue,
              row: row,
              index: rowIndex,
              onChange,
              setValue,
              getValue,
              setDataSource,
            })
          }
        />
      );
    }

    if (colType === "date") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <DatePicker
              disabled={col.readonly ?? false}
              size="small"
              placeholder="날짜 선택"
              defaultOpen={autoFocus}
              defaultValue={defaultValue}
              onChange={(_, v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                    getValue,
                  });
                }
              }}
              autoFocus={
                options?.cellEditClickType === "click" ? true : autoFocus
              }
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (colType === "datetime") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <DatePicker
              disabled={col.readonly ?? false}
              size="small"
              placeholder="날짜/시간 선택"
              defaultOpen={autoFocus}
              defaultValue={defaultValue}
              showTime={true}
              onChange={(_, v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                    getValue,
                  });
                }
              }}
              autoFocus={
                options?.cellEditClickType === "click" ? true : autoFocus
              }
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (colType === "select") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <Select
              disabled={col.readonly ?? false}
              size="small"
              showSearch={true}
              defaultOpen={autoFocus}
              optionFilterProp="label"
              onChange={(v) => {
                onChange(v);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: v,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                    getValue,
                  });
                }
              }}
              defaultValue={defaultValue}
              autoFocus={
                options?.cellEditClickType === "click" ? true : autoFocus
              }
              {...col.inputOptions}
              options={col.options}
            />
          )}
        />
      );
    }

    if (colType === "number") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <InputNumber
              disabled={col.readonly ?? false}
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
                    getValue,
                  });
                }
              }}
              defaultValue={defaultValue}
              autoFocus={
                options?.cellEditClickType === "click" ? true : autoFocus
              }
              {...col.inputOptions}
            />
          )}
        />
      );
    }

    if (colType === "radio") {
      return (
        <Controller
          control={control}
          name={col.field}
          defaultValue={defaultValue}
          rules={{ required: col.required }}
          render={({ field: { onChange } }) => (
            <Radio.Group
              style={{
                width: "100%",
                textAlign: "center",
              }}
              onChange={(e) => {
                onChange(e.target.value);
                if (col.onChange !== undefined) {
                  col.onChange({
                    value: e.target.value,
                    row: row,
                    index: rowIndex,
                    setDataSource: setDataSource,
                    setValue: setValue,
                    getValue,
                  });
                }
              }}
              defaultValue={defaultValue}
            >
              {col.options &&
                col.options.map((op) => (
                  <Radio key={op.value} value={op.value} />
                ))}
            </Radio.Group>
          )}
        />
      );
    }

    if (colType === "textarea") {
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
                  getValue,
                });
              }
            },
          })}
          disabled={col.readonly ?? false}
          defaultValue={defaultValue}
          autoFocus={options?.cellEditClickType === "click" ? true : autoFocus}
          {...col.inputOptions}
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
                getValue,
              });
            }
          },
        })}
        onKeyDown={onInputArrowClick}
        disabled={col.readonly ?? false}
        type="text"
        defaultValue={defaultValue}
        autoFocus={options?.cellEditClickType === "click" ? true : autoFocus}
        autoComplete="off"
        {...col.inputOptions}
      />
    );
  }, [col, autoFocus, defaultValue, row, rowIndex]);

  const GetCell = () => {
    if (col.render !== undefined) {
      return col.render({
        value: defaultValue,
        row: row,
        index: rowIndex,
        getValue,
        watch,
      });
    } else {
      if (colType === "number") {
        return <span>{defaultValue?.toLocaleString()}</span>;
      }

      if (colType === "date") {
        if (defaultValue && dayjs(defaultValue).isValid()) {
          return (
            <span>
              {dayjs(defaultValue).tz("Asia/Seoul").format("YYYY-MM-DD")}
            </span>
          );
        }
      }

      if (colType === "datetime") {
        if (defaultValue && dayjs(defaultValue).isValid()) {
          return (
            <span>
              {dayjs(defaultValue)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          );
        }
      }

      if (colType === "select") {
        return (
          <span>
            {col.options?.find((op) => op.value === defaultValue)?.label}
          </span>
        );
      }

      return <span>{defaultValue}</span>;
    }
  };

  const Cell = React.useMemo(() => {
    const rowEditCheck =
      mode === undefined ||
      mode === "r" ||
      (mode === "u" && col.updatable === false) ||
      (mode === "c" && col.editable === false);

    const cellEditCheck = options?.editType === "cell" && isCellEdit === false;

    if (options?.editType === undefined || options?.editType === "row") {
      if (options?.editMode === "slider") {
        return GetCell();
      }

      if (rowEditCheck) {
        return GetCell();
      } else {
        return cellComp;
      }
    } else {
      if (cellEditCheck) {
        return GetCell();
      } else {
        return cellComp;
      }
    }
  }, [defaultValue, row, col, mode, isCellEdit]);

  const onCellEditChange = React.useCallback(
    (clickType: string) => {
      if (
        options?.readonly === true ||
        col.editable === false ||
        col.updatable === false
      )
        return;

      if (
        options?.onBeforeCellEdit?.({
          index: rowIndex,
          row: row,
          value: defaultValue,
        }) === false
      )
        return;

      if (clickType === "doubleClick" && options?.cellEditClickType === "click")
        return;

      if (
        clickType === "click" &&
        (options?.cellEditClickType === undefined ||
          options?.cellEditClickType === "doubleClick")
      )
        return;

      if (!(options?.rowEditable?.({ index: rowIndex, row }) ?? true)) return;

      if (options?.editType === "cell" && isCellEdit === false) {
        setValue("editedCells", [...row.editedCells, col.field]);
        setDataSource((prev) =>
          prev.map((x) => {
            if (x.rowId === row.rowId) {
              return {
                ...x,
                checked: true,
                editedCells: [...x.editedCells, col.field],
              };
            }

            return x;
          })
        );
      }
    },
    [options, isCellEdit]
  );

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

  const onEditorColspan = (e: HTMLTableCellElement | null) => {
    if (!e) return;

    const tr = e.parentNode;
    const tds = Array.from(tr!.children);
    const index = tds.indexOf(e);

    if (index > -1) {
      const rightTds = tds.slice(index + 1, index + col.editorMerge!);

      for (const elm of rightTds) {
        (elm as HTMLTableCellElement).style.display = "none";
      }
    }
  };

  return (
    <td
      ref={(e) => {
        cellRef.current = e;
        if (
          options?.editType !== "cell" &&
          mode !== "r" &&
          col.editorMerge !== undefined
        ) {
          onEditorColspan(e);
        }
      }}
      className={classString}
      rowSpan={merge?.rowSpan}
      data-field={col.field}
      data-hidden={false}
      data-width={col.width ?? 100}
      data-edit-mode={isCellEdit}
      data-editable={col.editable ?? true}
      data-updatable={col.updatable ?? true}
      data-required={col.required ?? false}
      onClick={() => {
        setFocusedCell(col.field);
        onCellEditChange("click");
      }}
      onDoubleClick={() => onCellEditChange("doubleClick")}
      style={
        {
          "--width": col.width ? `${col.width}px` : `100px`,
          textAlign: col.align ?? "left",
          ...col.style?.({
            target: "tbody",
            value: defaultValue,
            row: row,
          }),
        } as React.CSSProperties
      }
      colSpan={mode !== "r" ? col.editorMerge ?? 1 : 1}
    >
      <div
        ref={divRef}
        style={{
          position: "relative",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          wordBreak: "break-all",
          width: "100%",
          height: "100%",
          alignContent: "center",
          zIndex: 2,
        }}
      >
        {Cell}
      </div>
      <div className="devs-dt-bg-cell" />
      <div className="devs-dt-required-sig" />
    </td>
  );
}

export default React.memo(DevsDtCell);
