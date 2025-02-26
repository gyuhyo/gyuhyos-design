import React from "react";
import { IDataSource, IDataTableProps } from "./component";
import { useForm, UseFormReturn } from "react-hook-form";
import { IDataTableColumn } from "./col";
export interface IFormsRef {
    [key: string]: ReturnType<typeof useForm<IDataSource>>;
}
export interface IDataTableSorterProps {
    field: string | null;
    type: string;
}
export interface IDataTableProviderProps extends IDataTableProps {
    children: React.ReactNode;
    formsRef: React.MutableRefObject<IFormsRef>;
    setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
    setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
    focusedRow?: null | IDataSource;
    focusedCell?: null | string;
    tbody?: React.RefObject<HTMLDivElement | null>;
    thead?: React.RefObject<HTMLDivElement | null>;
    COLUMNS_STYLE_FORCE_UPDATE: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IDataTableContextProps extends IDataTableProps {
    keyField?: string;
    formsRef: React.MutableRefObject<IFormsRef>;
    setFocusedRow: React.Dispatch<React.SetStateAction<null | IDataSource>>;
    setFocusedCell: React.Dispatch<React.SetStateAction<null | string>>;
    focusedRow?: null | IDataSource;
    focusedCell?: null | string;
    sorter: IDataTableSorterProps;
    setSorter: React.Dispatch<React.SetStateAction<IDataTableSorterProps>>;
    editCount: number;
    sliderFormOpen: boolean;
    setSliderFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    focusedRowForm: null | UseFormReturn<IDataSource, any, undefined>;
    setFocusedRowForm: React.Dispatch<React.SetStateAction<null | UseFormReturn<IDataSource, any, undefined>>>;
    editMode: undefined | "grid" | "slider";
    setEditMode: React.Dispatch<React.SetStateAction<undefined | "grid" | "slider">>;
    tbody?: React.RefObject<HTMLDivElement | null>;
    thead?: React.RefObject<HTMLDivElement | null>;
    COLUMNS_STYLE_FORCE_UPDATE: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    originalColumns: IDataTableColumn[];
}
