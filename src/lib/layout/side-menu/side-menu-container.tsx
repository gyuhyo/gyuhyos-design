/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import Backdrop from "../backdrop/backdrop";
import SideMenuHeader from "./side-menu-header/side-menu-header";
import { sideMenuContainerStyle } from "./side-menu-style";
import SideMenuItemContainer from "./side-menu-item/side-menu-item-container";

const SideMenuContainer = () => {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.sideMenu = setIsShow;
    }
  }, [setIsShow]);

  const onBackdropClick = (e: any) => {
    e.stopPropagation();
    window.sideMenu(false);
  };

  const onMenuClick = (e: any) => {
    const target = e.currentTarget as HTMLDivElement; // 이벤트가 바인딩된 요소

    const handleClickOutside = (event: MouseEvent) => {
      // 클릭한 요소가 현재 메뉴의 자식인지 확인

      if (!target.contains(event.target as Node)) {
        window.sideMenu(false);
        window.removeEventListener("click", handleClickOutside);
      }
    };

    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 0); // 이벤트 루프 뒤로 밀기
  };

  return (
    <div css={sideMenuContainerStyle({ opened: isShow })} onClick={onMenuClick}>
      <SideMenuHeader isShow={isShow} />
      <SideMenuItemContainer isShow={isShow} />
    </div>
  );
};

export default SideMenuContainer;
