import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { moveUrl } from "../utils/moveUrl";
import { useUserStore } from "./user-store";
var useMenuStore = create(persist(function (set) { return ({
    menus: [],
    setInitialMenus: function (initialMenus) {
        set(produce(function (state) {
            var userStore = useUserStore.getState();
            state.menus = initialMenus;
            var menus = initialMenus.flatMap(function (x) {
                return x.children === undefined ? x : x.children;
            });
            var mainMenu = menus.find(function (x) { return x.main === true; });
            if (userStore.me.userNo !== undefined &&
                !state.openedMenus.find(function (x) { return x.key === mainMenu.key; })) {
                state.openedMenus.push(Object.assign(mainMenu, { hasClose: false }));
                moveUrl("".concat(mainMenu.group, "/").concat(mainMenu.key), mainMenu.title);
                state.selectedMenu = { gr: mainMenu.group, mn: mainMenu.key };
            }
        }));
    },
    openedMenus: [],
    selectedMenu: { gr: "", mn: "" },
    changeSelectedMenu: function (menu) {
        set(produce(function (state) {
            var findMenu = state.openedMenus.find(function (s) { return s.key === menu.key; });
            if (findMenu) {
                state.selectedMenu = {
                    gr: menu.group,
                    mn: menu.key,
                };
                moveUrl("".concat(menu.group, "/").concat(menu.key), menu.title);
            }
        }));
    },
    openMenu: function (menu) {
        set(produce(function (state) {
            if (!state.openedMenus.find(function (s) { return s.key === menu.key && s.group === menu.group; })) {
                state.openedMenus.push(menu);
            }
            state.selectedMenu = { gr: menu.group, mn: menu.key };
            moveUrl("".concat(menu.group, "/").concat(menu.key), menu.title);
        }));
    },
    openedMenuSetComponent: function (mns) {
        set(produce(function (state) {
            state.openedMenus = mns;
        }));
    },
    closeMenu: function (menu) {
        set(produce(function (state) {
            var _a, _b;
            var closeTabIndex = state.openedMenus.findIndex(function (s) { return s.key === menu.key; });
            var sameKey = ((_a = state.selectedMenu) === null || _a === void 0 ? void 0 : _a.gr) === menu.group &&
                ((_b = state.selectedMenu) === null || _b === void 0 ? void 0 : _b.mn) === menu.key;
            if (state.openedMenus.find(function (s) { return s.key === menu.key; })) {
                state.openedMenus = state.openedMenus.filter(function (s) { return s.key !== menu.key; });
            }
            if (state.openedMenus.length === 0) {
                moveUrl("/", "MES");
            }
            else {
                if (!sameKey)
                    return;
                if (closeTabIndex === state.openedMenus.length) {
                    var k = state.openedMenus[closeTabIndex - 1].key;
                    var g = state.openedMenus[closeTabIndex - 1].group;
                    var t = state.openedMenus[closeTabIndex - 1].title;
                    state.selectedMenu = { gr: g, mn: k };
                    moveUrl("".concat(g, "/").concat(k), t);
                }
                else {
                    state.selectedMenu = {
                        gr: state.openedMenus[closeTabIndex].group,
                        mn: state.openedMenus[closeTabIndex].key,
                    };
                    moveUrl("".concat(state.openedMenus[closeTabIndex].group, "/").concat(state.openedMenus[closeTabIndex].key), state.openedMenus[closeTabIndex].title);
                }
            }
        }));
    },
    menuOrderChanges: function (openedMenus) {
        set(produce(function (state) {
            state.openedMenus = openedMenus;
        }));
    },
    closeAllTabls: function () {
        set(produce(function (state) {
            state.openedMenus = state.openedMenus.filter(function (x) { return x.main === true; });
            var _a = state.openedMenus.filter(function (x) { return x.main === true; })[0], group = _a.group, key = _a.key;
            state.selectedMenu = { gr: group, mn: key };
            moveUrl("".concat(group, "/").concat(key), "MES");
        }));
    },
}); }, {
    name: "menu-storage",
    partialize: function (state) { return ({
        openedMenus: state.openedMenus,
        selectedMenu: state.selectedMenu,
    }); },
    storage: createJSONStorage(function () { return sessionStorage; }),
    version: 0.002,
}));
export { useMenuStore };
