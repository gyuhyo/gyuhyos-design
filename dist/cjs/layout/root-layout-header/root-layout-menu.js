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
var react_1 = require("@emotion/react");
var react_2 = __importDefault(require("react"));
var button_1 = __importDefault(require("../../button"));
var menu_store_1 = require("../stores/menu-store");
var layout_context_1 = require("../contexts/layout-context");
var root_layout_header_menu_pop_1 = __importDefault(require("./root-layout-header-menu-pop/root-layout-header-menu-pop"));
var RootLayoutMenu = react_2.default.memo(function () {
    var openMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.openMenu; });
    var menuSearchInputRef = react_2.default.useRef(null);
    var items = (0, menu_store_1.useMenuStore)(function (state) { return state.menus; });
    var menuType = (0, layout_context_1.useLayout)().menuType;
    var _a = __read(react_2.default.useState(""), 2), searchMenuText = _a[0], setSearchMenuText = _a[1];
    var _b = __read(react_2.default.useState(false), 2), isPopShow = _b[0], setIsPopShow = _b[1];
    react_2.default.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var openMenuWithShortKey = function (e) {
            if (e.key === "f" && e.ctrlKey) {
                setIsPopShow(true);
                menuSearchInputRef.current.focus();
            }
        };
        window.addEventListener("keydown", openMenuWithShortKey);
        return function () { return window.removeEventListener("keydown", openMenuWithShortKey); };
    }, []);
    var onMenuSearch = function (search) {
        setSearchMenuText(search);
    };
    var onRemoveSearchText = function () {
        setSearchMenuText("");
        menuSearchInputRef.current.value = "";
    };
    var CreatedMenus = function (menus, depth) {
        if (depth === void 0) { depth = 0; }
        var menuContainerCss = function () {
            var commonChildrenStyle = (0, react_1.css)({
                "& > li": {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "7px",
                    position: "relative",
                    cursor: "pointer",
                    lineHeight: "20px",
                    "& > ul": {
                        opacity: 0,
                    },
                    "&:hover": {
                        color: "#0c6d9e",
                    },
                },
            });
            var commonUiStyle = (0, react_1.css)({
                zIndex: 3,
                visibility: "hidden",
                position: "absolute",
                top: "30px",
                width: "max-content",
                background: "#fff",
                fontSize: "1.0rem",
                color: "#4d4d4d",
                boxShadow: "3px 3px 12px #00000030, -3px 3px 12px #00000030",
                listStyle: "none",
                padding: "0px",
            });
            if (depth === 0) {
                return (0, react_1.css)({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    columnGap: "70px",
                    fontWeight: "bold",
                    fontSize: "1.13rem",
                    letterSpacing: "2px",
                    color: "#4d4d4d",
                }, commonChildrenStyle);
            }
            if (depth === 1) {
                return (0, react_1.css)(commonUiStyle, commonChildrenStyle, {
                    "& > li": {
                        columnGap: "20px",
                        borderBottom: "1px solid #ddd",
                        padding: "9px 12px",
                        "&:hover": {
                            background: "#ebebeb",
                        },
                    },
                });
            }
            return (0, react_1.css)(commonUiStyle, commonChildrenStyle, {
                top: "0px",
                left: "calc(100% + 3px)",
                "& > li": {
                    columnGap: "20px",
                    borderBottom: "1px solid #ddd",
                    padding: "9px 12px",
                    "&:hover": {
                        background: "#ebebeb",
                    },
                },
            });
        };
        var onMenuClick = function (e) {
            var target = e.currentTarget; // 이벤트가 바인딩된 요소
            target.classList.toggle("clickedMenu");
            var handleClickOutside = function (event) {
                // 클릭한 요소가 현재 메뉴의 자식인지 확인
                if (!target.contains(event.target) ||
                    event.target.querySelector("ul") === null) {
                    target.classList.remove("clickedMenu");
                    window.removeEventListener("click", handleClickOutside);
                }
            };
            setTimeout(function () {
                window.addEventListener("click", handleClickOutside);
            }, 0); // 이벤트 루프 뒤로 밀기
        };
        return ((0, jsx_runtime_1.jsx)("ul", __assign({ css: menuContainerCss }, { children: menus.map(function (menu) {
                if (menu.children && menu.children.length > 0) {
                    return ((0, jsx_runtime_1.jsxs)("li", __assign({ onClick: function (e) {
                            if (menu.onClick !== undefined) {
                                menu.onClick({
                                    key: menu.key,
                                    title: menu.title,
                                    group: menu.group,
                                    hasChildren: menu.children !== undefined && menu.children.length > 0,
                                    hasComponent: menu.component !== undefined && menu.component !== null,
                                });
                            }
                            onMenuClick(e);
                        } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { pointerEvents: "none" } }, { children: menu.title })), (0, jsx_runtime_1.jsx)("span", __assign({ css: (0, react_1.css)({
                                    pointerEvents: "none",
                                    transform: depth === 0 ? "rotate(90deg)" : "rotate(0)",
                                }) }, { children: "\u276F" })), CreatedMenus(menu.children, depth + 1)] }), menu.key));
                }
                return ((0, jsx_runtime_1.jsx)("li", __assign({ onClick: function () {
                        if (menu.onClick !== undefined) {
                            menu.onClick({
                                key: menu.key,
                                title: menu.title,
                                group: menu.group,
                                hasChildren: menu.children !== undefined && menu.children.length > 0,
                                hasComponent: menu.component !== undefined && menu.component !== null,
                            });
                        }
                        openMenu(menu);
                    } }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ style: { pointerEvents: "none" } }, { children: menu.title })) }), menu.key));
            }) })));
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: menuType === "slide" ? ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                position: "relative",
                overflow: "visible",
                width: 300,
                lineHeight: "35px",
                background: "rgb(var(--background-color))",
                border: "1px solid var(--default-border-color)",
                borderRadius: "7px",
                display: "flex",
                flexDirection: "row",
            }) }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: menuSearchInputRef, type: "text", placeholder: "\uBA54\uB274 \uAC80\uC0C9", css: (0, react_1.css)({
                        flex: "1 1 0%",
                        borderRadius: "7px",
                        paddingLeft: "7px",
                        background: "rgb(var(--background-color))",
                    }), value: searchMenuText, onChange: function (e) { return onMenuSearch(e.target.value); }, onFocus: function () { return setIsPopShow(true); } }), searchMenuText ? ((0, jsx_runtime_1.jsx)(button_1.default, __assign({ onClick: function (e) {
                        onRemoveSearchText();
                    }, compact: true }, { children: "\u2715" }))) : ((0, jsx_runtime_1.jsxs)("p", __assign({ css: (0, react_1.css)({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "anchor-center",
                        marginRight: 7,
                    }) }, { children: [(0, jsx_runtime_1.jsx)("kbd", { children: "Ctrl" }), "+", (0, jsx_runtime_1.jsx)("kbd", { children: "F" })] }))), (0, jsx_runtime_1.jsx)(root_layout_header_menu_pop_1.default, { isPopShow: isPopShow, value: searchMenuText, onRemoveSearchText: onRemoveSearchText })] }))) : (CreatedMenus(items)) }));
});
exports.default = RootLayoutMenu;
