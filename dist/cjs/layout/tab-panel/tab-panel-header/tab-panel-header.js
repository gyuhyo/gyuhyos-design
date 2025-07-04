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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var tab_panel_header_item_1 = __importDefault(require("../tab-panel-header-item/tab-panel-header-item"));
var menu_store_1 = require("../../stores/menu-store");
var button_1 = __importDefault(require("../../../button"));
var dnd_1 = require("@hello-pangea/dnd");
var mainKey = {
    group: "",
    key: "",
    title: "",
};
function TabPanelHeader() {
    var containerRef = React.useRef(null);
    var _a = __read(React.useState(false), 2), hasScrollbar = _a[0], setHasScrollbar = _a[1];
    var _b = __read(React.useState(false), 2), isDrop = _b[0], setIsDrop = _b[1];
    var _c = (0, menu_store_1.useMenuStore)(), menus = _c.menus, openMenu = _c.openMenu, openedMenus = _c.openedMenus, selectedMenu = _c.selectedMenu, changeSelectedMenu = _c.changeSelectedMenu, menuOrderChanges = _c.menuOrderChanges;
    var searchParams = new URLSearchParams(window.location.search);
    var pageNotFound = function () {
        alert("페이지를 찾을 수 없습니다.");
        changeSelectedMenu(mainKey);
    };
    React.useEffect(function () {
        var _a;
        if (menus.length === 0)
            return;
        var gm = searchParams.get("gm");
        var flatMaps = menus.flatMap(function (x) {
            return x.children === undefined ? x : x.children;
        });
        var mainMenu = flatMaps.find(function (x) { return x.main === true; });
        mainKey = {
            group: (_a = mainMenu.group) !== null && _a !== void 0 ? _a : "",
            key: mainMenu.key,
            title: mainMenu.title,
        };
        if (!gm) {
            changeSelectedMenu(mainKey);
            return;
        }
        if (gm === "/") {
            changeSelectedMenu(mainKey);
        }
        else if (gm !== "/") {
            var gms = gm.split("/");
            if (!gms || gms.length === 1) {
                pageNotFound();
                return;
            }
            var group_1 = gms[0];
            var menuKey_1 = gms[1];
            var om = openedMenus.find(function (f) { return f.group === group_1 && f.key === menuKey_1; });
            if (!om) {
                var mg = menus.find(function (m) { return m.key === group_1; });
                if (!mg || !mg.children) {
                    pageNotFound();
                    return;
                }
                var mc = mg.children.find(function (g) { return g.key === menuKey_1; });
                if (mc) {
                    openMenu(mc);
                }
                else {
                    pageNotFound();
                }
            }
            else {
                if (selectedMenu.gr !== group_1 || selectedMenu.mn !== menuKey_1) {
                    var findNewMenuGroup = menus.find(function (m) { return m.key === group_1; });
                    var findNewMenu = findNewMenuGroup.children.find(function (c) { return c.key === menuKey_1; });
                    changeSelectedMenu(findNewMenu);
                }
            }
        }
    }, [menus]);
    React.useEffect(function () {
        var checkForScrollbar = function () {
            if (containerRef.current) {
                var _a = containerRef.current, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
                setHasScrollbar(scrollWidth > clientWidth);
            }
        };
        var observer = new MutationObserver(function () {
            checkForScrollbar();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
            });
        }
        // Initial check
        checkForScrollbar();
        window.addEventListener("resize", checkForScrollbar);
        // Cleanup observer on component unmount
        return function () {
            window.removeEventListener("resize", checkForScrollbar);
            if (containerRef.current) {
                observer.disconnect();
            }
        };
    }, []);
    var onRightScroll = function () {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft + 150,
                behavior: "smooth",
            });
        }
    };
    var onLeftScroll = function () {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft - 150,
                behavior: "smooth",
            });
        }
    };
    var setRowOrderChange = React.useCallback(function (e) {
        setIsDrop(false);
        if (!e.destination)
            return;
        var startIndex = e.source.index;
        var endIndex = e.destination.index;
        if (startIndex === endIndex || openedMenus[endIndex].main === true)
            return;
        // 데이터 순서 변경
        var newDataSource = __spreadArray([], __read(openedMenus), false);
        var _a = __read(newDataSource.splice(startIndex, 1), 1), removed = _a[0];
        newDataSource.splice(endIndex, 0, removed);
        menuOrderChanges(newDataSource);
    }, [openedMenus]);
    React.useEffect(function () {
        if (!containerRef.current)
            return;
        var element = containerRef.current;
        if (element) {
            // 'wheel' 이벤트 리스너 추가
            var onWheel_1 = function (e) {
                // 기본 세로 스크롤 동작을 막음
                e.preventDefault();
                // 휠의 Y축 움직임(e.deltaY)을 X축 스크롤(element.scrollLeft)에 더해줌
                element.scrollTo({
                    left: element.scrollLeft + e.deltaY,
                    behavior: "smooth", // 부드럽게 스크롤
                });
            };
            element.addEventListener("wheel", onWheel_1);
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거 (메모리 누수 방지)
            return function () { return element.removeEventListener("wheel", onWheel_1); };
        }
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행
    return ((0, jsx_runtime_1.jsx)(dnd_1.DragDropContext, __assign({ onDragEnd: setRowOrderChange }, { children: (0, jsx_runtime_1.jsx)(dnd_1.Droppable, __assign({ droppableId: "droppable", mode: "standard", type: "", direction: "horizontal", isDropDisabled: isDrop }, { children: function (provided) {
                var combinedRef = function (element) {
                    if (containerRef && containerRef.current !== element) {
                        containerRef.current = element;
                    }
                    if (provided.innerRef) {
                        provided.innerRef(element); // provided.innerRef를 합쳐서 사용
                    }
                };
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: combinedRef }, provided.droppableProps, { css: (0, react_1.css)({
                        flex: "none",
                        height: "35px",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        overflowY: "hidden",
                        overflowX: "auto",
                        position: "relative",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        scrollbarWidth: "none",
                    }) }, { children: [openedMenus &&
                            openedMenus.map(function (menu, index) { return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, __assign({ draggableId: "".concat(menu.group, "-").concat(menu.key), index: index, isDragDisabled: menu.main }, { children: function (provided2, snapshot) {
                                    var style = provided2.draggableProps.style;
                                    if (style !== undefined) {
                                        var transform = provided2.draggableProps.style.transform;
                                        if (transform) {
                                            // 기존에는 transform의 Y축을 분리하여 사용했으므로, 이제 X축으로 변경
                                            var t = transform.split(",")[0]; // X축 값을 가져옵니다.
                                            provided2.draggableProps.style.transform =
                                                t + ", 0px)"; // X축만 조정
                                        }
                                    }
                                    return ((0, jsx_runtime_1.jsx)(tab_panel_header_item_1.default, { menu: menu, active: selectedMenu.gr === menu.group &&
                                            selectedMenu.mn === menu.key, dragProvided: provided2, dragSnapshot: snapshot }, "tab-".concat(menu.group, "-").concat(menu.key)));
                                } }), "".concat(menu.group, "-").concat(menu.key))); }), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                                display: hasScrollbar ? "flex" : "none",
                                flexDirection: "row",
                                columnGap: "3px",
                                position: "sticky",
                                right: 0,
                                top: 0,
                                padding: "5px 7px",
                                height: "100%",
                                background: "#fff",
                                boxShadow: "-1px 0px 15px 7px rgba(0, 0, 0, 0.5)",
                                zIndex: 2,
                            }) }, { children: [(0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#a0a0a0", color: "#fff", css: (0, react_1.css)({ height: "100%" }), onClick: onLeftScroll }, { children: "\u276E" })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#a0a0a0", color: "#fff", css: (0, react_1.css)({ height: "100%" }), onClick: onRightScroll }, { children: "\u276F" }))] }))] })));
            } })) })));
}
exports.default = React.memo(TabPanelHeader);
