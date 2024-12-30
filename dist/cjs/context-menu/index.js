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
var react_1 = __importDefault(require("react"));
var react_2 = require("@emotion/react");
var ContextMenu = function (_a) {
    var children = _a.children, list = _a.list;
    var _b = __read(react_1.default.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var _c = __read(react_1.default.useState({ x: 0, y: 0 }), 2), position = _c[0], setPosition = _c[1];
    var handleContextMenu = function (e) {
        if (!list)
            return;
        e.preventDefault();
        var x = e.clientX;
        var y = e.clientY;
        // const menuWidth = 150; // 메뉴 예상 너비
        // const menuHeight = 100; // 메뉴 예상 높이
        // const adjustedX =
        //   x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : x;
        // const adjustedY =
        //   y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : y;
        setPosition({ x: x, y: y });
        setIsOpen(true);
        window.addEventListener("click", function () {
            setIsOpen(false);
        });
        return function () {
            window.removeEventListener("click", function () {
                setIsOpen(false);
            });
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ onContextMenu: handleContextMenu }, { children: [children, list && isOpen && ((0, jsx_runtime_1.jsx)("ul", __assign({ css: (0, react_2.css)({
                    position: "fixed",
                    top: position.y,
                    left: position.x,
                    zIndex: 99999,
                    backgroundColor: "white",
                    border: "1px solid #cccccc",
                    borderRadius: "4px",
                    padding: "7px",
                    listStyle: "none",
                    minWidth: "100px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                }) }, { children: list.map(function (item) { return ((0, jsx_runtime_1.jsx)("li", __assign({ onClick: item.onClick, css: (0, react_2.css)({
                        padding: "7px",
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: "#35ffbe",
                        },
                    }) }, { children: item.label }), item.label)); }) })))] })));
};
exports.default = ContextMenu;
