import React from "react";
import { IDataTableButtons, IDataTableOptions } from "../_types";
interface IDataTableButtonsProps {
    options?: IDataTableOptions | undefined;
    buttons?: IDataTableButtons | undefined;
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const DevsDtButtons: React.FC<IDataTableButtonsProps>;
export default DevsDtButtons;
