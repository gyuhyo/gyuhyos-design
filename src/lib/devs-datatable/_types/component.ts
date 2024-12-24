import React, { SetStateAction } from "react";
import { IDataTableColumn } from "./col";
import { CSSInterpolation } from "@emotion/serialize";

export interface IDataSource {
  [key: string]: any;
}

export interface IDataTableOptions {
  showRowNumber?: boolean;
  enabledExpand?: boolean;
  expandContent?: (row: IDataSource) => React.ReactNode;
  enabledRowCheck?: boolean;
  multipleRowCheck?: boolean;
  enabledRowOrder?: boolean;
  multipleEdit?: boolean;
  rowOrderEnd?: (data: IDataSource[]) => void;
  readonly?: boolean;
  editMode?: "default" | "popup" | "slider";
  editType?: "row" | "cell";
  cellEditClickType?: "click" | "doubleClick";
  minWidth?: number;
  rowEditable?: ({
    index,
    row,
  }: {
    index: number;
    row: IDataSource;
  }) => boolean;
  rowStyle?: ({
    index,
    row,
    nextRow,
    prevRow,
  }: {
    index: number;
    row: IDataSource;
    nextRow: IDataSource;
    prevRow: IDataSource;
  }) => CSSInterpolation;
}

export interface IDataTableExportButtonProps {
  visible: boolean;
  exportText?: string;
  excel: boolean;
  print: boolean;
}

export interface IDataTableButtons {
  custom?: JSX.Element;
  searchText?: string;
  addText?: string;
  saveText?: string;
  deleteText?: string;
  cancelText?: string;
  export?: IDataTableExportButtonProps;
  onSearchClick?: () => void;
  onAddClick?: () => void;
  onSaveClick?: () => void;
  onDeleteClick?: () => void;
  onCancelClick?: () => void;
  onExportClick?: () => void;
}

export interface IDataTableProps {
  title?: any;
  id?: string;
  columns: IDataTableColumn[];
  setColumns: React.Dispatch<React.SetStateAction<IDataTableColumn[]>>;
  dataSource: IDataSource[];
  setDataSource: React.Dispatch<React.SetStateAction<IDataSource[]>>;
  focusedRowChanged?: (row: IDataSource) => void;
  focusedCellChanged?: ({
    row,
    field,
  }: {
    row: IDataSource;
    field: string;
  }) => void;
  options?: IDataTableOptions;
  buttons?: IDataTableButtons;
  loading?: boolean;
}
