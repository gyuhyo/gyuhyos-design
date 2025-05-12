import React from "react";
export type TDevsSplitContainer = {
    children: React.ReactNode | React.ReactNode[];
    align?: "column" | "row";
    sizes?: Array<number | string>;
    onSizeChanged?: (sizes: number[]) => void;
    disabled?: Array<boolean>;
};
declare const DevsSplitContainer: React.FC<TDevsSplitContainer>;
export default DevsSplitContainer;
