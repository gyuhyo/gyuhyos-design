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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useMessage } from "../../../alert-message/context/message-context";
import { useMenuStore } from "../../stores/menu-store";
function TabPanelHeaderItem(_a) {
    var menu = _a.menu, active = _a.active, hasClose = _a.hasClose, dragProvided = _a.dragProvided, dragSnapshot = _a.dragSnapshot;
    var showMessage = useMessage().showMessage;
    var closeMenu = useMenuStore(function (state) { return state.closeMenu; });
    var changeSelectedMenu = useMenuStore(function (state) { return state.changeSelectedMenu; });
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
    return (_jsxs("div", __assign({ onClick: onTabClick, ref: dragProvided.innerRef }, dragProvided.draggableProps, { style: __assign({}, dragProvided.draggableProps.style), css: css({
            whiteSpace: "nowrap",
            position: "relative",
            height: "100%",
            padding: isVisibilityCloseButton ? "0px 7px" : "0px 7px",
            borderInline: "1px solid rgba(var(--panel-border-color), ".concat(active ? "0.9" : "0", ")"),
            borderBottom: "1px solid rgba(var(--background-color), ".concat(active ? "1" : "0", ")"),
            background: "rgba(var(--background-color), 0.9)",
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
                borderTop: active ? "6px solid rgb(var(--panel-border-color))" : "",
                borderRight: active ? "1px solid rgb(var(--panel-border-color))" : "",
                borderLeft: active ? "1px solid rgb(var(--panel-border-color))" : "",
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
                background: active ? "" : "var(--panel-hover-color)",
                transition: "background-color 200ms linear",
            },
        }) }, { children: [_jsx("p", __assign({}, dragProvided.dragHandleProps, { css: css({
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer !important",
                }) }, { children: menu.title })), (menu.hasClose === undefined || menu.hasClose === true) && (_jsx("p", __assign({ css: css({
                    width: "22px",
                    textAlign: "center",
                    color: "#f40077",
                    fontFamily: "cursive",
                    WebkitTextStrokeWidth: "medium",
                    cursor: "pointer !important",
                    "&:hover": {
                        background: "#fbdcdc",
                        borderRadius: "7px",
                        padding: "0px 3px",
                    },
                }), onClick: onTabCloseClick }, { children: "\u2715" })))] })));
}
export default React.memo(TabPanelHeaderItem);
