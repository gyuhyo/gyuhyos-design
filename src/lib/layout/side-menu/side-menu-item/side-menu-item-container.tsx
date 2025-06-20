/** @jsxImportSource @emotion/react */

import * as React from "react";
import SideMenuItemGroup from "./side-menu-item-group";
import { useMenuStore } from "../../stores/menu-store";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../../types/side-menu-item-props";
import { css } from "@emotion/react";

function SideMenuItemContainer({ isShow }: { isShow: boolean }) {
  const items = useMenuStore<SideMenuItemsProps[]>((state) => state.menus);

  return (
    <ul
      className="menu-container"
      css={css({
        textWrap: "nowrap",
        overflowX: "hidden",
        overflowY: "auto",
        height: "calc(100dvh - 60px)",
        letterSpacing: 3,
      })}
    >
      {items &&
        items
          .filter((f) => {
            return f.children && f.children.filter((c) => c.visible).length > 0;
          })
          .map((group) => (
            <SideMenuItemGroup isShow={isShow} key={group.key} group={group} />
          ))}
    </ul>
  );
}

export default SideMenuItemContainer;
