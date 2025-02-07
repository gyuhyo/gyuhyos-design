import { SetStateAction } from "react";
import { IDataSource } from "./component";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
export interface IDataTableSelectorOptionsProps {
    value: string;
    label: string;
}
export interface IDataTableColumn {
    key?: boolean;
    mode?: string;
    field: string;
    title: string;
    width?: number;
    reSizingWidth?: number;
    height?: number;
    required?: boolean;
    sticky?: boolean;
    resizing?: boolean;
    type?: "date" | "select" | "number" | "textarea" | "datetime";
    align?: string;
    merge?: boolean;
    autoFocus?: (mode: string) => boolean;
    defaultValue?: ({ value, row, index, getValue, }: {
        value: any;
        row: IDataSource;
        index: number;
        getValue: UseFormGetValues<IDataSource>;
    }) => any;
    mergeOptions?: ({ prev, curr, next, }: {
        prev: IDataSource;
        curr: IDataSource;
        next?: IDataSource;
    }) => boolean;
    render?: ({ value, row, index, getValue, }: {
        value?: any;
        row: IDataSource;
        index?: number;
        getValue: UseFormGetValues<IDataSource>;
    }) => any;
    editor?: ({ value, row, index, onChange, getValue, setValue, }: {
        value?: any;
        row: IDataSource;
        index?: number;
        onChange: (...event: any[]) => void;
        getValue: UseFormGetValues<IDataSource>;
        setValue: UseFormSetValue<IDataSource>;
    }) => any;
    onChange?: ({ value, row, index, setDataSource, setValue, getValue, }: {
        value: any;
        row: IDataSource;
        index: number;
        setDataSource: React.Dispatch<SetStateAction<IDataSource[]>>;
        setValue: UseFormSetValue<IDataSource>;
        getValue: UseFormGetValues<IDataSource>;
    }) => void;
    inputOptions?: any;
    style?: ({ target, value, row, getValue, }: {
        target: string;
        value?: any;
        row?: IDataSource | null;
        getValue?: UseFormGetValues<IDataSource>;
    }) => React.CSSProperties;
    sortable?: boolean;
    isNotNullSort?: boolean;
    editable?: boolean;
    updatable?: boolean;
    options?: IDataTableSelectorOptionsProps[];
    children?: IDataTableColumn[];
}
