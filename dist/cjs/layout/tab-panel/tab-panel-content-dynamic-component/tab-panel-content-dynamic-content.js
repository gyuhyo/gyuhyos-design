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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var menu_store_1 = require("../../stores/menu-store");
var react_is_1 = require("react-is");
var page_error_layout_1 = __importDefault(require("../../page/page-error-layout"));
var layout_context_1 = require("../../contexts/layout-context");
var TabPanelContentDynamicComponent = React.memo(function () {
    var contentRef = React.useRef(null);
    var isFirstRef = React.useRef({});
    var _a = (0, menu_store_1.useMenuStore)(), menus = _a.menus, openedMenus = _a.openedMenus, selectedMenu = _a.selectedMenu, openedMenuSetComponent = _a.openedMenuSetComponent;
    var calculWidth = (0, layout_context_1.useLayout)().calculWidth;
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
    var tabPanelFullContentCss = (0, react_1.css)({
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
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: contentRef, css: (0, react_1.css)({
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
                    return ((0, jsx_runtime_1.jsx)("div", { css: tabPanelFullContentCss, style: {
                            visibility: isActive ? "visible" : "hidden",
                        }, "data-is-view": isActive }, "".concat(group, "/").concat(key)));
                if (Component && (0, react_is_1.isValidElementType)(Component)) {
                    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: tabPanelFullContentCss, style: {
                            visibility: isActive ? "visible" : "hidden",
                        }, "data-is-view": isActive }, { children: (0, jsx_runtime_1.jsx)(Component, {}) }), "".concat(group, "/").concat(key)));
                }
                return ((0, jsx_runtime_1.jsx)("div", __assign({ css: tabPanelFullContentCss, style: {
                        visibility: isActive ? "visible" : "hidden",
                    }, "data-is-view": isActive }, { children: (0, jsx_runtime_1.jsx)(page_error_layout_1.default, { menu: menu, errorNo: 404 }) }), "".concat(group, "/").concat(key)));
            }) })));
});
exports.default = TabPanelContentDynamicComponent;
