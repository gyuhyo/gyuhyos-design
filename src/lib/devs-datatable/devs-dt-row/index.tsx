import React from "react";
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
}> = ({ data, checked, setDataSource, setValue }) => {
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
          setDataSource((prev) =>
            prev.map((p) =>
              p.rowId === data.rowId ? { ...p, checked: !checked } : { ...p }
            )
          );
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
  const {
    columns,
    keyField,
    setDataSource,
    options,
    formsRef,
    focusedRow,
    setFocusedRow,
    focusedCell,
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
      setDataSource((prev) =>
        prev.map((p) => {
          return p.rowId === data.rowId
            ? { ...p, mode: "u", checked: true }
            : { ...p };
        })
      );
    }
  };

  return (
    <tr
      className={`devs-dt-row${
        focusedRow === data ? " devs-dt-focused-row" : ""
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
        />
      )}
      {lastNode &&
        lastNode.map((col, index) => (
          <DevsDtCell
            key={`${rowKey}-${col.field}`}
            register={register}
            control={control}
            col={col}
            mode={data.mode}
            defaultValue={data[col.field]}
            error={errors.hasOwnProperty(col.field)}
            autoFocus={index === 0}
            row={data}
            merge={data._merge?.[col.field]}
          />
        ))}
    </tr>
  );
}

export default React.memo(DevsDtRow);
