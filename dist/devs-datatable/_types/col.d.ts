import { SetStateAction } from "react";
import { IDataSource } from "./component";
import { UseFormGetValues, UseFormReturn, UseFormSetValue, UseFormWatch } from "react-hook-form";
export interface IDataTableSelectorOptionsProps {
    value: string;
    label: string | null;
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
    type?: "date" | "select" | "number" | "textarea" | "datetime" | "radio" | ((row: IDataSource) => "date" | "select" | "number" | "textarea" | "datetime" | "radio");
    editorMerge?: number;
    align?: string;
    merge?: boolean;
    editorWidth?: number;
    footer?: (dataSource: IDataSource) => any;
    autoFocus?: (mode: string) => boolean;
    defaultValue?: ({ value, row, index, }: {
        value: any;
        row: IDataSource;
        index: number;
    }) => any;
    mergeOptions?: ({ prev, curr, next, }: {
        prev: IDataSource;
        curr: IDataSource;
        next?: IDataSource;
    }) => boolean;
    render?: ({ value, row, index, getValue, watch, }: {
        value?: any;
        row: IDataSource;
        index?: number;
        getValue?: UseFormGetValues<IDataSource>;
        watch: UseFormWatch<IDataSource>;
    }) => any;
    editor?: ({ value, row, index, onChange, getValue, setValue, setDataSource, forceRerender, }: {
        value?: any;
        row: IDataSource;
        index?: number;
        onChange: (...event: any[]) => void;
        getValue: UseFormGetValues<IDataSource>;
        setValue: UseFormSetValue<IDataSource>;
        setDataSource: React.Dispatch<React.SetStateAction<IDataSource[]>>;
        forceRerender?: () => void;
    }) => any;
    onChange?: ({ value, row, index, setDataSource, setValue, getValue, forceRerender, }: {
        value: any;
        row: IDataSource;
        index: number;
        setDataSource: React.Dispatch<SetStateAction<IDataSource[]>>;
        setValue: UseFormSetValue<IDataSource>;
        getValue: UseFormGetValues<IDataSource>;
        forceRerender?: () => void;
    }) => void;
    inputOptions?: ({ onChange, defaultValue, row, form, forceRerender, }: {
        onChange: (...event: any[]) => void;
        defaultValue: any;
        row: IDataSource;
        form: UseFormReturn<IDataSource, any, undefined>;
        forceRerender?: () => void;
    }) => any;
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
    readonly?: boolean;
}
