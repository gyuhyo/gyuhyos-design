/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useMenuStore } from "../../stores/menu-store";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../../types/side-menu-item-props";

interface SideMenuItemProps {
  item: SideMenuItemsChildProps;
}

function SideMenuItem({ item }: SideMenuItemProps) {
  const openMenu = useMenuStore((state) => state.openMenu);

  const onMenuClick = () => {
    openMenu(item);
  };
  return (
    <li onClick={onMenuClick}>
      <span
        css={css({
          padding: "0px 28px",
        })}
      >
        {item.title}
      </span>
    </li>
  );
}

export default SideMenuItem;
