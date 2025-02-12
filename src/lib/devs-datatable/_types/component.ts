import React, { JSX } from "react";
import { IDataTableColumn } from "./col";
import { CSSInterpolation } from "@emotion/serialize";

export interface IDataSource {
  [key: string]: any;
}

export interface IDataTableOptions {
  showEditModeSelector?: boolean;
  showRowNumber?: boolean;
  enabledExpand?: boolean;
  expandContent?: (row: IDataSource) => React.ReactNode;
  enabledRowCheck?: boolean;
  multipleRowCheck?: boolean;
  enabledRowOrder?: boolean;
  enabledClipboard?: boolean;
  multipleEdit?: boolean;
  rowOrderEnd?: (data: IDataSource[]) => void;
  readonly?: boolean;
  editMode?: "default" | "popup" | "slider";
  editType?: "row" | "cell";
  cellEditClickType?: "click" | "doubleClick";
  minWidth?: number;
  onBeforeRowEdit?: ({
    index,
    row,
  }: {
    index: number;
    row: IDataSource;
  }) => boolean;
  onBeforeCellEdit?: ({
    index,
    row,
    value,
  }: {
    index: number;
    row: IDataSource;
    value: any;
  }) => boolean;
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

export interface DevsDataTableRef {
  api: {
    validate: () => Promise<{ valid: boolean; data?: any }>;
    onValidationCheck: () => Promise<{ valid: boolean; data?: any }>;
    getFocusedRow: null | IDataSource;
    getFocusedCell: null | { row: null | IDataSource; field: null | string };
    getCheckedRows: IDataSource[];
    getCheckedRowsData: () => Promise<IDataSource[]>;
    addRow: (defaultValues?: IDataSource) => void;
    setValue: ({
      rowId,
      field,
      value,
    }: {
      rowId: string;
      field: string;
      value: any;
    }) => void;
    focusedRow: (row: IDataSource) => void;
    focusedRowIndex: (index: number) => void;
    getFocusedRowIndex: null | number;
  };
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
  ref?: React.Ref<DevsDataTableRef>;
}
