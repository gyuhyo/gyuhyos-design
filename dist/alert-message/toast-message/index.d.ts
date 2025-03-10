import React from "react";
import "../message.styles.css";
export interface IToastMessageComponent {
    id: string;
    length: number;
    type: "success" | "error" | "warnning" | "info";
    align: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    title: string;
    message: string;
    duration: number;
    startAt: number;
    endAt: number;
    removeToastMessage: (alertId: string) => void;
}
declare const ToastMessage: React.FC<IToastMessageComponent>;
export default ToastMessage;
