import React from "react";
import { IDataTableColumn } from "../_types";
export declare const useInitDt: ({ table, tbody, thead, columns, }: {
    table: React.RefObject<HTMLDivElement | null>;
    tbody: React.RefObject<HTMLDivElement | null>;
    thead: React.RefObject<HTMLDivElement | null>;
    columns: IDataTableColumn[];
}) => boolean;
