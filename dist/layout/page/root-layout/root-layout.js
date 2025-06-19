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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLayout } from "../../contexts/layout-context";
import SideMenuContainer from "../../side-menu/side-menu-container";
import SideSettingSliderContainer from "../../side-setting-slider/side-setting-slider-container";
import RootLayoutHeader from "../../root-layout-header/root-layout-header";
import TabPanelContainer from "../../tab-panel/tab-panel-container";
function RootLayout() {
    var _a = useLayout(), menuType = _a.menuType, calculWidth = _a.calculWidth;
    var pathName = window.location.pathname;
    if (pathName === "/auth" || pathName.includes("popup"))
        return _jsx(_Fragment, {});
    return (_jsxs("div", __assign({ css: css({
            width: "100dvw",
            height: "100dvh",
            display: "flex",
            flexDirection: "row",
        }) }, { children: [(menuType === "slide" || menuType === "multiple") && (_jsx(SideMenuContainer, {})), _jsxs("div", __assign({ id: "gyud_main_container", css: css({
                    width: calculWidth,
                    height: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                }) }, { children: [_jsxs("div", __assign({ css: css({ flex: "none" }) }, { children: [_jsx(SideSettingSliderContainer, {}), _jsx(RootLayoutHeader, {})] })), _jsx("div", __assign({ css: css({ flex: "1 1 0%", overflow: "hidden" }) }, { children: _jsx(TabPanelContainer, {}) })), _jsx("div", __assign({ css: css({
                            height: "30px",
                            flex: "none",
                            background: "linear-gradient(180deg, #d8d8d8, #ddd, #fff)",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 14px",
                            fontSize: "0.8rem",
                        }) }, { children: _jsx("p", { children: "\uC2DC\uC2A4\uD15C \uBA54\uC2DC\uC9C0" }) }))] }))] })));
}
export default RootLayout;
