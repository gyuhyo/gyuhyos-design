import React from "react";
import { IDataSource, IDataTableProps } from "./component";
import { useForm, UseFormReturn } from "react-hook-form";
import { IDataTableColumn } from "./col";
export type FormWithForce = ReturnType<typeof useForm<IDataSource>> & {
    forceRerender: () => void;
};
export interface IFormsRef {
    [key: string]: FormWithForce;
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
    tbody?: React.MutableRefObject<HTMLDivElement | null>;
    thead?: React.MutableRefObject<HTMLDivElement | null>;
    COLUMNS_STYLE_FORCE_UPDATE: React.Dispatch<React.SetStateAction<boolean>>;
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
    wrapper: React.MutableRefObject<HTMLDivElement | null>;
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
    tbody?: React.MutableRefObject<HTMLDivElement | null>;
    thead?: React.MutableRefObject<HTMLDivElement | null>;
    COLUMNS_STYLE_FORCE_UPDATE: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    originalColumns: IDataTableColumn[];
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
    wrapper: React.MutableRefObject<HTMLDivElement | null>;
}
