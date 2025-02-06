import React from "react";
import { IDataSource, IDataTableColumn } from "../_types";
interface DataFormItemRendererProps {
    focusedRow: IDataSource;
    node: IDataTableColumn;
}
declare const DataFormItemRenderer: React.FC<DataFormItemRendererProps>;
export default DataFormItemRenderer;
