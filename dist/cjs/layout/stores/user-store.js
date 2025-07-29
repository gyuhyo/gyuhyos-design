"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
var immer_1 = require("immer");
var zustand_1 = require("zustand");
var persist_and_sync_1 = require("persist-and-sync");
var initialState = {
    userNo: undefined,
    userType: undefined,
    userName: undefined,
    message: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    refreshTokenCreatedAt: undefined,
    refreshTokenInExpire: undefined,
    accessTokenCreatedAt: undefined,
    tokenInExpire: undefined,
    login24h: undefined,
};
var useUserStore = (0, zustand_1.create)()((0, persist_and_sync_1.persistNSync)(function (set) { return ({
    me: initialState,
    signIn: function (user) {
        set((0, immer_1.produce)(function (state) {
            state.me = user;
        }));
    },
    signOut: function () {
        set((0, immer_1.produce)(function (state) {
            window.sessionStorage.removeItem("menu-storage");
            window.localStorage.removeItem("user-storage");
            state.me = initialState;
        }));
    },
}); }, {
    name: "user-storage",
    storage: "localStorage",
    include: ["me"],
    initDelay: 0,
}));
exports.useUserStore = useUserStore;
