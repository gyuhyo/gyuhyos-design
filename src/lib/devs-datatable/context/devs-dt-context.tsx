import React from "react";
import {
  IDataSource,
  IDataTableColumn,
  IDataTableContextProps,
  IDataTableProviderProps,
  IDataTableSorterProps,
} from "../_types";
import { useForm, UseFormReturn } from "react-hook-form";
import uuid from "react-uuid";
import { MessageProvider } from "../../alert-message/context/message-context";
import { useGyudAccess } from "../../access-context";

export const DevsDtContext = React.createContext<
  IDataTableContextProps | undefined
>(undefined);

const DevsDtProviderComponent: React.FC<IDataTableProviderProps> = (props) => {
  const isAccess = useGyudAccess();
  const originalColumns = React.useRef<IDataTableColumn[]>([]);
  const keyField: string | undefined = props.columns.find(
    (col) => col.key
  )?.field;
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [focusedRowForm, setFocusedRowForm] =
    React.useState<null | UseFormReturn<IDataSource, any, undefined>>(null);
  const [sliderFormOpen, setSliderFormOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState<undefined | "grid" | "slider">(
    props.options?.showEditModeSelector ? "grid" : undefined
  );
  const [sorter, setSorter] = React.useState<IDataTableSorterProps>({
    field: null,
    type: "asc",
  });

  React.useEffect(() => {
    if (props.setColumns !== undefined) {
      props.setColumns((prevCols) =>
        prevCols.map((col) => ({
          ...col,
          resizing: col.resizing === undefined ? true : col.resizing,
        }))
      );
    }
  }, []);

  React.useEffect(() => {
    if (props.columns.length > 0) {
      originalColumns.current = props.columns;
    }
  }, [props.columns.length]);

  React.useEffect(() => {
    const validRowIds = new Set(props.dataSource.map((obj) => obj.rowId));

    // Step 2: targetObject에서 유효하지 않은 키 삭제
    Object.keys(props.formsRef.current).forEach((key) => {
      if (!validRowIds.has(key)) {
        delete props.formsRef.current[key];
      }
    });

    props.setDataSource((prev) => {
      return props.dataSource.map((d, idx) => {
        if (
          props.options?.editType === undefined ||
          props.options?.editType === "row"
        ) {
          return {
            originIndex: idx,
            rowId: uuid(),
            mode: "r",
            checked: false,
            expand: false,
            ...d,
          };
        }

        return {
          originIndex: idx,
          rowId: uuid(),
          mode: "r",
          checked: false,
          expand: false,
          editedCells: [],
          ...d,
        };
      });
    });
  }, [JSON.stringify(props.dataSource), props.options?.editType]);

  const editCount = React.useMemo(() => {
    return props.dataSource.filter((x) => x.mode === "u" || x.mode === "c")
      .length;
  }, [JSON.stringify(props.dataSource)]);

  if (isAccess && !isAccess.result) {
    throw new Error("You do not have permission to use package 'gyud'.");
  }

  return (
    <DevsDtContext.Provider
      value={{
        columns: props.columns,
        setColumns: props.setColumns,
        dataSource: props.dataSource,
        setDataSource: props.setDataSource,
        keyField: keyField,
        options: props.options,
        formsRef: props.formsRef,
        focusedRow: props.focusedRow,
        setFocusedRow: props.setFocusedRow,
        focusedCell: props.focusedCell,
        setFocusedCell: props.setFocusedCell,
        editCount: editCount,
        sorter,
        setSorter,
        sliderFormOpen,
        setSliderFormOpen,
        focusedRowForm,
        setFocusedRowForm,
        editMode,
        setEditMode,
        tbody: props.tbody,
        thead: props.thead,
        COLUMNS_STYLE_FORCE_UPDATE: props.COLUMNS_STYLE_FORCE_UPDATE,
        currentPage,
        setCurrentPage,
        originalColumns: originalColumns.current,
        setInnerLoading: props.setInnerLoading,
        wrapper: props.wrapper,
      }}
    >
      <MessageProvider>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {props.children}
        </div>
      </MessageProvider>
    </DevsDtContext.Provider>
  );
};

export const DevsDtProvider = React.memo(DevsDtProviderComponent);

export const useDt = () => {
  const context = React.useContext(DevsDtContext);
  if (!context) {
    throw new Error("DevsDtContext is not found");
  }
  return context;
};
