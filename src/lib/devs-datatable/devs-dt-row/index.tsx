/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import {
  DraggableProvided,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import React from "react";
import {
  Control,
  FieldValues,
  FormState,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useMessage } from "../../alert-message/context/message-context";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import DevsDtCell from "../devs-dt-cell";
import dayjs from "dayjs";

type TDevsDtRow = {
  data: IDataSource;
  index: number;
  rowKey: string;
  lastNode: IDataTableColumn[];
  dragProvided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
};

type TUseForm = {
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  formState: FormState<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

const RowNumberCell: React.FC<{
  index: number;
}> = ({ index }) => {
  return (
    <td
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-index-cell"
      style={{ "--width": "50px" } as React.CSSProperties}
    >
      {index + 1}
    </td>
  );
};

const RowCheckCell: React.FC<{
  data: IDataSource;
  checked: boolean;
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
  setValue: UseFormSetValue<FieldValues>;
  multipleRowCheck?: boolean;
  rowCheckable: boolean;
}> = ({
  data,
  checked,
  setDataSource,
  setValue,
  multipleRowCheck,
  rowCheckable,
}) => {
  return (
    <td
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
      style={{ "--width": "30px" } as React.CSSProperties}
    >
      {rowCheckable && (
        <input
          type="checkbox"
          checked={checked || false}
          style={{ cursor: "pointer" }}
          onChange={(e) => {
            e.stopPropagation();
            setValue("checked", !checked);
            setDataSource((prev) => {
              if (checked === false && multipleRowCheck === false) {
                return prev.map((p) =>
                  p.rowId === data.rowId
                    ? { ...p, checked: true }
                    : { ...p, checked: false }
                );
              }

              if (checked === true && data.mode !== "c") {
                return prev.map((p) =>
                  p.rowId === data.rowId
                    ? { ...p, checked: false, mode: "r" }
                    : { ...p }
                );
              }

              return prev.map((p) =>
                p.rowId === data.rowId ? { ...p, checked: !checked } : { ...p }
              );
            });
          }}
        />
      )}
    </td>
  );
};

const RowChangeOrderCell: React.FC<{
  mode: string;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}> = ({ mode, dragHandleProps }) => {
  return (
    <td
      className="devs-dt-cell devs-dt-th devs-dt-change-order-cell devs-dt-sticky-col"
      style={
        {
          "--width": "30px",
          cursor: mode !== "c" ? "grab" : "unset !important",
        } as React.CSSProperties
      }
      {...dragHandleProps}
    >
      {mode !== "c" && "\u2195"}
    </td>
  );
};

const RowExpandCell: React.FC<{
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
  data: IDataSource;
  index: number;
}> = ({ setDataSource, data, index }) => {
  return (
    <td
      className="devs-dt-cell devs-dt-th devs-dt-sticky-col"
      style={{ "--width": "30px", cursor: "pointer" } as React.CSSProperties}
      onClick={(e) => {
        e.stopPropagation();
        setDataSource((prev) => {
          return prev.map((p) =>
            p.rowId === data.rowId ? { ...p, expand: !p.expand } : { ...p }
          );
        });
      }}
    >
      <button
        className={`expand_ico2 ${data.expand ? "expand_ico_active2" : ""}`}
      ></button>
    </td>
  );
};

const getDefaultValue = ({
  col,
  row,
  rowIndex,
  val,
}: {
  col: IDataTableColumn;
  row: IDataSource;
  rowIndex: number;
  val: any;
}) => {
  if (col.defaultValue !== undefined) {
    const value = col.defaultValue({
      row,
      value: val,
      index: rowIndex,
    });

    return value;
  }

  return val;
};

function DevsDtRow({
  data,
  index,
  rowKey,
  lastNode,
  dragProvided,
  dragSnapshot,
}: TDevsDtRow) {
  const [forceReRender, setForceReRender] = React.useState<number>(0);
  const { showMessage } = useMessage();
  const {
    setDataSource,
    options,
    formsRef,
    focusedRow,
    setFocusedRow,
    editCount,
    dataSource,
    setSliderFormOpen,
    setFocusedRowForm,
    editMode,
    currentPage,
    focusedCell,
  } = useDt();

  const idx: number =
    (currentPage - 1) * (options?.paginationLimit ?? 20) + index;

  const getDefaultValues = React.useMemo(() => {
    const hasDefaultValueColumns = lastNode
      .filter((f) => f.defaultValue)
      .reduce((prev: IDataSource, curr: IDataTableColumn) => {
        prev[curr.field] = null;
        return prev;
      }, {});

    const dataKeys = Object.keys(Object.assign(data, hasDefaultValueColumns));
    const defaultValuesData = dataKeys.reduce(
      (prev: IDataSource, curr: string) => {
        const findKey = lastNode.find((f) => f.field === curr);

        if (!findKey) {
          prev[curr] = data[curr];
        } else {
          let d: any = null;
          if (data[curr]) {
            d =
              findKey.type === "date" || findKey.type === "datetime"
                ? dayjs(data[curr]).tz("Asia/Seoul")
                : data[curr];
          }

          prev[curr] = getDefaultValue({
            col: findKey,
            row: data,
            rowIndex: index,
            val: d,
          });
        }

        return prev;
      },
      {}
    );

    return defaultValuesData;
  }, []);

  const form = useForm({
    defaultValues: getDefaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
    delayError: 200,
    progressive: true,
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  });

  const {
    control,
    register,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    trigger,
    reset,
  } = form;

  const prevRow = React.useMemo(() => {
    return dataSource[idx - 1];
  }, [dataSource[idx - 1]]);

  const nextRow = React.useMemo(() => {
    return dataSource[idx + 1];
  }, [dataSource[idx + 1]]);

  React.useEffect(() => {
    if (!Object.keys(formsRef.current).includes(rowKey)) {
      formsRef.current[rowKey] = {
        ...form,
        forceRerender: () => setForceReRender((prev) => ++prev),
      };
    }
  }, []);

  React.useEffect(() => {
    setValue("mode", data.mode);
    setValue("checked", data.checked);
  }, [data.mode, data.checked]);

  const handleActionSliderForm = () => {
    if (options?.multipleEdit === false) {
      if (editCount > 0) {
        showMessage({
          title: "경고",
          type: "warnning",
          message:
            "다른 데이터를 수정할 경우 기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
          onOkClick: () =>
            setDataSource((prev) => {
              return prev
                .filter((x) => x.mode !== "c")
                .map((p) => {
                  return p.rowId === data.rowId
                    ? { ...p, mode: "u", checked: true }
                    : { ...p, mode: "r", checked: false };
                });
            }),
          onCancelClick: () => {},
        });
      } else {
        setFocusedRowForm(null);
        setTimeout(() => setFocusedRowForm(form), 1);
        setSliderFormOpen(true);
      }
    } else {
      setFocusedRowForm(null);
      setTimeout(() => setFocusedRowForm(form), 1);
      setSliderFormOpen(true);
    }
  };

  const onEditModeClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (options?.readonly === true) return;
    if (!(options?.rowEditable?.({ index: idx, row: data }) ?? true)) return;
    if (options?.onBeforeRowEdit?.({ index: idx, row: data }) === false) return;

    if (options?.showEditModeSelector && editMode === "slider") {
      handleActionSliderForm();
      return;
    }

    if (
      options?.editMode === "slider" &&
      (options?.editType === undefined || options?.editType === "row")
    ) {
      handleActionSliderForm();
      return;
    }

    if (
      data.mode === "r" &&
      options?.editMode !== "slider" &&
      (options?.editType === undefined || options?.editType === "row")
    ) {
      if (options?.multipleEdit === false) {
        if (editCount > 0) {
          showMessage({
            title: "경고",
            type: "warnning",
            message:
              "다른 데이터를 수정할 경우\n기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
            onOkClick: () =>
              setDataSource((prev) => {
                return prev
                  .filter((x) => x.mode !== "c")
                  .map((p) => {
                    return p.rowId === data.rowId
                      ? { ...p, mode: "u", checked: true }
                      : { ...p, mode: "r", checked: false };
                  });
              }),
            onCancelClick: () => {},
          });
        } else {
          setDataSource((prev) =>
            prev.map((p) => {
              return p.rowId === data.rowId
                ? { ...p, mode: p.mode === "c" ? "c" : "u", checked: true }
                : { ...p };
            })
          );
        }
      } else {
        setDataSource((prev) =>
          prev.map((p) => {
            return p.rowId === data.rowId
              ? { ...p, mode: p.mode === "c" ? "c" : "u", checked: true }
              : { ...p };
          })
        );
      }
    }
  };

  const GetAutoFocus = React.useCallback(
    (field: string): boolean => {
      const updatables = lastNode.filter(
        (x) => x.updatable === true || x.updatable === undefined
      );

      if (options?.editType === "cell") {
        if (
          field === focusedCell &&
          updatables.find((f) => f.field === field)
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (data.mode === "c") {
        const editables = lastNode.filter(
          (x) => x.editable === true || x.editable === undefined
        );

        if (editables.length === 0) {
          return false;
        } else {
          return editables[0].field === field;
        }
      } else if (data.mode === "u") {
        if (
          field === focusedCell &&
          updatables.find((f) => f.field === field)
        ) {
          return true;
        }

        if (updatables.length === 0) {
          return false;
        } else {
          return updatables[0].field === field;
        }
      }

      return false;
    },
    [lastNode, data, focusedCell]
  );

  const RowForceRerender = () => {
    setForceReRender((prev) => ++prev);
  };

  return (
    <tr
      className={`devs-dt-row${
        focusedRow?.rowId === data.rowId ? " devs-dt-focused-row" : ""
      }${data.checked === true ? " devs-dt-checked-row" : ""}`}
      onDoubleClick={onEditModeClick}
      onClick={() => {
        setFocusedRow(data);
        if (data.mode === "r") {
          setSliderFormOpen(false);
        }
      }}
      data-edit-mode={data.mode}
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      style={{
        ...dragProvided.draggableProps.style,
      }}
      css={css(
        options?.rowStyle?.({
          index: idx,
          row: data,
          prevRow: prevRow,
          nextRow: nextRow,
        })
      )}
    >
      {options?.enabledRowOrder && (
        <RowChangeOrderCell
          mode={data.mode}
          dragHandleProps={dragProvided.dragHandleProps}
        />
      )}
      {options?.enabledExpand && (
        <RowExpandCell setDataSource={setDataSource} data={data} index={idx} />
      )}
      {options?.showRowNumber && <RowNumberCell index={idx} />}
      {options?.enabledRowCheck && (
        <RowCheckCell
          data={data}
          checked={data.checked}
          setDataSource={setDataSource}
          setValue={setValue}
          multipleRowCheck={options.multipleRowCheck}
          rowCheckable={
            options?.rowCheckable?.({ index: idx, row: data }) ?? true
          }
        />
      )}
      {lastNode &&
        lastNode.map((col, idx) => {
          if (options?.editMode === "slider") {
            register(col.field, {
              required: col.required,
              value: watch(col.field),
            });
          }
          return (
            <DevsDtCell
              key={`${rowKey}-${forceReRender}-${col.field}`}
              register={register}
              control={control}
              col={col}
              mode={data.mode}
              defaultValue={watch(col.field)}
              error={errors.hasOwnProperty(col.field)}
              autoFocus={col.autoFocus?.(data.mode) ?? GetAutoFocus(col.field)}
              row={data}
              prevRow={prevRow}
              nextRow={nextRow}
              setValue={setValue}
              merge={data._merge?.[col.field]}
              rowIndex={index}
              getValue={getValues}
              trigger={trigger}
              watch={watch}
              forceRerender={RowForceRerender}
            />
          );
        })}
    </tr>
  );
}

export default React.memo(DevsDtRow);
