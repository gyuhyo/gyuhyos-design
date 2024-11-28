import React from "react";
import {
  IDataTableColumn,
  IDataTableContextProps,
  IDataTableProviderProps,
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

  React.useEffect(() => {
    if (setColumns !== undefined) {
      setColumns((prevCols) =>
        prevCols.map((col) => ({
          ...col,
          resizing: col.resizing === undefined ? true : col.resizing,
        }))
      );
    }

    setDataSource(
      dataSource.map((d) => {
        return {
          rowId: uuid(),
          mode: "r",
          checked: false,
          ...d,
        };
      })
    );
  }, [dataSource.length]);

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
