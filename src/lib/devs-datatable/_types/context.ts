import React from "react";
import { IDataSource, IDataTableProps } from "./component";
import { useForm, UseFormReturn } from "react-hook-form";

export interface IFormsRef {
  [key: string]: ReturnType<typeof useForm<IDataSource>>;
}

export interface IDataTableSorterProps {
  field: string | null;
  type: string;
}

export interface IDataTableProviderProps extends IDataTableProps {
  children: React.ReactNode;
  formsRef: React.MutableRefObject<IFormsRef>;
  setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
  setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
  focusedRow?: null | IDataSource;
  focusedCell?: null | string;
}

export interface IDataTableContextProps extends IDataTableProps {
  keyField?: string;
  formsRef: React.MutableRefObject<IFormsRef>;
  setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
  setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
  focusedRow?: null | IDataSource;
  focusedCell?: null | string;
  sorter: IDataTableSorterProps;
  setSorter: React.Dispatch<React.SetStateAction<IDataTableSorterProps>>;
}
