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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
function SideMenuHeader(_a) {
    var isShow = _a.isShow;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({
            height: "60px",
            lineHeight: "60px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: "13px",
            alignItems: "center",
            padding: "0px 17px",
        }) }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ css: (0, react_1.css)({
                fontSize: 21,
                cursor: "pointer",
                width: "auto",
            }), onClick: function () { return window.sideMenu(!isShow); } }, { children: isShow ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "\u2715" }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "\u2630" }) })) })));
}
exports.default = SideMenuHeader;
