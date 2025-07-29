/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { MessageClicentProps } from "../types/message-context-props";
export declare const MessageProvider: React.MemoExoticComponent<({ children }: {
    children: ReactNode;
}) => import("@emotion/react/jsx-runtime").JSX.Element>;
export declare const useMessage: () => MessageClicentProps;
