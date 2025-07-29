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
import * as React from "react";
import SideMenuHeader from "./side-menu-header/side-menu-header";
import { sideMenuContainerStyle } from "./side-menu-style";
import SideMenuItemContainer from "./side-menu-item/side-menu-item-container";
var SideMenuContainer = function () {
    var _a = __read(React.useState(false), 2), isShow = _a[0], setIsShow = _a[1];
    React.useEffect(function () {
        if (typeof window !== "undefined") {
            window.sideMenu = setIsShow;
        }
    }, [setIsShow]);
    var onBackdropClick = function (e) {
        e.stopPropagation();
        window.sideMenu(false);
    };
    var onMenuClick = function (e) {
        var target = e.currentTarget; // 이벤트가 바인딩된 요소
        var handleClickOutside = function (event) {
            // 클릭한 요소가 현재 메뉴의 자식인지 확인
            if (!target.contains(event.target)) {
                window.sideMenu(false);
                window.removeEventListener("click", handleClickOutside);
            }
        };
        setTimeout(function () {
            window.addEventListener("click", handleClickOutside);
        }, 0); // 이벤트 루프 뒤로 밀기
    };
    return (_jsxs("div", __assign({ css: sideMenuContainerStyle({ opened: isShow }), onClick: onMenuClick }, { children: [_jsx(SideMenuHeader, { isShow: isShow }), _jsx(SideMenuItemContainer, { isShow: isShow })] })));
};
export default SideMenuContainer;
