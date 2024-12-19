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
var TabPanelContentDynamicComponent = React.lazy(function () {
    return Promise.resolve().then(function () { return __importStar(require("./tab-panel-content-dynamic-component/tab-panel-content-dynamic-content")); });
});
function TabPanelContainer() {
    // React.useEffect(() => {
    //   document.addEventListener("keydown", (event) => {
    //     if (event.key === "Tab") {
    //       event.preventDefault(); // Tab 키의 기본 동작 막기
    //     }
    //   });
    // }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
        }) }, { children: [(0, jsx_runtime_1.jsx)(loading_1.TabPanelLoading, {}), (0, jsx_runtime_1.jsx)(tab_panel_header_1.default, {}), (0, jsx_runtime_1.jsx)(tab_panel_content_1.default, { children: (0, jsx_runtime_1.jsx)(TabPanelContentDynamicComponent, {}) })] })));
}
exports.default = React.memo(TabPanelContainer);
