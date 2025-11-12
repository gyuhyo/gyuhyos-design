import { IDataTableOptions } from "../store/create-dt-store";
import { IDataTableColumn } from "../types";
export declare const setColumnStickyPosition: ({ tableRef, lastNodes, field, options, }: {
    tableRef: HTMLTableElement;
    lastNodes: IDataTableColumn[];
    field: string;
    options: IDataTableOptions;
}) => void;
