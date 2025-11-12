import { IDataTableOptions } from "../store/create-dt-store";
import { IDataSource, IDataTableColumn } from "../types";
export declare const useGyudInitialize: (dataSource: IDataSource[], columns: IDataTableColumn[], options: IDataTableOptions) => import("zustand").StoreApi<import("../store/create-dt-store").IDtStore>;
