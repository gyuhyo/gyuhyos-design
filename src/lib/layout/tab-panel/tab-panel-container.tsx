/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import TabPanelContent from "./tab-panel-content/tab-panel-content";
import TabPanelHeader from "./tab-panel-header/tab-panel-header";
import { TabPanelLoading } from "./tab-panel-components/loading";

const TabPanelContentDynamicComponent = React.lazy(
  () =>
    import(
      "./tab-panel-content-dynamic-component/tab-panel-content-dynamic-content"
    )
);
function TabPanelContainer() {
  // React.useEffect(() => {
  //   document.addEventListener("keydown", (event) => {
  //     if (event.key === "Tab") {
  //       event.preventDefault(); // Tab 키의 기본 동작 막기
  //     }
  //   });
  // }, []);
  return (
    <div
      css={css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      })}
    >
      <TabPanelLoading />
      <TabPanelHeader />
      <TabPanelContent>
        <TabPanelContentDynamicComponent />
      </TabPanelContent>
    </div>
  );
}

export default React.memo(TabPanelContainer);
