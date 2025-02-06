/** @jsxImportSource @emotion/react */
import * as React from "react";
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    btnref?: React.RefObject<HTMLButtonElement>;
    bgColor?: string;
    color?: string;
    compact?: boolean;
    rounded?: boolean;
    border?: boolean;
    borderColor?: string;
    icon?: React.JSX.Element;
}
declare const Button: React.FC<ButtonProps>;
export interface MesButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    children: any;
    primary?: "default" | "green" | "red" | "blue" | undefined;
}
export declare const MesButton: (props: MesButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default Button;
