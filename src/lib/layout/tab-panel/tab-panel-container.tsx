/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import TabPanelContent from "./tab-panel-content/tab-panel-content";
import TabPanelHeader from "./tab-panel-header/tab-panel-header";
import { TabPanelLoading } from "./tab-panel-components/loading";
import ContextMenu from "../../context-menu";
import { useMessage } from "../../alert-message/context/message-context";
import { useMenuStore } from "../stores/menu-store";
import "./panel.css";

const TabPanelContentDynamicComponent = React.lazy(
  () =>
    import(
      "./tab-panel-content-dynamic-component/tab-panel-content-dynamic-content"
    )
);
function TabPanelContainer() {
  const { closeAllTabls, closeNotMyTabs, closeHighIndexTabs } = useMenuStore();
  const { showMessage } = useMessage();

  const onCloseAllTabls = () => {
    showMessage({
      title: "탭 모두 닫기",
      message: "탭 페이지를 모두 닫으시겠습니까?",
      okCaption: "닫기",
      onOkClick: () => closeAllTabls(),
    });
  };

  const onCloseNotMyTabs = () => {
    showMessage({
      title: "열린 탭을 제외한 모든 탭 모두 닫기",
      message: "열린 탭을 제외한 모든 탭 페이지를 모두 닫으시겠습니까?",
      okCaption: "닫기",
      onOkClick: () => closeNotMyTabs(),
    });
  };

  const onCloseHighIndexTabs = () => {
    showMessage({
      title: "열린 탭 기준 오른쪽 모든 탭 닫기",
      message: "열린 탭 기준 오른쪽 모든 탭 페이지를 모두 닫으시겠습니까?",
      okCaption: "닫기",
      onOkClick: () => closeHighIndexTabs(),
    });
  };

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
      <ContextMenu
        list={[
          {
            label: "탭 모두 닫기",
            onClick: onCloseAllTabls,
          },
          {
            label: "열린 탭을 제외한 모든 탭 닫기",
            onClick: onCloseNotMyTabs,
          },
          {
            label: "열린 탭 기준 오른쪽 모든 탭 닫기",
            onClick: onCloseHighIndexTabs,
          },
        ]}
      >
        <TabPanelHeader />
      </ContextMenu>
      <TabPanelContent>
        <TabPanelContentDynamicComponent />
      </TabPanelContent>
    </div>
  );
}

export default React.memo(TabPanelContainer);
