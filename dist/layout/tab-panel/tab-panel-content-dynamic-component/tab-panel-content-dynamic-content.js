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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useMenuStore } from "../../stores/menu-store";
import { isValidElementType } from "react-is";
import PageErrorLayout from "../../page/page-error-layout";
import { useLayout } from "../../contexts/layout-context";
var TabPanelContentDynamicComponent = React.memo(function () {
    var contentRef = React.useRef(null);
    var isFirstRef = React.useRef({});
    var _a = useMenuStore(), menus = _a.menus, openedMenus = _a.openedMenus, selectedMenu = _a.selectedMenu, openedMenuSetComponent = _a.openedMenuSetComponent;
    var _b = __read(React.useState("calc(100dvw - 55px)"), 2), contentWidth = _b[0], setContentWidth = _b[1];
    var calculWidth = useLayout().calculWidth;
    React.useEffect(function () {
        if (!isFirstRef.current)
            return;
        var openedMenusKeys = openedMenus.map(function (menu) { return "".concat(menu.group, "-").concat(menu.key); });
        var isRefMenusKeys = Object.keys(isFirstRef.current);
        var hasFirstMenu = isRefMenusKeys.filter(function (key) {
            return openedMenusKeys.includes(key);
        });
        var prevIsFirstRef = {};
        hasFirstMenu.forEach(function (key) {
            prevIsFirstRef[key] = isFirstRef.current[key];
        });
        isFirstRef.current = prevIsFirstRef;
        openedMenus.forEach(function (menu) {
            if (!isFirstRef.current.hasOwnProperty("".concat(menu.group, "-").concat(menu.key))) {
                isFirstRef.current["".concat(menu.group, "-").concat(menu.key)] = true;
            }
        });
    }, [openedMenus]);
    React.useEffect(function () {
        var gr = selectedMenu.gr, mn = selectedMenu.mn;
        if (gr === "" || mn === "")
            return;
        isFirstRef.current["".concat(gr, "-").concat(mn)] = false;
    }, [selectedMenu]);
    React.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var moveToCurrentContent = function () {
            if (!contentRef.current)
                return;
            var findIndex = openedMenus.findIndex(function (f) { return f.group === selectedMenu.gr && f.key === selectedMenu.mn; });
            contentRef.current.scrollTo({
                left: findIndex * contentRef.current.clientWidth,
            });
        };
        moveToCurrentContent();
        window.addEventListener("resize", moveToCurrentContent);
        // Cleanup observer on component unmount
        return function () {
            window.removeEventListener("resize", moveToCurrentContent);
            if (contentRef.current) {
            }
        };
    }, [menus, openedMenus, selectedMenu, contentRef]);
    React.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var changeContentWidth = function () {
            var e_1, _a;
            if (!contentRef.current)
                return;
            var width = contentRef.current.clientWidth;
            var contents = document.querySelectorAll(".tab-panel-full-content");
            try {
                for (var contents_1 = __values(contents), contents_1_1 = contents_1.next(); !contents_1_1.done; contents_1_1 = contents_1.next()) {
                    var content = contents_1_1.value;
                    content.style.width = "".concat(width, "px");
                    content.style.minWidth = "".concat(width, "px");
                    content.style.maxWidth = "".concat(width, "px");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (contents_1_1 && !contents_1_1.done && (_a = contents_1.return)) _a.call(contents_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        changeContentWidth();
        window.addEventListener("resize", changeContentWidth);
        return function () {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", changeContentWidth);
            }
        };
    }, []);
    React.useEffect(function () {
        if (menus.length === 0)
            return;
        var remakeOpenedMenus = openedMenus.map(function (mn) {
            var group = mn.group, key = mn.key, Component = mn.component;
            var menusFlattingMap = menus.flatMap(function (m) {
                return m.children === undefined ? m : m.children;
            });
            var _component = menusFlattingMap.find(function (f) { return (f === null || f === void 0 ? void 0 : f.group) === group && (f === null || f === void 0 ? void 0 : f.key) === key; });
            if (_component === null || _component === void 0 ? void 0 : _component.component) {
                return __assign(__assign({}, mn), { component: _component.component });
            }
            return __assign({}, mn);
        });
        openedMenuSetComponent(remakeOpenedMenus);
    }, [menus]);
    var tabPanelFullContentCss = css({
        height: "calc(100dvh - 95px)",
        width: "calc(100dvw - 55px)",
        minWidth: "calc(100dvw - 55px)",
        maxWidth: "calc(100dvw - 55px)",
        padding: "5px 7px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
    });
    return (_jsx("div", __assign({ ref: contentRef, css: css({
            height: "100%",
            width: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "row",
        }) }, { children: openedMenus &&
            openedMenus.map(function (menu) {
                var group = menu.group, key = menu.key, Component = menu.component;
                var isActive = selectedMenu.gr === group && selectedMenu.mn === key;
                if (!isActive && isFirstRef.current["".concat(group, "-").concat(key)])
                    return (_jsx("div", { css: tabPanelFullContentCss, style: {
                            visibility: isActive ? "visible" : "hidden",
                        }, className: "tab-panel-full-content", "data-is-view": isActive }, "".concat(group, "/").concat(key)));
                if (Component && isValidElementType(Component)) {
                    return (_jsx("div", __assign({ css: tabPanelFullContentCss, style: {
                            visibility: isActive ? "visible" : "hidden",
                        }, className: "tab-panel-full-content", "data-is-view": isActive }, { children: _jsx(Component, {}) }), "".concat(group, "/").concat(key)));
                }
                return (_jsx("div", __assign({ css: tabPanelFullContentCss, style: {
                        visibility: isActive ? "visible" : "hidden",
                    }, className: "tab-panel-full-content", "data-is-view": isActive }, { children: _jsx(PageErrorLayout, { menu: menu, errorNo: 404 }) }), "".concat(group, "/").concat(key)));
            }) })));
});
export default TabPanelContentDynamicComponent;
