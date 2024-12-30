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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import * as React from "react";
import { sideSettingSliderContainerStyle } from "./side-setting-slider-style";
import { css } from "@emotion/react";
import Button from "../../button";
import Backdrop from "../backdrop/backdrop";
import { useLayout } from "../contexts/layout-context";
function SideSettingSliderContainer() {
    var _a = __read(React.useState(0.95), 2), fontSize = _a[0], setFontSize = _a[1];
    var _b = __read(React.useState(false), 2), isShow = _b[0], setIsShow = _b[1];
    var customSettings = useLayout().customSettings;
    React.useEffect(function () {
        if (typeof window !== "undefined") {
            window.sideSetting = setIsShow;
        }
    }, [setIsShow]);
    var onBackdropClick = function (e) {
        e.stopPropagation();
        window.sideSetting(false);
    };
    var onFontSizeUp = React.useCallback(function () {
        var body = document.querySelector("body");
        if (body) {
            body.style.fontSize = "".concat(fontSize + 0.05, "rem");
            setFontSize(fontSize + 0.05);
        }
    }, [fontSize]);
    var onFontSizeDown = React.useCallback(function () {
        var body = document.querySelector("body");
        if (body) {
            body.style.fontSize = "".concat(fontSize - 0.05, "rem");
            setFontSize(fontSize - 0.05);
        }
    }, [fontSize]);
    return (_jsx(Backdrop, __assign({ isShow: isShow, onClick: onBackdropClick }, { children: _jsxs("div", __assign({ css: sideSettingSliderContainerStyle({ opened: isShow }), onClick: function (e) { return e.stopPropagation(); } }, { children: [_jsxs("div", __assign({ css: css({
                        height: "60px",
                        lineHeight: "60px",
                        borderBottom: "2px solid #ddd",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "14px",
                        alignItems: "center",
                        padding: "0 14px",
                    }) }, { children: [_jsx("span", __assign({ style: { fontSize: 24, cursor: "pointer" }, onClick: function () { return window.sideSetting(false); } }, { children: "\u2715" })), _jsx("p", { children: "Setting" })] })), _jsxs("div", __assign({ css: css({
                        padding: "30px 14px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "14px",
                    }) }, { children: [_jsxs("div", __assign({ css: css({
                                lineHeight: "30px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }) }, { children: [_jsx("p", { children: "\uD3F0\uD2B8 \uD06C\uAE30" }), _jsxs("div", __assign({ css: css({
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        border: "1px solid #ddd",
                                        fontSize: "0.85rem",
                                    }) }, { children: [_jsx(Button, __assign({ bgColor: "#df4873", color: "#fff", onClick: onFontSizeDown, compact: true, rounded: false }, { children: "-" })), _jsx("p", __assign({ css: css({
                                                padding: "0px 7px",
                                                background: "#fff",
                                            }) }, { children: fontSize.toFixed(2) })), _jsx(Button, __assign({ bgColor: "#1f619d", color: "#fff", onClick: onFontSizeUp, compact: true, rounded: false }, { children: "+" }))] }))] })), _jsxs("div", { children: [_jsx(Button, __assign({ bgColor: "#df4873", color: "#fff", onClick: function () {
                                        window.sessionStorage.removeItem("menu-storage");
                                        window.location.reload();
                                    }, style: {
                                        width: "100%",
                                    }, rounded: false }, { children: "\uC138\uC158 \uC0AD\uC81C" })), _jsx("p", __assign({ style: { marginTop: 7, fontSize: 11 } }, { children: "\uC5C5\uB370\uC774\uD2B8\uB85C \uC778\uD55C \uBA54\uB274\uAC00 \uC62C\uBC14\uB974\uAC8C \uC791\uB3D9\uD558\uC9C0 \uC54A\uC744\uB54C \uD074\uB9AD" }))] }), customSettings] }))] })) })));
}
export default SideSettingSliderContainer;
