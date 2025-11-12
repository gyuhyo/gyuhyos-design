import React from "react";
import { SideMenuItemsProps } from "../types/side-menu-item-props";
import { IUser } from "../stores/user-store";
interface languagesProps {
    code: string;
    name: string;
    flag: string;
}
interface LayoutContextProps {
    refreshTokenUrl: string;
    menuType?: "slide" | "header" | "multiple";
    calculWidth: string;
    languages: languagesProps[];
    handleLanguageChange: (lang: languagesProps) => void;
    customSettings?: React.ReactNode;
    themeChange: (theme: "light" | "dark") => void;
    theme: "light" | "dark";
    host: string;
    onBeforeLogout?: (user: IUser) => void;
    useChatbot?: boolean;
}
export declare const LayoutProvider: React.FC<{
    children: React.ReactNode;
    host: string;
    menus: SideMenuItemsProps[];
    authUrl: string;
    refreshTokenUrl: string;
    menuType?: "slide" | "header" | "multiple";
    customSettings?: React.ReactNode;
    onMenuPermission?: ({ userNo, menus, }: {
        userNo: string;
        menus: SideMenuItemsProps[];
    }) => Promise<SideMenuItemsProps[]>;
    statics?: string[];
    onBeforeLogout?: (user: IUser) => void;
    useChatbot?: boolean;
    defaultLanguage?: string;
}>;
export declare const useLayout: () => LayoutContextProps;
export {};
