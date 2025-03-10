/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import Button from "../../button";
import { useMenuStore } from "../stores/menu-store";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../types/side-menu-item-props";
import { useLayout } from "../contexts/layout-context";
import RootLayoutHeaderMenuPop from "./root-layout-header-menu-pop/root-layout-header-menu-pop";

const RootLayoutMenu: React.FC<any> = React.memo(() => {
  const openMenu = useMenuStore((state) => state.openMenu);
  const items = useMenuStore<(SideMenuItemsProps | SideMenuItemsChildProps)[]>(
    (state) => state.menus
  );
  const { menuType } = useLayout();
  const [searchMenuText, setSearchMenuText] = React.useState<string>("");
  const [isPopShow, setIsPopShow] = React.useState<boolean>(false);

  const onMenuSearch = (search: string) => {
    setSearchMenuText(search);
  };

  const onRemoveSearchText = () => {
    setSearchMenuText("");
  };

  const CreatedMenus = (menus: SideMenuItemsChildProps[], depth = 0) => {
    const menuContainerCss = () => {
      const commonChildrenStyle: SerializedStyles = css({
        "& > li": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "7px",
          position: "relative",
          cursor: "pointer",
          lineHeight: "20px",
          "& > ul": {
            opacity: 0,
          },
          "&:hover": {
            color: "#0c6d9e",
          },
        },
      });

      const commonUiStyle: SerializedStyles = css({
        zIndex: 3,
        visibility: "hidden",
        position: "absolute",
        top: "30px",
        width: "max-content",
        background: "#fff",
        fontSize: "1.0rem",
        color: "#4d4d4d",
        boxShadow: "3px 3px 12px #00000030, -3px 3px 12px #00000030",
        listStyle: "none",
        padding: "0px",
      });

      if (depth === 0) {
        return css(
          {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            columnGap: "70px",
            fontWeight: "bold",
            fontSize: "1.13rem",
            letterSpacing: "2px",
            color: "#4d4d4d",
          },
          commonChildrenStyle
        );
      }

      if (depth === 1) {
        return css(commonUiStyle, commonChildrenStyle, {
          "& > li": {
            columnGap: "20px",
            borderBottom: "1px solid #ddd",
            padding: "9px 12px",
            "&:hover": {
              background: "#ebebeb",
            },
          },
        });
      }

      return css(commonUiStyle, commonChildrenStyle, {
        top: "0px",
        left: "calc(100% + 3px)",
        "& > li": {
          columnGap: "20px",
          borderBottom: "1px solid #ddd",
          padding: "9px 12px",
          "&:hover": {
            background: "#ebebeb",
          },
        },
      });
    };

    const onMenuClick = (e: any) => {
      const target = e.currentTarget as HTMLLIElement; // 이벤트가 바인딩된 요소
      target.classList.toggle("clickedMenu");

      const handleClickOutside = (event: MouseEvent) => {
        // 클릭한 요소가 현재 메뉴의 자식인지 확인
        if (
          !target.contains(event.target as Node) ||
          (event.target as HTMLElement).querySelector("ul") === null
        ) {
          target.classList.remove("clickedMenu");
          window.removeEventListener("click", handleClickOutside);
        }
      };

      setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 0); // 이벤트 루프 뒤로 밀기
    };

    return (
      <ul css={menuContainerCss}>
        {menus.map((menu) => {
          if (menu.children && menu.children.length > 0) {
            return (
              <li
                key={menu.key}
                onClick={(e) => {
                  if (menu.onClick !== undefined) {
                    menu.onClick({
                      key: menu.key,
                      title: menu.title,
                      group: menu.group,
                      hasChildren:
                        menu.children !== undefined && menu.children.length > 0,
                      hasComponent:
                        menu.component !== undefined && menu.component !== null,
                    });
                  }
                  onMenuClick(e);
                }}
              >
                <span style={{ pointerEvents: "none" }}>{menu.title}</span>
                <span
                  css={css({
                    pointerEvents: "none",
                    transform: depth === 0 ? "rotate(90deg)" : "rotate(0)",
                  })}
                >
                  &#x276f;
                </span>
                {CreatedMenus(menu.children, depth + 1)}
              </li>
            );
          }

          return (
            <li
              key={menu.key}
              onClick={() => {
                if (menu.onClick !== undefined) {
                  menu.onClick({
                    key: menu.key,
                    title: menu.title,
                    group: menu.group,
                    hasChildren:
                      menu.children !== undefined && menu.children.length > 0,
                    hasComponent:
                      menu.component !== undefined && menu.component !== null,
                  });
                }
                openMenu(menu);
              }}
            >
              <span style={{ pointerEvents: "none" }}>{menu.title}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {menuType === "slide" ? (
        <div
          css={css({
            position: "relative",
            overflow: "visible",
            width: 300,
            lineHeight: "35px",
            background: "#fff",
            border: "1px solid #c0c0c0",
            borderRadius: "7px",
            display: "flex",
            flexDirection: "row",
          })}
        >
          <input
            type="text"
            placeholder="메뉴 검색"
            css={css({
              flex: "1 1 0%",
              borderRadius: "7px",
              paddingLeft: "7px",
            })}
            value={searchMenuText}
            onChange={(e: any) => onMenuSearch(e.target.value)}
            onFocus={() => setIsPopShow(true)}
            onBlur={() => setIsPopShow(false)}
          />
          <Button
            onClick={onRemoveSearchText}
            css={css({
              visibility: searchMenuText ? "visible" : "hidden",
            })}
            compact
          >
            ✕
          </Button>
          <RootLayoutHeaderMenuPop
            isPopShow={isPopShow}
            value={searchMenuText}
            onRemoveSearchText={onRemoveSearchText}
          />
        </div>
      ) : (
        CreatedMenus(items)
      )}
    </div>
  );
});

export default RootLayoutMenu;
