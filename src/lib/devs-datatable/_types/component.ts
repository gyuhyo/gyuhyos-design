import React, { SetStateAction } from "react";
import { IDataTableColumn } from "./col";

export interface IDataSource {
  [key: string]: any;
}

export interface IDataTableOptions {
  showRowNumber?: boolean;
  enabledRowCheck?: boolean;
  enabledRowOrder?: boolean;
  rowOrderEnd?: (data: IDataSource[]) => void;
  readonly?: boolean;
  editMode?: "default" | "popup" | "slider";
}

export interface IDataTableExportButtonProps {
  visible: boolean;
  exportText?: string;
  excel: boolean;
  print: boolean;
}

export interface IDataTableButtons {
  isVisible?: boolean;
  custom?: JSX.Element;
  isSearchVisible?: boolean;
  searchText?: string;
  isAddVisible?: boolean;
  addText?: string;
  isSaveVisible?: boolean;
  saveText?: string;
  isDeleteVisible?: boolean;
  deleteText?: string;
  isCancelVisible?: boolean;
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
  title?: string;
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
