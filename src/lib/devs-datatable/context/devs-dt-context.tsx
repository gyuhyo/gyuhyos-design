import React from "react";
import {
  IDataTableColumn,
  IDataTableContextProps,
  IDataTableProviderProps,
  IDataTableSorterProps,
} from "../_types";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";

const DevsDtContext = React.createContext<IDataTableContextProps | undefined>(
  undefined
);

const DevsDtProviderComponent: React.FC<IDataTableProviderProps> = ({
  children,
  columns,
  setColumns,
  dataSource,
  setDataSource,
  options,
  formsRef,
  focusedRow,
  setFocusedRow,
  focusedCell,
  setFocusedCell,
}) => {
  const keyField: string | undefined = columns.find((col) => col.key)?.field;
  const [isSetUUID, setIsSetUUID] = React.useState(false);
  const [sorter, setSorter] = React.useState<IDataTableSorterProps>({
    field: null,
    type: "asc",
  });

  React.useEffect(() => {
    if (setColumns !== undefined) {
      setColumns((prevCols) =>
        prevCols.map((col) => ({
          ...col,
          resizing: col.resizing === undefined ? true : col.resizing,
        }))
      );
    }
  }, []);

  React.useEffect(() => {
    const validRowIds = new Set(dataSource.map((obj) => obj.rowId));

    // Step 2: targetObject에서 유효하지 않은 키 삭제
    Object.keys(formsRef.current).forEach((key) => {
      if (!validRowIds.has(key)) {
        delete formsRef.current[key];
      }
    });

    setDataSource((prev) => {
      return dataSource.map((d, idx) => {
        return {
          originIndex: idx,
          rowId: uuid(),
          mode: "r",
          checked: false,
          ...d,
        };
      });
    });
  }, [JSON.stringify(dataSource)]);

  return (
    <DevsDtContext.Provider
      value={{
        columns,
        setColumns,
        dataSource,
        setDataSource,
        keyField,
        options,
        formsRef,
        focusedRow,
        setFocusedRow,
        focusedCell,
        setFocusedCell,
        sorter,
        setSorter,
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {children}
      </div>
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
