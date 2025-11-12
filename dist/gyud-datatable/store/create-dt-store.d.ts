/// <reference types="react" />
import { StoreApi } from "zustand";
import { IDataSource, IDataTableColumn } from "../types";
export interface IDataTableOptions {
    isShowRowNumber?: boolean;
    isRowCheckable?: boolean;
}
export interface IDtStore {
    columns: IDataTableColumn[];
    dataSource: IDataSource[];
    options: IDataTableOptions;
    scrollOffset: number;
    tbodyRef: React.RefObject<HTMLTableSectionElement> | null;
    theadRef: React.RefObject<HTMLTableSectionElement> | null;
    tableRef: React.RefObject<HTMLTableElement> | null;
    focusedCell: {
        rowId: string;
        field: string;
    };
    focusedRow: string;
    setColumns: (columns: IDataTableColumn[] | ((prev: IDataTableColumn[]) => IDataTableColumn[])) => void;
    initializeColumns: (columns: IDataTableColumn[]) => void;
    findColumn: (field: string) => IDataTableColumn;
    setColumnWidth: (field: string, width: number) => void;
    setDataSource: (dataSource: IDataSource[] | ((prev: IDataSource[]) => IDataSource[])) => void;
    findData: (rowId: string, field: string) => any;
    getLastNodes: () => IDataTableColumn[];
    getMaxDepth: () => number;
    getFlatColumns: () => IDataTableColumn[];
    setOptions: (options: IDataTableOptions) => void;
    setScrollOffset: (scrollOffset: number) => void;
    setTheadRef: (ref: HTMLTableSectionElement | null) => void;
    setTbodyRef: (ref: HTMLTableSectionElement | null) => void;
    setTableRef: (ref: HTMLTableElement | null) => void;
    setFocusedCell: (focusedCell: {
        rowId: string;
        field: string;
    } | ((prev: {
        rowId: string;
        field: string;
    }) => {
        rowId: string;
        field: string;
    })) => void;
    setFocusedRow: (row: string) => void;
}
export declare const createDtStore: () => StoreApi<IDtStore>;
