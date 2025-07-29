import * as React from "react";
import { SideMenuItemsChildProps, SideMenuItemsProps } from "../types/side-menu-item-props";
interface PageErrorLayoutProps {
    menu: SideMenuItemsProps | SideMenuItemsChildProps;
    errorNo: Number;
}
declare const PageErrorLayout: React.FC<PageErrorLayoutProps>;
export default PageErrorLayout;
