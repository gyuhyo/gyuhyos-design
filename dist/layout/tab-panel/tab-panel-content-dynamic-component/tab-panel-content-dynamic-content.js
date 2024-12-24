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
    var _a = useMenuStore(), menus = _a.menus, openedMenus = _a.openedMenus, selectedMenu = _a.selectedMenu, openedMenuSetComponent = _a.openedMenuSetComponent;
    var calculWidth = useLayout().calculWidth;
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
        height: "100%",
        width: calculWidth,
        minWidth: calculWidth,
        maxWidth: calculWidth,
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
                if (Component && isValidElementType(Component)) {
                    return (_jsx("div", __assign({ css: tabPanelFullContentCss, style: {
                            visibility: selectedMenu.gr === group && selectedMenu.mn === key
                                ? "visible"
                                : "hidden",
                        }, "data-is-view": selectedMenu.gr === group && selectedMenu.mn === key }, { children: _jsx(Component, {}) }), "".concat(group, "/").concat(key)));
                }
                return (_jsx("div", __assign({ css: tabPanelFullContentCss, style: {
                        visibility: selectedMenu.gr === group && selectedMenu.mn === key
                            ? "visible"
                            : "hidden",
                    }, "data-is-view": selectedMenu.gr === group && selectedMenu.mn === key }, { children: _jsx(PageErrorLayout, { menu: menu, errorNo: 404 }) }), "".concat(group, "/").concat(key)));
            }) })));
});
export default TabPanelContentDynamicComponent;
