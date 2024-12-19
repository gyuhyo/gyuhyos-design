/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import { useMenuStore } from "../../stores/menu-store";
import { SideMenuItemsChildProps } from "../../types/side-menu-item-props";
function RootLayoutHeaderMenuPop({
  value,
  onRemoveSearchText,
}: {
  value?: string;
  onRemoveSearchText: () => void;
}) {
  const openMenu = useMenuStore((state) => state.openMenu);
  const menus = useMenuStore((state) => state.menus);

  const filteredMenus = React.useMemo(() => {
    if (!value) return null;

    let searchMenus = [];

    for (let m of menus) {
      const mns = m.children?.filter(
        (m) => m.title.includes(value) || m.shortKey?.includes(value)
      );

      if (mns) {
        searchMenus.push(...mns);
      }
    }

    return searchMenus;
  }, [value, menus]);

  const onMenuClick = (menu: SideMenuItemsChildProps) => {
    openMenu(menu);
    onRemoveSearchText();
  };

  return (
    <div
      css={css({
        visibility: value ? "visible" : "hidden",
        position: "absolute",
        overflow: "auto",
        top: "42px",
        left: "0px",
        width: 300,
        height: 150,
        background: "#fff",
        boxShadow: "3px 3px 11px rgba(0, 0, 0, 0.5)",
        borderRadius: "7px",
        zIndex: 3,
      })}
    >
      {filteredMenus &&
        filteredMenus.map((menu) => (
          <p
            key={`${menu.group}-${menu.key}`}
            css={css({
              margin: 0,
              padding: "5px 7px",
              borderBottom: "1px solid #ddd",
              ":last-of-type": {
                borderBottom: "none",
              },
              cursor: "pointer",
              "&:hover": {
                background: "#eee",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              },
            })}
            onClick={() => onMenuClick(menu)}
          >
            {menu.title}
          </p>
        ))}
    </div>
  );
}

export default RootLayoutHeaderMenuPop;
