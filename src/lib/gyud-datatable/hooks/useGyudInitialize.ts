import React from "react";
import { createDtStore } from "../store/create-dt-store";
import { IDataSource, IDataTableColumn } from "../types";

export const useGyudInitialize = (
  dataSource: IDataSource[],
  columns: IDataTableColumn[]
) => {
  const store = React.useMemo(() => createDtStore(), []);

  React.useEffect(() => {
    store.getState().setDataSource(dataSource || []);
    store.getState().initializeColumns(columns || []);
  }, [dataSource, columns]);

  return store;
};
