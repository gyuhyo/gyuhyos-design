import React from "react";
import { IDataTableColumn } from "./col";
export interface IDataSource {
    [key: string]: any;
}
export interface IDataTableOptions {
    showRowNumber?: boolean;
    enabledRowCheck?: boolean;
    enabledRowOrder?: boolean;
    readonly?: boolean;
    editMode?: "default" | "popup" | "slider";
}
export interface IDataTableExportButtonProps {
    visible: boolean;
    excel: boolean;
    print: boolean;
}
export interface IDataTableButtons {
    isVisible: boolean;
    custom?: JSX.Element;
    isSearchVisible?: boolean;
    isAddVisible?: boolean;
    isSaveVisible?: boolean;
    isDeleteVisible?: boolean;
    isCancelVisible?: boolean;
    export?: IDataTableExportButtonProps;
    onSearchClick?: () => void;
    onAddClick?: () => void;
    onSaveClick?: () => void;
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
    onExportClick?: () => void;
}
export interface IDataTableProps {
    title?: string;
    columns: IDataTableColumn[];
    setColumns: React.Dispatch<React.SetStateAction<IDataTableColumn[]>>;
    dataSource: IDataSource[];
    setDataSource: React.Dispatch<React.SetStateAction<IDataSource[]>>;
    options?: IDataTableOptions;
    buttons?: IDataTableButtons;
    loading?: boolean;
}
