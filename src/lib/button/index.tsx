/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  btnref?: React.RefObject<HTMLButtonElement>;
  bgColor?: string;
  color?: string;
  compact?: boolean;
  rounded?: boolean;
  border?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    children,
    compact = false,
    rounded = true,
    border = false,
    bgColor = "#dadada",
    color = "#000",
    ...anotherProps
  } = props;
  return (
    <button
      ref={props.btnref}
      css={css({
        padding: compact ? "0px 7px" : "5px 20px",
        borderRadius: rounded ? 2 : 0,
        background: `linear-gradient(180deg, ${bgColor}95 0%, ${bgColor} 50%, ${bgColor}95 100%)`,
        border: border ? "1px solid #ddd" : undefined,
        color: color,
        "&:hover": {
          cursor: "pointer",
          background: `linear-gradient(180deg, ${bgColor}${(95 * 0.9).toFixed(
            0
          )} 0%, ${bgColor}${(100 * 0.9).toFixed(0)} 50%, ${bgColor}${(
            95 * 0.9
          ).toFixed(0)} 100%)`,
        },
        "&:active": {
          filter: "contrast(0.7)",
        },
        display: "flex",
        flexDirection: "row",
        columnGap: 3,
        justifyContent: "center",
        alignItems: "center",
      })}
      {...anotherProps}
    >
      {props.icon && `${props.icon} `}
      {props.children}
    </button>
  );
};

export default Button;
