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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var side_menu_item_group_1 = __importDefault(require("./side-menu-item-group"));
var menu_store_1 = require("../../stores/menu-store");
var react_1 = require("@emotion/react");
function SideMenuItemContainer(_a) {
    var isShow = _a.isShow;
    var items = (0, menu_store_1.useMenuStore)(function (state) { return state.menus; });
    return ((0, jsx_runtime_1.jsx)("ul", __assign({ className: "menu-container", css: (0, react_1.css)({
            textWrap: "nowrap",
            overflowX: "hidden",
            overflowY: "auto",
            height: "calc(100vh - 60px)",
            letterSpacing: 3,
        }) }, { children: items &&
            items.map(function (group) { return ((0, jsx_runtime_1.jsx)(side_menu_item_group_1.default, { isShow: isShow, group: group }, group.key)); }) })));
}
exports.default = SideMenuItemContainer;
