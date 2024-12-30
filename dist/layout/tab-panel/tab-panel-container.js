var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import TabPanelContent from "./tab-panel-content/tab-panel-content";
import TabPanelHeader from "./tab-panel-header/tab-panel-header";
import { TabPanelLoading } from "./tab-panel-components/loading";
import ContextMenu from "../../context-menu";
import { useMessage } from "../../alert-message/context/message-context";
import { useMenuStore } from "../stores/menu-store";
var TabPanelContentDynamicComponent = React.lazy(function () {
    return import("./tab-panel-content-dynamic-component/tab-panel-content-dynamic-content");
});
function TabPanelContainer() {
    var closeAllTabls = useMenuStore().closeAllTabls;
    var showMessage = useMessage().showMessage;
    var onCloseAllTabls = function () {
        showMessage({
            title: "탭 모두 닫기",
            message: "탭 페이지를 모두 닫으시겠습니까?",
            okCaption: "닫기",
            onOkClick: function () { return closeAllTabls(); },
        });
    };
    return (_jsxs("div", __assign({ css: css({
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
        }) }, { children: [_jsx(TabPanelLoading, {}), _jsx(ContextMenu, __assign({ list: [
                    {
                        label: "탭 모두 닫기",
                        onClick: onCloseAllTabls,
                    },
                ] }, { children: _jsx(TabPanelHeader, {}) })), _jsx(TabPanelContent, { children: _jsx(TabPanelContentDynamicComponent, {}) })] })));
}
export default React.memo(TabPanelContainer);
