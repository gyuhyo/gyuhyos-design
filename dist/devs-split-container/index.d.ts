import React from "react";
export type TDevsSplitContainer = {
    children: React.ReactNode | React.ReactNode[];
    align?: "column" | "row";
    sizes?: Array<number | string>;
};
declare const DevsSplitContainer: React.FC<TDevsSplitContainer>;
export default DevsSplitContainer;
