import { SetStateAction } from "react";
import { IDataSource } from "./component";
import { UseFormSetValue } from "react-hook-form";

export interface IDataTableSelectorOptionsProps {
  value: string;
  label: string;
}

export interface IDataTableColumn {
  key?: boolean;
  mode?: string;
  field: string;
  title: string;
  width?: number;
  height?: number;
  required?: boolean;
  sticky?: boolean;
  resizing?: boolean;
  type?: "date" | "select" | "number" | "textarea";
  align?: string;
  merge?: boolean;
  mergeOptions?: ({
    prev,
    curr,
    next,
  }: {
    prev: IDataSource;
    curr: IDataSource;
    next?: IDataSource;
  }) => boolean;
  render?: ({
    value,
    row,
    index,
  }: {
    value?: any;
    row: IDataSource;
    index?: number;
  }) => any;
  editor?: ({
    value,
    row,
    index,
    onChange,
  }: {
    value?: any;
    row: IDataSource;
    index?: number;
    onChange: (...event: any[]) => void;
  }) => any;
  onChange?: ({
    value,
    row,
    index,
    setDataSource,
  }: {
    value: any;
    row: IDataSource;
    index: number;
    setDataSource: React.Dispatch<SetStateAction<IDataSource[]>>;
    setValue: UseFormSetValue<IDataSource>;
  }) => void;
  inputOptions?: any;
  style?: ({
    value,
    row,
  }: {
    target: string;
    value?: any;
    row?: IDataSource | null;
  }) => React.CSSProperties;
  sortable?: boolean;
  isNotNullSort?: boolean;
  editable?: boolean;
  updatable?: boolean;
  options?: IDataTableSelectorOptionsProps[];
  children?: IDataTableColumn[];
}
