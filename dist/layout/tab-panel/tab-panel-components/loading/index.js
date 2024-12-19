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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import * as React from "react";
var rotate = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    from {\n        -webkit-transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n"], ["\n    from {\n        -webkit-transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n"])));
export var TabPanelLoading = React.memo(function () {
    return (_jsx("div", __assign({ css: css({
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
        }) }, { children: _jsxs("div", __assign({ css: css({
                width: 200,
                height: 80,
                background: "#fff",
                borderRadius: 7,
                position: "relative",
                display: "flex",
                alignItems: "center",
            }) }, { children: [_jsx("svg", __assign({ viewBox: "-200 0 500 5", width: 100, height: 80 }, { children: _jsx("circle", { cx: "0", cy: "0", r: "100", fill: "none", stroke: "#a0a0a0", strokeWidth: "20", strokeDasharray: "50 10", css: css({
                            animation: "".concat(rotate, " 1000ms linear infinite"),
                        }) }) })), _jsx("span", { children: "\uCC98\uB9AC\uC911..." })] })) })));
});
var templateObject_1;
