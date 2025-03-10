import { SideMenuItemsChildProps, SideMenuItemsProps } from "../types/side-menu-item-props";
interface MenuStoreProps {
    menus: SideMenuItemsProps[];
    openedMenus: SideMenuItemsChildProps[];
    selectedMenu: {
        gr: string;
        mn: string;
    };
    setInitialMenus: (initialMenus: SideMenuItemsProps[]) => void;
    changeSelectedMenu: (menu: SideMenuItemsProps | SideMenuItemsChildProps) => void | undefined;
    openMenu: (menu: SideMenuItemsProps | SideMenuItemsChildProps) => void | undefined;
    openedMenuSetComponent: (mns: SideMenuItemsChildProps[]) => void;
    closeMenu: (menu: SideMenuItemsProps | SideMenuItemsChildProps) => void | undefined;
    menuOrderChanges: (openedMenus: SideMenuItemsChildProps[]) => void;
    closeAllTabls: () => void;
    closeNotMyTabs: () => void;
    closeHighIndexTabs: () => void;
}
declare const useMenuStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<MenuStoreProps>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<MenuStoreProps, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: MenuStoreProps) => void) => () => void;
        onFinishHydration: (fn: (state: MenuStoreProps) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<MenuStoreProps, unknown>>;
    };
}>;
export { useMenuStore };
export type { MenuStoreProps };
