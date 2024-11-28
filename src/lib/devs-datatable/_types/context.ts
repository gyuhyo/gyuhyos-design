import React from "react";
import { IDataSource, IDataTableProps } from "./component";
import { useForm, UseFormReturn } from "react-hook-form";

export interface IFormsRef {
  [key: string]: ReturnType<typeof useForm<IDataSource>>;
}

export interface IDataTableProviderProps extends IDataTableProps {
  children: React.ReactNode;
  formsRef: React.MutableRefObject<IFormsRef>;
  focusedRow: null | IDataSource;
  setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
  focusedCell: null | string;
  setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
}

export interface IDataTableContextProps extends IDataTableProps {
  keyField?: string;
  formsRef: React.MutableRefObject<IFormsRef>;
  focusedRow: null | IDataSource;
  setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
  focusedCell: null | string;
  setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
}
