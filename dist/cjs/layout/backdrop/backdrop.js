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
var backdrop_style_1 = require("./backdrop.style");
function Backdrop(props) {
    React.useEffect(function () {
        var body = document.querySelector("body");
        if (props.isShow) {
            if (body)
                body.style.overflow = "hidden";
        }
        else {
            if (body)
                body.style.overflow = "";
        }
        return function () {
            if (body)
                body.style.overflow = "";
        };
    }, [props.isShow]);
    var onBackdropClick = function (e) {
        if (!props.onClick)
            return;
        props.onClick(e);
    };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)(__assign({ visibility: props.isShow ? "visible" : "hidden", transitionProperty: "visibility", transitionDuration: "200ms", display: "flex" }, props.styles)), onClick: function (e) { return onBackdropClick(e); } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ css: (0, backdrop_style_1.BACK_DROP_STYLE)({
                show: props.isShow,
                styles: props.backdropStyles,
            }) }, { children: props.children })) })));
}
exports.default = Backdrop;
