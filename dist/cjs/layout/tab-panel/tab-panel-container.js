"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var tab_panel_content_1 = __importDefault(require("./tab-panel-content/tab-panel-content"));
var tab_panel_header_1 = __importDefault(require("./tab-panel-header/tab-panel-header"));
var loading_1 = require("./tab-panel-components/loading");
var context_menu_1 = __importDefault(require("../../context-menu"));
var message_context_1 = require("../../alert-message/context/message-context");
var menu_store_1 = require("../stores/menu-store");
require("./panel.css");
var TabPanelContentDynamicComponent = React.lazy(function () {
    return Promise.resolve().then(function () { return __importStar(require("./tab-panel-content-dynamic-component/tab-panel-content-dynamic-content")); });
});
function TabPanelContainer() {
    var _a = (0, menu_store_1.useMenuStore)(), closeAllTabls = _a.closeAllTabls, closeNotMyTabs = _a.closeNotMyTabs, closeHighIndexTabs = _a.closeHighIndexTabs;
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var onCloseAllTabls = function () {
        showMessage({
            title: "탭 모두 닫기",
            message: "탭 페이지를 모두 닫으시겠습니까?",
            okCaption: "닫기",
            onOkClick: function () { return closeAllTabls(); },
        });
    };
    var onCloseNotMyTabs = function () {
        showMessage({
            title: "열린 탭을 제외한 모든 탭 모두 닫기",
            message: "열린 탭을 제외한 모든 탭 페이지를 모두 닫으시겠습니까?",
            okCaption: "닫기",
            onOkClick: function () { return closeNotMyTabs(); },
        });
    };
    var onCloseHighIndexTabs = function () {
        showMessage({
            title: "열린 탭 기준 오른쪽 모든 탭 닫기",
            message: "열린 탭 기준 오른쪽 모든 탭 페이지를 모두 닫으시겠습니까?",
            okCaption: "닫기",
            onOkClick: function () { return closeHighIndexTabs(); },
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
        }) }, { children: [(0, jsx_runtime_1.jsx)(loading_1.TabPanelLoading, {}), (0, jsx_runtime_1.jsx)(context_menu_1.default, __assign({ list: [
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
                ] }, { children: (0, jsx_runtime_1.jsx)(tab_panel_header_1.default, {}) })), (0, jsx_runtime_1.jsx)(tab_panel_content_1.default, { children: (0, jsx_runtime_1.jsx)(TabPanelContentDynamicComponent, {}) })] })));
}
exports.default = React.memo(TabPanelContainer);
