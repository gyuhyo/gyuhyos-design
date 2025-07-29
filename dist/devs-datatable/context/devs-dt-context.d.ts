import React from "react";
import { IDataTableContextProps, IDataTableProviderProps } from "../_types";
export declare const DevsDtContext: React.Context<IDataTableContextProps | undefined>;
export declare const DevsDtProvider: React.NamedExoticComponent<IDataTableProviderProps>;
export declare const useDt: () => IDataTableContextProps;
