export type GyudDataTableRef = {};

export interface IDataTableProps {
  data: IDataSource[];
  columns: IDataTableColumn[];
}

export interface IDataSource {
  [key: string]: any;
}

export interface IDataTableColumn {
  field: string;
  title: string;
  width?: number | string;
  sticky?: boolean;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  children?: IDataTableColumn[];
  colSpan?: number;
  rowSpan?: number;
  depth?: number;
}
