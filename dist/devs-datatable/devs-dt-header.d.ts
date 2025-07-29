/** @jsxImportSource @emotion/react */
import React, { SetStateAction } from "react";
import { IDataTableButtons, IDataTableOptions, IDataTableProps } from "./_types";
interface DevsDtHeaderProps extends Pick<IDataTableProps, "title" | "buttons" | "options"> {
    title: string;
    buttons?: IDataTableButtons;
    options?: IDataTableOptions;
    setInnerLoading: React.Dispatch<SetStateAction<boolean>>;
}
declare const _default: React.NamedExoticComponent<DevsDtHeaderProps>;
export default _default;
