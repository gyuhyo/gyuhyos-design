import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../types/side-menu-item-props";
import { moveUrl } from "../utils/moveUrl";
import { useUserStore } from "./user-store";

interface MenuStoreProps {
  menus: SideMenuItemsProps[];
  openedMenus: SideMenuItemsChildProps[];
  selectedMenu: { gr: string; mn: string };
  setInitialMenus: (initialMenus: SideMenuItemsProps[]) => void;
  changeSelectedMenu: (
    menu: SideMenuItemsProps | SideMenuItemsChildProps
  ) => void | undefined;
  openMenu: (
    menu: SideMenuItemsProps | SideMenuItemsChildProps
  ) => void | undefined;
  openedMenuSetComponent: (mns: SideMenuItemsChildProps[]) => void;
  closeMenu: (
    menu: SideMenuItemsProps | SideMenuItemsChildProps
  ) => void | undefined;
  menuOrderChanges: (openedMenus: SideMenuItemsChildProps[]) => void;
  closeAllTabls: () => void;
}

const useMenuStore = create(
  persist(
    (set) => ({
      menus: [],
      setInitialMenus: (initialMenus: SideMenuItemsProps[]) => {
        set(
          produce((state: MenuStoreProps) => {
            const userStore = useUserStore.getState();
            state.menus = initialMenus;
            const menus = initialMenus.flatMap((x) =>
              x.children === undefined ? x : x.children
            );
            const mainMenu = menus.find(
              (x) => x.main === true
            ) as SideMenuItemsChildProps;

            if (
              userStore.me.userNo !== undefined &&
              !state.openedMenus.find((x) => x.key === mainMenu.key)
            ) {
              state.openedMenus.push(
                Object.assign(mainMenu, { hasClose: false })
              );
              moveUrl(`${mainMenu.group}/${mainMenu.key}`, mainMenu.title);
              state.selectedMenu = { gr: mainMenu.group!, mn: mainMenu.key };
            }
          })
        );
      },
      openedMenus: [],
      selectedMenu: { gr: "", mn: "" },
      changeSelectedMenu: (
        menu: SideMenuItemsChildProps | SideMenuItemsChildProps
      ) => {
        set(
          produce((state: MenuStoreProps) => {
            const findMenu = state.openedMenus.find((s) => s.key === menu.key);

            if (findMenu) {
              state.selectedMenu = {
                gr: menu.group!,
                mn: menu.key,
              };
              moveUrl(`${menu.group}/${menu.key}`, menu.title);
            }
          })
        );
      },
      openMenu: (menu: SideMenuItemsChildProps | SideMenuItemsChildProps) => {
        set(
          produce((state: MenuStoreProps) => {
            if (
              !state.openedMenus.find(
                (s) => s.key === menu.key && s.group === menu.group
              )
            ) {
              state.openedMenus.push(menu);
            }
            state.selectedMenu = { gr: menu.group!, mn: menu.key };
            moveUrl(`${menu.group}/${menu.key}`, menu.title);
          })
        );
      },
      openedMenuSetComponent: (mns: SideMenuItemsChildProps[]) => {
        set(
          produce((state: MenuStoreProps) => {
            state.openedMenus = mns;
          })
        );
      },
      closeMenu: (menu: SideMenuItemsChildProps | SideMenuItemsChildProps) => {
        set(
          produce((state: MenuStoreProps) => {
            const closeTabIndex = state.openedMenus.findIndex(
              (s) => s.key === menu.key
            );
            const sameKey =
              state.selectedMenu?.gr === menu.group &&
              state.selectedMenu?.mn === menu.key;

            if (
              state.openedMenus.find(
                (s) => s.group === menu.group && s.key === menu.key
              )
            ) {
              state.openedMenus = state.openedMenus.filter(
                (s) => `${s.group}:${s.key}` !== `${menu.group}:${menu.key}`
              );
            }

            if (state.openedMenus.length === 0) {
              moveUrl(`/`, "MES");
            } else {
              if (!sameKey) return;

              if (closeTabIndex === state.openedMenus.length) {
                const k = state.openedMenus[closeTabIndex - 1].key;
                const g = state.openedMenus[closeTabIndex - 1].group;
                const t = state.openedMenus[closeTabIndex - 1].title;
                state.selectedMenu = { gr: g!, mn: k };
                moveUrl(`${g}/${k}`, t);
              } else {
                state.selectedMenu = {
                  gr: state.openedMenus[closeTabIndex].group!,
                  mn: state.openedMenus[closeTabIndex].key,
                };
                moveUrl(
                  `${state.openedMenus[closeTabIndex].group}/${state.openedMenus[closeTabIndex].key}`,
                  state.openedMenus[closeTabIndex].title
                );
              }
            }
          })
        );
      },
      menuOrderChanges: (openedMenus: SideMenuItemsChildProps[]) => {
        set(
          produce((state: MenuStoreProps) => {
            state.openedMenus = openedMenus;
          })
        );
      },
      closeAllTabls: () => {
        set(
          produce((state: MenuStoreProps) => {
            state.openedMenus = state.openedMenus.filter(
              (x) => x.main === true
            );
            const { group, key } = state.openedMenus.filter(
              (x) => x.main === true
            )[0];
            state.selectedMenu = { gr: group, mn: key };
            moveUrl(`${group}/${key}`, "MES");
          })
        );
      },
    }),
    {
      name: "menu-storage",
      partialize: (state: MenuStoreProps) => ({
        openedMenus: state.openedMenus,
        selectedMenu: state.selectedMenu,
      }),
      storage: createJSONStorage(() => sessionStorage),
      version: 0.002,
    }
  )
);

export { useMenuStore };
export type { MenuStoreProps };
