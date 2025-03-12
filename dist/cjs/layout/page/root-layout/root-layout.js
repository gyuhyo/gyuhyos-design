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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var layout_context_1 = require("../../contexts/layout-context");
var side_menu_container_1 = __importDefault(require("../../side-menu/side-menu-container"));
var side_setting_slider_container_1 = __importDefault(require("../../side-setting-slider/side-setting-slider-container"));
var root_layout_header_1 = __importDefault(require("../../root-layout-header/root-layout-header"));
var tab_panel_container_1 = __importDefault(require("../../tab-panel/tab-panel-container"));
function RootLayout() {
    var _a = (0, layout_context_1.useLayout)(), menuType = _a.menuType, calculWidth = _a.calculWidth;
    var pathName = window.location.pathname;
    if (pathName === "/auth" || pathName.includes("popup"))
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
            width: "100dvw",
            height: "100dvh",
            display: "flex",
            flexDirection: "row",
        }) }, { children: [(menuType === "slide" || menuType === "multiple") && ((0, jsx_runtime_1.jsx)(side_menu_container_1.default, {})), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                    width: calculWidth,
                    height: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                }) }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({ flex: "none" }) }, { children: [(0, jsx_runtime_1.jsx)(side_setting_slider_container_1.default, {}), (0, jsx_runtime_1.jsx)(root_layout_header_1.default, {})] })), (0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({ flex: "1 1 0%", overflow: "hidden" }) }, { children: (0, jsx_runtime_1.jsx)(tab_panel_container_1.default, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({
                            height: "30px",
                            flex: "none",
                            background: "linear-gradient(180deg, #d8d8d8, #ddd, #fff)",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 14px",
                            fontSize: "0.8rem",
                        }) }, { children: (0, jsx_runtime_1.jsx)("p", { children: "\uC2DC\uC2A4\uD15C \uBA54\uC2DC\uC9C0" }) }))] }))] })));
}
exports.default = RootLayout;
