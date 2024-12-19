/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLayout } from "../../contexts/layout-context";
import SideMenuContainer from "../../side-menu/side-menu-container";
import SideSettingSliderContainer from "../../side-setting-slider/side-setting-slider-container";
import RootLayoutHeader from "../../root-layout-header/root-layout-header";
import TabPanelContainer from "../../tab-panel/tab-panel-container";

function RootLayout() {
  const { menuType, calculWidth } = useLayout();
  const pathName = window.location.pathname;

  if (pathName === "/auth") return <></>;

  return (
    <div
      css={css({
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      })}
    >
      {(menuType === "slide" || menuType === "multiple") && (
        <SideMenuContainer />
      )}
      <div
        css={css({
          width: calculWidth,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <div css={css({ flex: "none" })}>
          <SideSettingSliderContainer />
          <RootLayoutHeader />
        </div>
        <div css={css({ flex: "1 1 0%", overflow: "hidden" })}>
          <TabPanelContainer />
        </div>
        <div
          css={css({
            height: "30px",
            flex: "none",
            background: "linear-gradient(180deg, #d8d8d8, #ddd, #fff)",
            borderBottom: "2px solid #d3d3d3",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 14px",
            fontSize: "0.8rem",
          })}
        >
          <p>시스템 메시지</p>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
