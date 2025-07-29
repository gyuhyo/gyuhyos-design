import { produce } from "immer";
import { create } from "zustand";
import { persistNSync } from "persist-and-sync";
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
var useUserStore = create()(persistNSync(function (set) { return ({
    me: initialState,
    signIn: function (user) {
        set(produce(function (state) {
            state.me = user;
        }));
    },
    signOut: function () {
        set(produce(function (state) {
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
export { useUserStore };
