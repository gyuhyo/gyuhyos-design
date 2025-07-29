import React from "react";
export declare const useInitDt: ({ table, tbody, thead, columnsStyleForceUpdate, }: {
    table: React.MutableRefObject<HTMLDivElement | null>;
    tbody: React.MutableRefObject<HTMLDivElement | null>;
    thead: React.MutableRefObject<HTMLDivElement | null>;
    columnsStyleForceUpdate: boolean;
}) => boolean;
