import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { zusPersistNSync } from "./zusPersistNSync";
import { persistNSync } from "persist-and-sync";

export interface IUser {
  userNo: string | undefined;
  userType: string | undefined;
  userName: string | undefined;
  message: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  refreshTokenCreatedAt: number | undefined;
  refreshTokenInExpire: number | undefined;
  accessTokenCreatedAt: number | undefined;
  tokenInExpire: number | undefined;
  login24h: boolean | undefined;
}

export type TSetUser = (user: IUser) => void;
export type TUpdateAccess = ({
  token,
  createdAt,
  expired,
}: {
  token: string;
  createdAt: string;
  expired: string;
}) => void;
export type TUpdateRefresh = (token: string, expired: string) => void;

export interface IUserStore {
  me: IUser;
  signIn: TSetUser;
  signOut: () => void;
}

const initialState: IUser = {
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

const useUserStore = create<IUserStore>()(
  persistNSync(
    (set: any) => ({
      me: initialState,
      signIn: (user: IUser) => {
        set(
          produce((state: IUserStore) => {
            state.me = user;
          })
        );
      },
      signOut: () => {
        set(
          produce((state: IUserStore) => {
            window.sessionStorage.removeItem("menu-storage");
            window.localStorage.removeItem("user-storage");
            state.me = initialState;
          })
        );
      },
    }),
    {
      name: "user-storage",
      storage: "localStorage",
      include: ["me"],
      initDelay: 0,
    }
  )
);

export { useUserStore };
