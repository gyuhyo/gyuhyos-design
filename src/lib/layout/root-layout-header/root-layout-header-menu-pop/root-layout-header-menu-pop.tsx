/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import { useMenuStore } from "../../stores/menu-store";
import { SideMenuItemsChildProps } from "../../types/side-menu-item-props";
import { convertQwertyToHangul, getChoseong } from "es-hangul";
function RootLayoutHeaderMenuPop({
  isPopShow,
  value,
  onRemoveSearchText,
}: {
  isPopShow: boolean;
  value?: string;
  onRemoveSearchText: () => void;
}) {
  const menuPopRef = React.useRef<HTMLDivElement>(null);
  const openMenu = useMenuStore((state) => state.openMenu);
  const menus = useMenuStore((state) => state.menus);

  const filteredMenus = React.useMemo(() => {
    if (!value) return null;

    let searchMenus = [];

    for (let m of menus) {
      const mns = m.children?.filter((m) => {
        const val = value.toLowerCase().replace(/ /g, "");
        const title = m.title.toLowerCase().replace(/ /g, "");

        return (
          title.includes(val) ||
          m.shortKey?.includes(value) ||
          getChoseong(title).includes(val) ||
          title.includes(convertQwertyToHangul(val)) ||
          getChoseong(title).includes(convertQwertyToHangul(val))
        );
      });

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

  React.useEffect(() => {
    if (!menuPopRef.current) return;

    if (!value) {
      setTimeout(() => {
        menuPopRef.current!.style.visibility = "hidden";
      }, 300);
    } else {
      menuPopRef.current!.style.visibility = "visible";
    }
  }, [isPopShow, value]);

  return (
    <div
      ref={menuPopRef}
      css={css({
        visibility: "hidden",
        position: "absolute",
        overflow: "auto",
        top: value ? "42px" : "22px",
        left: "0px",
        width: 300,
        height: 150,
        background: "#fff",
        boxShadow: "3px 3px 11px rgba(0, 0, 0, 0.5)",
        borderRadius: "7px",
        zIndex: 4,
        opacity: value ? 1 : 0,
        transition: "opacity 200ms ease-in-out, top 200ms ease-in-out",
      })}
    >
      {!value && (
        <p
          css={css({
            textAlign: "center",
            height: "100%",
            alignContent: "center",
            color: "#a0a0a0",
          })}
        >
          메뉴를 입력해 주세요.
        </p>
      )}
      {value && filteredMenus?.length === 0 && (
        <p
          css={css({
            textAlign: "center",
            height: "100%",
            alignContent: "center",
            color: "#a0a0a0",
          })}
        >
          검색하신 메뉴가 존재하지 않습니다.
        </p>
      )}
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
