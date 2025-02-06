import React from "react";
import { UseFormGetValues } from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
export declare const getDefaultValue: ({ val, col, row, rowIndex, getValue, }: {
    val: any;
    col: IDataTableColumn;
    row: IDataSource;
    rowIndex: number;
    getValue: UseFormGetValues<IDataSource>;
}) => any;
declare const _default: React.NamedExoticComponent<any>;
export default _default;
