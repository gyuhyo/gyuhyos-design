import React from "react";
interface BackdropContextProps {
    isShow: boolean;
    setIsShow: (isShow: boolean) => void;
}
export declare const BackdropProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useBackdrop: () => BackdropContextProps;
export {};
