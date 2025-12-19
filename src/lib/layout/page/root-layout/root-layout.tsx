/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLayout } from "../../contexts/layout-context";
import SideMenuContainer from "../../side-menu/side-menu-container";
import SideSettingSliderContainer from "../../side-setting-slider/side-setting-slider-container";
import RootLayoutHeader from "../../root-layout-header/root-layout-header";
import TabPanelContainer from "../../tab-panel/tab-panel-container";
import MesChatBot from "../../../mes-chat-bot";

function RootLayout() {
  const { menuType, calculWidth } = useLayout();
  const pathName = window.location.pathname;

  if (pathName === "/auth" || pathName.includes("popup")) return <></>;

  return (
    <div
      css={css({
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "row",
      })}
    >
      {(menuType === "slide" || menuType === "multiple") && (
        <SideMenuContainer />
      )}
      <div
        id="gyud_main_container"
        css={css({
          width: calculWidth,
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <div css={css({ flex: "none" })}>
          <SideSettingSliderContainer />
          <RootLayoutHeader />
        </div>
        <div
          css={css({
            flex: "1 1 0%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
          })}
        >
          <TabPanelContainer />
          {process.env.REACT_APP_MES_CHAT_BOT === "true" && <MesChatBot />}
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
