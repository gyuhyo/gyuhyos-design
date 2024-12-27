"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenuStore = void 0;
var immer_1 = require("immer");
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var moveUrl_1 = require("../utils/moveUrl");
var user_store_1 = require("./user-store");
var useMenuStore = (0, zustand_1.create)((0, middleware_1.persist)(function (set) { return ({
    menus: [],
    setInitialMenus: function (initialMenus) {
        set((0, immer_1.produce)(function (state) {
            var userStore = user_store_1.useUserStore.getState();
            state.menus = initialMenus;
            var menus = initialMenus.flatMap(function (x) {
                return x.children === undefined ? x : x.children;
            });
            var mainMenu = menus.find(function (x) { return x.main === true; });
            if (userStore.me.userNo !== undefined &&
                !state.openedMenus.find(function (x) { return x.key === mainMenu.key; })) {
                state.openedMenus.push(Object.assign(mainMenu, { hasClose: false }));
                (0, moveUrl_1.moveUrl)("".concat(mainMenu.group, "/").concat(mainMenu.key), mainMenu.title);
                state.selectedMenu = { gr: mainMenu.group, mn: mainMenu.key };
            }
        }));
    },
    openedMenus: [],
    selectedMenu: { gr: "", mn: "" },
    changeSelectedMenu: function (menu) {
        set((0, immer_1.produce)(function (state) {
            var findMenu = state.openedMenus.find(function (s) { return s.key === menu.key; });
            if (findMenu) {
                state.selectedMenu = {
                    gr: menu.group,
                    mn: menu.key,
                };
                (0, moveUrl_1.moveUrl)("".concat(menu.group, "/").concat(menu.key), menu.title);
            }
        }));
    },
    openMenu: function (menu) {
        set((0, immer_1.produce)(function (state) {
            if (!state.openedMenus.find(function (s) { return s.key === menu.key && s.group === menu.group; })) {
                state.openedMenus.push(menu);
            }
            state.selectedMenu = { gr: menu.group, mn: menu.key };
            (0, moveUrl_1.moveUrl)("".concat(menu.group, "/").concat(menu.key), menu.title);
        }));
    },
    openedMenuSetComponent: function (mns) {
        set((0, immer_1.produce)(function (state) {
            state.openedMenus = mns;
        }));
    },
    closeMenu: function (menu) {
        set((0, immer_1.produce)(function (state) {
            var _a, _b;
            var closeTabIndex = state.openedMenus.findIndex(function (s) { return s.key === menu.key; });
            var sameKey = ((_a = state.selectedMenu) === null || _a === void 0 ? void 0 : _a.gr) === menu.group &&
                ((_b = state.selectedMenu) === null || _b === void 0 ? void 0 : _b.mn) === menu.key;
            if (state.openedMenus.find(function (s) { return s.key === menu.key; })) {
                state.openedMenus = state.openedMenus.filter(function (s) { return s.key !== menu.key; });
            }
            if (state.openedMenus.length === 0) {
                (0, moveUrl_1.moveUrl)("/", "MES");
            }
            else {
                if (!sameKey)
                    return;
                if (closeTabIndex === state.openedMenus.length) {
                    var k = state.openedMenus[closeTabIndex - 1].key;
                    var g = state.openedMenus[closeTabIndex - 1].group;
                    var t = state.openedMenus[closeTabIndex - 1].title;
                    state.selectedMenu = { gr: g, mn: k };
                    (0, moveUrl_1.moveUrl)("".concat(g, "/").concat(k), t);
                }
                else {
                    state.selectedMenu = {
                        gr: state.openedMenus[closeTabIndex].group,
                        mn: state.openedMenus[closeTabIndex].key,
                    };
                    (0, moveUrl_1.moveUrl)("".concat(state.openedMenus[closeTabIndex].group, "/").concat(state.openedMenus[closeTabIndex].key), state.openedMenus[closeTabIndex].title);
                }
            }
        }));
    },
    menuOrderChanges: function (openedMenus) {
        set((0, immer_1.produce)(function (state) {
            state.openedMenus = openedMenus;
        }));
    },
}); }, {
    name: "menu-storage",
    partialize: function (state) { return ({
        openedMenus: state.openedMenus,
        selectedMenu: state.selectedMenu,
    }); },
    storage: (0, middleware_1.createJSONStorage)(function () { return sessionStorage; }),
    version: 0.002,
}));
exports.useMenuStore = useMenuStore;
