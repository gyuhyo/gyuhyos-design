import React from "react";
import { IDataTableProps } from "./_types";
import "./dev.datatable.style.css";
interface DevsDataTableRef {
    api: {
        onValidationCheck: () => Promise<{
            valid: boolean;
            data?: any;
        }>;
    };
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IDataTableProps & React.RefAttributes<DevsDataTableRef>>>;
export default _default;
