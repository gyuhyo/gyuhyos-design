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
export type TUpdateAccess = ({ token, createdAt, expired, }: {
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
declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<IUserStore>>;
export { useUserStore };
