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
  const items = useMenuStore<(SideMenuItemsProps | SideMenuItemsChildProps)[]>(
    (state) => state.menus
  );

  return (
    <ul
      className="menu-container"
      css={css({
        textWrap: "nowrap",
        overflowX: "hidden",
        overflowY: "auto",
        height: "calc(100vh - 60px)",
        letterSpacing: 3,
      })}
    >
      {items &&
        items.map((group) => (
          <SideMenuItemGroup isShow={isShow} key={group.key} group={group} />
        ))}
    </ul>
  );
}

export default SideMenuItemContainer;
