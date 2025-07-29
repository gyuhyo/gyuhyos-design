/** @jsxImportSource @emotion/react */
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import React from "react";
import { IDataSource, IDataTableColumn } from "../_types";
type TDevsDtRow = {
    data: IDataSource;
    index: number;
    rowKey: string;
    lastNode: IDataTableColumn[];
    dragProvided: DraggableProvided;
    dragSnapshot: DraggableStateSnapshot;
};
declare function DevsDtRow({ data, index, rowKey, lastNode, dragProvided, dragSnapshot, }: TDevsDtRow): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DevsDtRow>;
export default _default;
