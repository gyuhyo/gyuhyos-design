// CounterProvider.tsx
import React, { createContext, useContext } from "react";
import { StoreApi, useStore } from "zustand";
import { useGyudInitialize } from "../hooks";
import { IDtStore } from "../store/create-dt-store";
import { IDataSource, IDataTableColumn } from "../types";

const GyudDtContext = createContext<StoreApi<IDtStore> | null>(null);

export const GyudDtProvider: React.FC<{
  children: React.ReactNode;
  dataSource: IDataSource[];
  columns: IDataTableColumn[];
}> = ({ children, dataSource, columns }) => {
  const store = useGyudInitialize(dataSource, columns);

  return (
    <GyudDtContext.Provider value={store}>{children}</GyudDtContext.Provider>
  );
};

// hook
export const useGyudDt = <T,>(selector: (state: IDtStore) => T): T => {
  const store = useContext(GyudDtContext);
  if (!store) throw new Error("GyudDtProvider 안에서만 사용해야 함!");
  return useStore(store, selector);
};
