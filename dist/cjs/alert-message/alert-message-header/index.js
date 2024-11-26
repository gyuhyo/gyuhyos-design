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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var alertMessageHeader = function (type) {
    if (type === void 0) { type = "default"; }
    var borderImage = "linear-gradient(90deg, #0d6f9b20 0%, #0d6f9b 50%, #0d6f9b20 100%)";
    if (type === "error") {
        borderImage =
            "linear-gradient(90deg, #ff2c5a20 0%, #ff2c5a 50%, #ff2c5a20 100%)";
    }
    if (type === "warnning") {
        borderImage =
            "linear-gradient(90deg, #dc983620 0%, #dc9836 50%, #dc983620 100%)";
    }
    if (type === "success") {
        borderImage =
            "linear-gradient(90deg, #45bf2d20 0%, #45bf2d 50%, #45bf2d20 100%)";
    }
    return (0, react_1.css)({
        flex: "none",
        padding: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid transparent",
        borderImage: borderImage,
        borderImageSlice: 1,
        boxShadow: "0px 2px 11px #00000030",
    });
};
var alertMessageCloseButton = (0, react_1.css)({
    cursor: "pointer",
    "&::after": {
        content: '"\\2715"',
        color: "#f40077",
        fontWeight: "bold",
        padding: "4px 7px",
        textAlign: "center",
    },
    "&:hover::after": {
        background: "#fbdcdc",
        borderRadius: 7,
    },
});
var AlertMessageHeader = React.memo(function (_a) {
    var type = _a.type, title = _a.title, isCloseButtonVisible = _a.isCloseButtonVisible, onCloseClick = _a.onCloseClick, closeAlert = _a.closeAlert;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: alertMessageHeader(type) }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({ fontWeight: "bold" }) }, { children: title })), isCloseButtonVisible && ((0, jsx_runtime_1.jsx)("div", { css: alertMessageCloseButton, onClick: function (e) {
                    if (onCloseClick) {
                        onCloseClick(e);
                    }
                    closeAlert();
                } }))] })));
});
exports.default = AlertMessageHeader;
