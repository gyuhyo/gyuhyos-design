"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
var immer_1 = require("immer");
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
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
var useUserStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    me: initialState,
    signIn: function (user) {
        set((0, immer_1.produce)(function (state) {
            state.me = user;
        }));
    },
    signOut: function () {
        set((0, immer_1.produce)(function (state) {
            state.me = initialState;
            window.sessionStorage.removeItem("menu-storage");
            window.sessionStorage.removeItem("user-storage");
        }));
    },
}); }, {
    name: "user-storage",
    partialize: function (state) { return ({
        me: state.me,
    }); },
    storage: (0, middleware_1.createJSONStorage)(function () { return sessionStorage; }),
    version: 0.001,
}));
exports.useUserStore = useUserStore;
