import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
var useUserStore = create()(persist(function (set) { return ({
    me: initialState,
    signIn: function (user) {
        set(produce(function (state) {
            state.me = user;
        }));
    },
    signOut: function () {
        set(produce(function (state) {
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
    storage: createJSONStorage(function () { return sessionStorage; }),
    version: 0.001,
}));
export { useUserStore };
