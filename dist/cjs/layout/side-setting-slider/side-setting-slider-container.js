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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var React = __importStar(require("react"));
var side_setting_slider_style_1 = require("./side-setting-slider-style");
var react_1 = require("@emotion/react");
var button_1 = __importDefault(require("../../button"));
var backdrop_1 = __importDefault(require("../backdrop/backdrop"));
function SideSettingSliderContainer() {
    var _a = __read(React.useState(0.95), 2), fontSize = _a[0], setFontSize = _a[1];
    var _b = __read(React.useState(false), 2), isShow = _b[0], setIsShow = _b[1];
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
    return ((0, jsx_runtime_1.jsx)(backdrop_1.default, __assign({ isShow: isShow, onClick: onBackdropClick }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, side_setting_slider_style_1.sideSettingSliderContainerStyle)({ opened: isShow }), onClick: function (e) { return e.stopPropagation(); } }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                        height: "60px",
                        lineHeight: "60px",
                        borderBottom: "2px solid #ddd",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "14px",
                        alignItems: "center",
                        padding: "0 14px",
                    }) }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { fontSize: 24, cursor: "pointer" }, onClick: function () { return window.sideSetting(false); } }, { children: "\u2715" })), (0, jsx_runtime_1.jsx)("p", { children: "Setting" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                        padding: "30px 14px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "14px",
                    }) }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                                lineHeight: "30px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }) }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uD3F0\uD2B8 \uD06C\uAE30" }), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        border: "1px solid #ddd",
                                        fontSize: "0.85rem",
                                    }) }, { children: [(0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#df4873", color: "#fff", onClick: onFontSizeDown, compact: true, rounded: false }, { children: "-" })), (0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({
                                                padding: "0px 7px",
                                                background: "#fff",
                                            }) }, { children: fontSize.toFixed(2) })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#1f619d", color: "#fff", onClick: onFontSizeUp, compact: true, rounded: false }, { children: "+" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#df4873", color: "#fff", onClick: function () {
                                        window.sessionStorage.removeItem("menu-storage");
                                        window.location.reload();
                                    }, style: {
                                        width: "100%",
                                    }, rounded: false }, { children: "\uC138\uC158 \uC0AD\uC81C" })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { marginTop: 7, fontSize: 11 } }, { children: "\uC5C5\uB370\uC774\uD2B8\uB85C \uC778\uD55C \uBA54\uB274\uAC00 \uC62C\uBC14\uB974\uAC8C \uC791\uB3D9\uD558\uC9C0 \uC54A\uC744\uB54C \uD074\uB9AD" }))] })] }))] })) })));
}
exports.default = SideSettingSliderContainer;
