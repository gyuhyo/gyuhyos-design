/** @jsxImportSource @emotion/react */
import "dayjs/locale/ko";
import React from "react";
import { Control, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { IDataSource, IDataTableColumn } from "../_types";
type TDevsDtCell = {
    col: IDataTableColumn;
    mode: string;
    defaultValue: any;
    control: Control<FieldValues, any>;
    register: UseFormRegister<FieldValues>;
    error: boolean;
    autoFocus: boolean;
    row: IDataSource;
    rowIndex: number;
    merge?: {
        rowSpan: number;
        hidden: boolean;
    };
    setValue: UseFormSetValue<IDataSource>;
    getValue: UseFormGetValues<IDataSource>;
    trigger: UseFormTrigger<IDataSource>;
    watch: UseFormWatch<IDataSource>;
    prevRow: IDataSource;
    nextRow: IDataSource;
};
declare function DevsDtCell({ register, control, col, mode, defaultValue, error, autoFocus, row, merge, setValue, getValue, rowIndex, trigger, watch, prevRow, nextRow, }: TDevsDtCell): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DevsDtCell>;
export default _default;
