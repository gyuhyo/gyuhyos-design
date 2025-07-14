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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var side_menu_item_1 = __importDefault(require("./side-menu-item"));
var menu_store_1 = require("../../stores/menu-store");
function SideMenuItemGroup(_a) {
    var group = _a.group, isShow = _a.isShow;
    var _b = __read(React.useState(false), 2), groupOpened = _b[0], setGroupOpened = _b[1];
    var openMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.openMenu; });
    React.useEffect(function () {
        if (!isShow) {
            setGroupOpened(false);
        }
    }, [isShow]);
    return ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                    padding: "0px 17px",
                    height: "45px",
                    lineHeight: "45px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": {
                        color: "#00b5ff",
                        cursor: "pointer",
                    },
                }), onClick: function () {
                    if (group.children !== undefined && group.children.length > 0) {
                        if (!isShow) {
                            window.sideMenu(true);
                        }
                        setGroupOpened(!groupOpened);
                    }
                    else {
                        openMenu(group);
                    }
                } }, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [group.iconName !== undefined && ((0, jsx_runtime_1.jsx)("i", { className: "fa-".concat(group.iconType === undefined ? "solid" : group.iconType, " fa-").concat(group.iconName), css: (0, react_1.css)([
                                    {
                                        width: "21px",
                                        fontSize: "21px",
                                        marginRight: 20,
                                    },
                                    !isShow && {
                                        "&:hover": {
                                            "&::after": {
                                                content: "'".concat(group.title, "'"),
                                                position: "fixed",
                                                left: "60px",
                                                background: "#000",
                                                color: "#fff",
                                                fontSize: "12px",
                                                padding: "7px 3px",
                                                transform: "background-color 200ms linear",
                                                zIndex: 5,
                                            },
                                        },
                                    },
                                ]) })), group.title] }), group.children !== undefined && group.children.length > 0 && ((0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-angle-down", css: (0, react_1.css)({
                            transform: groupOpened ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 200ms ease-in-out",
                        }) }))] })), (0, jsx_runtime_1.jsx)("ul", __assign({ css: (0, react_1.css)({
                    background: "#002230",
                    lineHeight: "40px",
                    borderBottom: "#000",
                    height: groupOpened
                        ? "".concat((group.children
                            ? group.children.filter(function (f) { return f.visible; }).length
                            : 0) * 40, "px")
                        : "0px",
                    transition: "height 200ms ease-in-out",
                    overflow: "hidden",
                    "& > li:hover": {
                        background: "#00000040",
                        color: "#00b5ff",
                        cursor: "pointer",
                    },
                }) }, { children: group.children &&
                    group.children
                        .filter(function (f) { return f.visible; })
                        .map(function (itm) { return ((0, jsx_runtime_1.jsx)(side_menu_item_1.default, { item: itm }, "".concat(group.key, "-").concat(itm.key))); }) }))] }));
}
exports.default = SideMenuItemGroup;
