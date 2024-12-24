/** @jsxImportSource @emotion/react */

import { rootLayoutHeaderStyle } from "./root-layout-header-style";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { MdClose, MdSearch } from "react-icons/md";
import { useLayout } from "../contexts/layout-context";
import RootLayoutMenu from "./root-layout-menu";
import RootLayoutUserCard from "./root-layout-user-card";
import "./style.css";
import { css } from "@emotion/react";

function RootLayoutHeader() {
  const { menuType } = useLayout();
  return (
    <header css={rootLayoutHeaderStyle}>
      <img
        src="http://sqw.iptime.org:8092/header_logo_left1.png"
        width={60}
        height={30}
      />
      <RootLayoutMenu />
      <RootLayoutUserCard />
    </header>
  );
}

export default RootLayoutHeader;