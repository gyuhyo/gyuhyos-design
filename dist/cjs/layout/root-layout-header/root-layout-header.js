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
/** @jsxImportSource @emotion/react */
var root_layout_header_style_1 = require("./root-layout-header-style");
// import { GiHamburgerMenu } from "react-icons/gi";
// import { MdClose, MdSearch } from "react-icons/md";
var layout_context_1 = require("../contexts/layout-context");
var root_layout_menu_1 = __importDefault(require("./root-layout-menu"));
var root_layout_user_card_1 = __importDefault(require("./root-layout-user-card"));
require("./style.css");
function RootLayoutHeader() {
    var menuType = (0, layout_context_1.useLayout)().menuType;
    return ((0, jsx_runtime_1.jsxs)("header", __assign({ css: root_layout_header_style_1.rootLayoutHeaderStyle }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: "/header_logo_left1.png", width: 60, height: 30 }) }), (0, jsx_runtime_1.jsx)(root_layout_menu_1.default, {}), (0, jsx_runtime_1.jsx)(root_layout_user_card_1.default, {})] })));
}
exports.default = RootLayoutHeader;
