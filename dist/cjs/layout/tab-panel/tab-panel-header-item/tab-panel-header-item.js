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
var message_context_1 = require("../../../alert-message/context/message-context");
var menu_store_1 = require("../../stores/menu-store");
function TabPanelHeaderItem(_a) {
    var menu = _a.menu, active = _a.active, hasClose = _a.hasClose, dragProvided = _a.dragProvided, dragSnapshot = _a.dragSnapshot;
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var closeMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.closeMenu; });
    var changeSelectedMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.changeSelectedMenu; });
    var onTabCloseClick = function (e) {
        e.stopPropagation();
        showMessage({
            title: "탭 닫기",
            message: "탭 페이지를 닫으시겠습니까?",
            okCaption: "닫기",
            onOkClick: function () { return closeMenu(menu); },
        });
    };
    var onTabClick = function () {
        changeSelectedMenu(menu);
    };
    var isVisibilityCloseButton = React.useMemo(function () {
        if (typeof hasClose === "undefined") {
            return true;
        }
        else {
            return hasClose;
        }
    }, [hasClose]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ onClick: onTabClick, ref: dragProvided.innerRef }, dragProvided.draggableProps, { style: __assign({}, dragProvided.draggableProps.style), css: (0, react_1.css)({
            whiteSpace: "nowrap",
            position: "relative",
            height: "100%",
            padding: isVisibilityCloseButton ? "0px 7px" : "0px 7px",
            borderInline: "1px solid #1f619d".concat(active ? "99" : "00"),
            borderBottom: "1px solid rgba(255, 255, 255, ".concat(active ? "1" : "0", ")"),
            background: "#ffffff99",
            alignContent: "center",
            zIndex: active ? 2 : "",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                borderTop: active ? "6px solid #1f619d" : "",
                borderRight: active ? "1px solid #1f619d" : "",
                borderLeft: active ? "1px solid #1f619d" : "",
                transition: "border 200ms linear",
            },
            "&::after": {
                content: "''",
                visibility: active ? "hidden" : "visible",
                width: "1px",
                height: "60%",
                right: 0,
                left: "-2px",
                position: "absolute",
                background: "#d2d2d2",
                top: "50%",
                transform: "translateY(-50%)",
            },
            "&:hover": {
                background: active ? "" : "#e5edf4",
                transition: "background-color 200ms linear",
            },
        }) }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({}, dragProvided.dragHandleProps, { css: (0, react_1.css)({
                    width: "100%",
                    textAlign: "left",
                }) }, { children: menu.title })), (menu.hasClose === undefined || menu.hasClose === true) && ((0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({
                    width: "22px",
                    textAlign: "center",
                    color: "#f40077",
                    fontFamily: "cursive",
                    WebkitTextStrokeWidth: "medium",
                    cursor: "pointer",
                    "&:hover": {
                        background: "#fbdcdc",
                        borderRadius: "7px",
                        padding: "0px 3px",
                    },
                }), onClick: onTabCloseClick }, { children: "\u2715" })))] })));
}
exports.default = React.memo(TabPanelHeaderItem);
