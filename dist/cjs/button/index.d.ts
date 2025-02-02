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
    icon?: JSX.Element;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
