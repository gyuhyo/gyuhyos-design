import React from "react";
import { createDtStore, IDataTableOptions } from "../store/create-dt-store";
import { IDataSource, IDataTableColumn } from "../types";
import uuid from "react-uuid";

export const useGyudInitialize = (
  dataSource: IDataSource[],
  columns: IDataTableColumn[],
  options: IDataTableOptions
) => {
  const store = React.useMemo(() => createDtStore(), []);

  React.useEffect(() => {
    store.getState().setDataSource(
      dataSource.map((row) => ({
        rowId: row.rowId || uuid(),
        mode: "r",
        checked: false,
        ...row,
      })) || []
    );
    store.getState().initializeColumns(columns || []);
    store.getState().setOptions(options || {});
  }, [dataSource, columns, options]);

  return store;
};
