/** @jsxImportSource @emotion/react */
import React from "react";
export type ContextMenuProps = {
    children: React.ReactNode;
    list?: {
        label: string;
        onClick: () => void;
    }[];
};
declare const ContextMenu: ({ children, list }: ContextMenuProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default ContextMenu;
