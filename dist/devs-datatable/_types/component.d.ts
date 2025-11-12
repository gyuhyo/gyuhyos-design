import { CSSInterpolation } from "@emotion/serialize";
import React, { JSX } from "react";
import { IDataTableColumn } from "./col";
import { FormWithForce } from "./context";
import * as XLSX from "sheetjs-style";
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
    /**
     * @description hidden row footer
     * using condition pagination === undefined
     */
    showFooter?: boolean;
    pagination?: boolean;
    paginationLimit?: number;
    enabledEditingAutoColumnWidth?: boolean;
    /**
     * @deprecated
     */
    initialAutoScroll?: string | null;
    onBeforeRowEdit?: ({ index, row, }: {
        index: number;
        row: IDataSource;
    }) => boolean;
    onBeforeCellEdit?: ({ index, row, value, }: {
        index: number;
        row: IDataSource;
        value: any;
    }) => boolean;
    rowEditable?: ({ index, row, }: {
        index: number;
        row: IDataSource;
    }) => boolean;
    rowCheckable?: ({ index, row, }: {
        index: number;
        row: IDataSource;
    }) => boolean;
    rowStyle?: ({ index, row, nextRow, prevRow, }: {
        index: number;
        row: IDataSource;
        nextRow: IDataSource;
        prevRow: IDataSource;
    }) => CSSInterpolation;
    autoScrollKey?: string;
}
export interface IDataTableExportButtonProps {
    visible: boolean;
    exportText?: string;
    excel: boolean;
    print: boolean;
}
export interface IDataTableButtons {
    custom?: JSX.Element;
    isDisabledMobileStyle?: boolean;
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
export type DevsDataTableRef = {
    table: HTMLDivElement | null;
    tbody: HTMLDivElement | null;
    thead: HTMLDivElement | null;
    api: {
        validate: () => Promise<{
            valid: boolean;
            data?: any;
        }>;
        onValidationCheck: () => Promise<{
            valid: boolean;
            data?: any;
        }>;
        getFocusedRow: null | IDataSource;
        getFocusedCell: null | {
            row: null | IDataSource;
            field: null | string;
        };
        getCheckedRows: IDataSource[];
        focusedRowForm: null | FormWithForce;
        getCheckedRowsData: () => Promise<IDataSource[]>;
        addRow: (defaultValues?: IDataSource) => void;
        setFocus: ({ rowId, field }: {
            rowId: string;
            field: string;
        }) => void;
        setError: ({ rowId, field }: {
            rowId: string;
            field: string;
        }) => void;
        setValue: ({ rowId, field, value, }: {
            rowId: string;
            field: string;
            value: any;
        }) => void;
        focusedRow: (row: IDataSource) => void;
        focusedRowIndex: (index: number) => void;
        getFocusedRowIndex: null | number;
        forceRerender: (rowId: string) => void;
        export: ({ data, fileName, sheetName, onBefore, onAfter, }: {
            data?: IDataSource[];
            fileName: string;
            sheetName: string;
            onBefore?: (worksheet: XLSX.WorkSheet, utils: typeof XLSX.utils, xlsx: typeof XLSX) => number | undefined;
            onAfter?: (worksheet: XLSX.WorkSheet, utils: typeof XLSX.utils, xlsx: typeof XLSX) => void;
        }) => void;
        getSheet: ({ data, onBefore, onAfter, }: {
            data?: IDataSource[];
            onBefore?: (worksheet: XLSX.WorkSheet, utils: typeof XLSX.utils, xlsx: typeof XLSX) => number | undefined;
            onAfter?: (worksheet: XLSX.WorkSheet, utils: typeof XLSX.utils, xlsx: typeof XLSX) => void;
        }) => XLSX.WorkSheet;
    };
};
export interface IDataTableProps {
    title?: any;
    description?: any;
    id?: string;
    columns: IDataTableColumn[];
    setColumns: React.Dispatch<React.SetStateAction<IDataTableColumn[]>>;
    dataSource: IDataSource[];
    setDataSource: React.Dispatch<React.SetStateAction<IDataSource[]>>;
    onCheckedRowsChanged?: (rows: IDataSource[]) => void;
    focusedRowChanged?: (row: IDataSource | null) => void;
    focusedCellChanged?: ({ row, field, }: {
        row: IDataSource | null;
        field: string | null;
    }) => void;
    options?: IDataTableOptions;
    buttons?: IDataTableButtons;
    loading?: boolean;
    ref?: React.Ref<DevsDataTableRef>;
}
