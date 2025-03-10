import { MouseEvent } from "react";
export interface MessageContextProps {
    setIsShow: (isShow: boolean) => void;
}
export interface MessageShowProps {
    alertID?: string;
    type?: string | "default" | "error" | "success" | "warnning";
    title?: string;
    message: string | React.ReactNode;
    okCaption?: string;
    cancelCaption?: string;
    isOkButtonVisible?: boolean;
    onOkClick?: (e?: MouseEvent<HTMLButtonElement>) => void | boolean;
    isCancelButtonVisible?: boolean;
    onCancelClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    isCloseButtonVisible?: boolean;
    onCloseClick?: (e?: MouseEvent<HTMLDivElement>) => void;
    footerStart?: React.ReactNode;
    duration?: number;
}
export interface MessageContextTypes extends MessageContextProps, MessageShowProps {
    type: string;
    title: string;
    okCaption: string;
    cancelCaption: string;
    isOkButtonVisible: boolean;
    onOkClick: (e?: MouseEvent<HTMLButtonElement>) => void | boolean;
    isCancelButtonVisible: boolean;
    onCancelClick: (e?: MouseEvent<HTMLButtonElement>) => void;
    isCloseButtonVisible: boolean;
    onCloseClick: (e?: MouseEvent<HTMLDivElement>) => void;
}
export interface IToastMessage {
    type?: "success" | "error" | "warnning" | "info";
    align?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    title?: string;
    message?: string;
    duration?: number;
}
export interface MessageClicentProps {
    showMessage: ({ type, title, message, okCaption, cancelCaption, isOkButtonVisible, onOkClick, isCancelButtonVisible, onCancelClick, isCloseButtonVisible, onCloseClick, footerStart, }: MessageShowProps) => Promise<boolean>;
    showToastMessage: ({ type, align, title, message, duration, }: IToastMessage) => void;
}
