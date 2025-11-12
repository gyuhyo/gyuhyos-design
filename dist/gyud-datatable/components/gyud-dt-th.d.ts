import React from "react";
import { IDataTableColumn } from "../types";
declare const _default: React.MemoExoticComponent<({ column, rowSpan, colSpan, isLastNode, }: {
    column: IDataTableColumn;
    rowSpan: number;
    colSpan: number;
    isLastNode: boolean;
}) => import("@emotion/react/jsx-runtime").JSX.Element>;
export default _default;
export declare const GyudDtThWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, {}>;
export declare const GyudDtThCotent: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const GyudDtThResizeHandle: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
