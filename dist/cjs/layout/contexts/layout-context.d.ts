import React from "react";
import { SideMenuItemsProps } from "../types/side-menu-item-props";
interface languagesProps {
    code: string;
    name: string;
    flag: string;
}
interface LayoutContextProps {
    onAuthRefreshClick: ({ refreshToken, login24h, }: {
        refreshToken: string;
        login24h: boolean;
    }) => void;
    menuType?: "slide" | "header" | "multiple";
    calculWidth: string;
    languages: languagesProps[];
    handleLanguageChange: (lang: languagesProps) => void;
}
export declare const LayoutProvider: React.FC<{
    children: React.ReactNode;
    onAuthRefreshClick: ({ refreshToken, login24h, }: {
        refreshToken: string;
        login24h: boolean;
    }) => void;
    menus: SideMenuItemsProps[];
    authUrl: string;
    menuType?: "slide" | "header" | "multiple";
}>;
export declare const useLayout: () => LayoutContextProps;
export {};
