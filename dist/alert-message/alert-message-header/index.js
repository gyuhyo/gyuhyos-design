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
    return css({
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
var alertMessageCloseButton = css({
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
    return (_jsxs("div", __assign({ css: alertMessageHeader(type) }, { children: [_jsx("p", __assign({ css: css({ fontWeight: "bold" }) }, { children: title })), isCloseButtonVisible && (_jsx("div", { css: alertMessageCloseButton, onClick: function (e) {
                    if (onCloseClick) {
                        onCloseClick(e);
                    }
                    closeAlert();
                } }))] })));
});
export default AlertMessageHeader;
