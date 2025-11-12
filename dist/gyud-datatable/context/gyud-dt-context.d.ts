import React from "react";
import { IDataTableOptions, IDtStore } from "../store/create-dt-store";
import { IDataSource, IDataTableColumn } from "../types";
export declare const GyudDtProvider: React.FC<{
    children: React.ReactNode;
    dataSource: IDataSource[];
    columns: IDataTableColumn[];
    options: IDataTableOptions;
}>;
export declare const useGyudDt: <T>(selector: (state: IDtStore) => T) => T;
