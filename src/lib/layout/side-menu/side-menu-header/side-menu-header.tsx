/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { SideMenuHeaderLogo } from "./side-menu-header-logo";
function SideMenuHeader({ isShow }: { isShow: boolean }) {
  return (
    <div
      css={css({
        height: "60px",
        lineHeight: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: "13px",
        alignItems: "center",
        padding: "0px 17px",
      })}
    >
      <span
        css={css({
          fontSize: 21,
          cursor: "pointer",
          width: "auto",
        })}
        onClick={() => window.sideMenu(!isShow)}
      >
        {isShow ? <>&#x2715;</> : <>&#x2630;</>}
      </span>
    </div>
  );
}

export default SideMenuHeader;
