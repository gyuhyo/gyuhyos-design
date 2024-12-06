import React, { SetStateAction } from "react";
import {
  Control,
  FieldValues,
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
import { useDt } from "../context/devs-dt-context";
import DevsDtCell from "../devs-dt-cell";
import {
  DraggableProvided,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { useMessage } from "../../alert-message/context/message-context";

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

const RowNumberCell: React.FC<{ index: number }> = ({ index }) => {
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
}> = ({ data, checked, setDataSource, setValue, multipleRowCheck }) => {
  return (
    <td
      className="devs-dt-cell devs-dt-sticky-col"
      style={{ "--width": "30px" } as React.CSSProperties}
    >
      <input
        type="checkbox"
        checked={checked || false}
        onChange={() => {
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

function DevsDtRow({
  data,
  index,
  rowKey,
  lastNode,
  dragProvided,
  dragSnapshot,
}: TDevsDtRow) {
  const { showMessage } = useMessage();
  const {
    columns,
    keyField,
    setDataSource,
    options,
    formsRef,
    focusedRow,
    setFocusedRow,
    focusedCell,
    editCount,
  } = useDt();

  const form = useForm({
    defaultValues: data,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  React.useEffect(() => {
    if (!Object.keys(formsRef.current).includes(rowKey)) {
      formsRef.current[rowKey] = form;
    }
  }, []);

  React.useEffect(() => {
    setValue("mode", data.mode);
    setValue("checked", data.checked);
  }, [data.mode, data.checked]);

  const onEditModeClick = () => {
    if (options?.readonly === true) return;

    if (data.mode === "r") {
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
          setDataSource((prev) =>
            prev.map((p) => {
              return p.rowId === data.rowId
                ? { ...p, mode: "u", checked: true }
                : { ...p };
            })
          );
        }
      } else {
        setDataSource((prev) =>
          prev.map((p) => {
            return p.rowId === data.rowId
              ? { ...p, mode: "u", checked: true }
              : { ...p };
          })
        );
      }
    }
  };

  const GetAutoFocus = React.useCallback(
    (field: string) => {
      let focusabled = false;

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
        const updatables = lastNode.filter(
          (x) => x.updatable === true || x.updatable === undefined
        );

        if (updatables.length === 0) {
          return false;
        } else {
          return updatables[0].field === field;
        }
      } else {
        focusabled = false;
      }

      return focusabled;
    },
    [lastNode, data]
  );

  return (
    <tr
      className={`devs-dt-row${
        focusedRow?.rowId === data.rowId ? " devs-dt-focused-row" : ""
      }${data.checked === true ? " devs-dt-checked-row" : ""}`}
      onSubmit={handleSubmit(() => {})}
      onDoubleClick={onEditModeClick}
      onClick={() => setFocusedRow(data)}
      data-edit-mode={data.mode}
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      style={{ ...dragProvided.draggableProps.style }}
    >
      {options?.enabledRowOrder && (
        <RowChangeOrderCell
          mode={data.mode}
          dragHandleProps={dragProvided.dragHandleProps}
        />
      )}
      {options?.showRowNumber && <RowNumberCell index={index} />}
      {options?.enabledRowCheck && (
        <RowCheckCell
          data={data}
          checked={data.checked}
          setDataSource={setDataSource}
          setValue={setValue}
          multipleRowCheck={options.multipleRowCheck}
        />
      )}
      {lastNode &&
        lastNode.map((col, idx) => {
          return (
            <DevsDtCell
              key={`${rowKey}-${col.field}`}
              register={register}
              control={control}
              col={col}
              mode={data.mode}
              defaultValue={data[col.field]}
              error={errors.hasOwnProperty(col.field)}
              autoFocus={GetAutoFocus(col.field)}
              row={data}
              setValue={setValue}
              merge={data._merge?.[col.field]}
              rowIndex={index}
            />
          );
        })}
    </tr>
  );
}

export default React.memo(DevsDtRow);
