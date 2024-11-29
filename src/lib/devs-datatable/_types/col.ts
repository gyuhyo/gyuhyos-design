import { IDataSource } from "./component";

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
  type?: string;
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
    rowData,
    index,
  }: {
    value?: any;
    rowData: IDataSource;
    index?: number;
  }) => any;
  editor?: ({
    value,
    rowData,
    index,
    onChange,
  }: {
    value?: any;
    rowData: IDataSource;
    index?: number;
    onChange: (...event: any[]) => void;
  }) => any;
  inputOptions?: any;
  style?: React.CSSProperties;
  sortable?: boolean;
  editable?: boolean;
  updatable?: boolean;
  options?: IDataTableSelectorOptionsProps[];
  children?: IDataTableColumn[];
}
