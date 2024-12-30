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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
var ContextMenu = function (_a) {
    var children = _a.children, list = _a.list;
    var _b = __read(React.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var _c = __read(React.useState({ x: 0, y: 0 }), 2), position = _c[0], setPosition = _c[1];
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
    return (_jsxs("div", __assign({ onContextMenu: handleContextMenu }, { children: [children, list && isOpen && (_jsx("ul", __assign({ css: css({
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
                }) }, { children: list.map(function (item) { return (_jsx("li", __assign({ onClick: item.onClick, css: css({
                        padding: "7px",
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: "#35ffbe",
                        },
                    }) }, { children: item.label }), item.label)); }) })))] })));
};
export default ContextMenu;
