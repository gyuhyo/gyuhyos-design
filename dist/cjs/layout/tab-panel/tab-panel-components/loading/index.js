"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabPanelLoading = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var rotate = (0, react_1.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    from {\n        -webkit-transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n"], ["\n    from {\n        -webkit-transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n"])));
exports.TabPanelLoading = React.memo(function () {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            visibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(0, 0, 0, 0.5)",
            opacity: 0,
            backdropFilter: "blur(3px)",
            zIndex: 3,
            transition: "backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out",
        }) }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                width: 200,
                height: 80,
                background: "#fff",
                borderRadius: 7,
                position: "relative",
                display: "flex",
                alignItems: "center",
            }) }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ viewBox: "-200 0 500 5", width: 100, height: 80 }, { children: (0, jsx_runtime_1.jsx)("circle", { cx: "0", cy: "0", r: "100", fill: "none", stroke: "#a0a0a0", strokeWidth: "20", strokeDasharray: "50 10", css: (0, react_1.css)({
                            animation: "".concat(rotate, " 1000ms linear infinite"),
                        }) }) })), (0, jsx_runtime_1.jsx)("span", { children: "\uCC98\uB9AC\uC911..." })] })) })));
});
var templateObject_1;
