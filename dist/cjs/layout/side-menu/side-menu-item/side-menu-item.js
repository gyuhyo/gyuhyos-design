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
var menu_store_1 = require("../../stores/menu-store");
function SideMenuItem(_a) {
    var item = _a.item;
    var openMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.openMenu; });
    var onMenuClick = function () {
        openMenu(item);
    };
    return ((0, jsx_runtime_1.jsx)("li", __assign({ onClick: onMenuClick }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ css: (0, react_1.css)({
                padding: "0px 28px",
            }) }, { children: item.title })) })));
}
exports.default = SideMenuItem;
