/** @jsxImportSource @emotion/react */
import * as React from "react";
import { SideMenuItemsChildProps, SideMenuItemsProps } from "../../types/side-menu-item-props";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
declare function TabPanelHeaderItem({ menu, active, hasClose, dragProvided, dragSnapshot, }: {
    menu: SideMenuItemsProps | SideMenuItemsChildProps;
    active?: boolean;
    hasClose?: boolean;
    dragProvided: DraggableProvided;
    dragSnapshot: DraggableStateSnapshot;
}): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof TabPanelHeaderItem>;
export default _default;
