/** @jsxImportSource @emotion/react */
import * as React from "react";
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    bgColor?: string;
    color?: string;
    compact?: boolean;
    rounded?: boolean;
    border?: boolean;
    icon?: JSX.Element;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
