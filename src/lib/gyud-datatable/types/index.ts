import { IDataTableOptions, IDtStore } from "../store/create-dt-store";

export type GyudDataTableRef = {
  tbody: HTMLTableSectionElement | null;
  thead: HTMLTableSectionElement | null;
  table: HTMLDivElement | null;
  store: IDtStore;
};

export interface IDataTableProps {
  data: IDataSource[];
  columns: IDataTableColumn[];
  options?: IDataTableOptions;
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
  isLastStickyCol?: boolean;
}
