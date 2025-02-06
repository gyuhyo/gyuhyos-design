/** @jsxImportSource @emotion/react */
import React from "react";
import { IDataSource, IDataTableProps } from "./_types";
import "./dev.datatable.style.css";
/**
 * @typedef {Object} DevsDataTableRef
 * @property {() => Promise<{ valid: boolean, data: any }>} onValidationCheck
 * @property {null | IDataSource} getFocusedRow
 * @property {number | null} getFocusedRowIndex
 * @property {null | { row: null | IDataSource; field: null | string }} getFocusedCell
 * @property {IDataSource[]} getCheckedRows
 * @property {(index: number) => void} focusedRowIndex
 * @property {(row: IDataSource) => void} focusedRow
 * @property {(defaultValues?: IDataSource) => void} addRow
 */
interface DevsDataTableRef {
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
        getCheckedRowsData: () => Promise<IDataSource[]>;
        addRow: (defaultValues?: IDataSource) => void;
        setValue: ({ rowId, field, value, }: {
            rowId: string;
            field: string;
            value: any;
        }) => void;
        focusedRow: (row: IDataSource) => void;
        focusedRowIndex: (index: number) => void;
        getFocusedRowIndex: null | number;
    };
}
declare const _default: React.NamedExoticComponent<IDataTableProps & React.RefAttributes<DevsDataTableRef>>;
export default _default;
