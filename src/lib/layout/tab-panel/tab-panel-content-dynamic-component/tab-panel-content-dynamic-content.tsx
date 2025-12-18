/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../../types/side-menu-item-props";
import { useMenuStore } from "../../stores/menu-store";
import { isValidElementType } from "react-is";
import PageErrorLayout from "../../page/page-error-layout";
import { useLayout } from "../../contexts/layout-context";

const TabPanelContentDynamicComponent: React.FC<any> = React.memo(() => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isFirstRef = React.useRef<{
    [key: string]: boolean;
  }>({});

  const {
    menus,
    openedMenus,
    selectedMenu,
    openedMenuSetComponent,
  }: {
    menus: (SideMenuItemsProps | SideMenuItemsChildProps)[];
    openedMenus: SideMenuItemsChildProps[];
    selectedMenu: { gr: string; mn: string };
    openedMenuSetComponent: (mns: SideMenuItemsChildProps[]) => void;
  } = useMenuStore();
  const [contentWidth, setContentWidth] = React.useState("calc(100dvw - 55px)");
  const { calculWidth } = useLayout();

  React.useEffect(() => {
    if (!isFirstRef.current) return;

    const openedMenusKeys = openedMenus.map(
      (menu) => `${menu.group}-${menu.key}`
    );

    const isRefMenusKeys = Object.keys(isFirstRef.current);

    const hasFirstMenu = isRefMenusKeys.filter((key) =>
      openedMenusKeys.includes(key)
    );

    const prevIsFirstRef: { [key: string]: boolean } = {};
    hasFirstMenu.forEach((key) => {
      prevIsFirstRef[key] = isFirstRef.current[key];
    });

    isFirstRef.current = prevIsFirstRef;

    openedMenus.forEach((menu) => {
      if (!isFirstRef.current.hasOwnProperty(`${menu.group}-${menu.key}`)) {
        isFirstRef.current[`${menu.group}-${menu.key}`] = true;
      }
    });
  }, [openedMenus]);

  React.useEffect(() => {
    const { gr, mn } = selectedMenu;

    if (gr === "" || mn === "") return;

    isFirstRef.current[`${gr}-${mn}`] = false;
  }, [selectedMenu]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const moveToCurrentContent = () => {
      if (!contentRef.current) return;

      const findIndex = openedMenus.findIndex(
        (f) => f.group === selectedMenu.gr && f.key === selectedMenu.mn
      );

      contentRef.current.scrollTo({
        left: findIndex * contentRef.current.clientWidth,
      });
    };

    moveToCurrentContent();
    window.addEventListener("resize", moveToCurrentContent);
    // Cleanup observer on component unmount
    return () => {
      window.removeEventListener("resize", moveToCurrentContent);
      if (contentRef.current) {
      }
    };
  }, [menus, openedMenus, selectedMenu, contentRef]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const changeContentWidth = () => {
      if (!contentRef.current) return;
      const width = contentRef.current.clientWidth;
      const contents = document.querySelectorAll(".tab-panel-full-content");

      for (const content of contents) {
        (content as HTMLElement).style.width = `${width}px`;
        (content as HTMLElement).style.minWidth = `${width}px`;
        (content as HTMLElement).style.maxWidth = `${width}px`;
      }
    };

    changeContentWidth();
    window.addEventListener("resize", changeContentWidth);
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", changeContentWidth);
      }
    };
  }, []);

  React.useEffect(() => {
    if (menus.length === 0) return;

    const remakeOpenedMenus = openedMenus.map((mn) => {
      const { group, key, component: Component } = mn;

      const menusFlattingMap = menus.flatMap((m) =>
        m.children === undefined ? m : m.children
      );

      const _component = menusFlattingMap.find(
        (f) => f?.group === group && f?.key === key
      );

      if (_component?.component) {
        return { ...mn, component: _component.component };
      }

      return { ...mn };
    });

    openedMenuSetComponent(remakeOpenedMenus as SideMenuItemsChildProps[]);
  }, [menus]);

  const tabPanelFullContentCss = css({
    height: "calc(100dvh - 95px)",
    width: "calc(100dvw - 55px)",
    minWidth: "calc(100dvw - 55px)",
    maxWidth: "calc(100dvw - 55px)",
    padding: "5px 7px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  });

  return (
    <div
      ref={contentRef}
      className="tab-panel-container"
      css={css({
        height: "100%",
        width: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "row",
      })}
    >
      {openedMenus &&
        openedMenus.map((menu) => {
          const { group, key, component: Component } = menu;
          const isActive = selectedMenu.gr === group && selectedMenu.mn === key;

          if (!isActive && isFirstRef.current[`${group}-${key}`])
            return (
              <div
                key={`${group}/${key}`}
                css={tabPanelFullContentCss}
                style={{
                  visibility: isActive ? "visible" : "hidden",
                }}
                className="tab-panel-full-content"
                data-is-view={isActive}
              ></div>
            );

          if (Component && isValidElementType(Component)) {
            return (
              <div
                key={`${group}/${key}`}
                css={tabPanelFullContentCss}
                style={{
                  visibility: isActive ? "visible" : "hidden",
                }}
                className="tab-panel-full-content"
                data-is-view={isActive}
              >
                <Component />
              </div>
            );
          }

          return (
            <div
              key={`${group}/${key}`}
              css={tabPanelFullContentCss}
              style={{
                visibility: isActive ? "visible" : "hidden",
              }}
              className="tab-panel-full-content"
              data-is-view={isActive}
            >
              <PageErrorLayout menu={menu} errorNo={404} />
            </div>
          );
        })}
    </div>
  );
});

export default TabPanelContentDynamicComponent;
