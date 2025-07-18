/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import { useGyudAccess } from "../access-context";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  btnref?: React.MutableRefObject<HTMLButtonElement>;
  bgColor?: string;
  color?: string;
  compact?: boolean;
  rounded?: boolean;
  border?: boolean;
  borderColor?: string;
  icon?: React.JSX.Element;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    children,
    compact = false,
    rounded = true,
    border = true,
    borderColor = "#cecece",
    bgColor = "#eeeeee",
    color,
    ...anotherProps
  } = props;
  const isAccess = useGyudAccess();

  if (isAccess && !isAccess.result) {
    throw new Error("You do not have permission to use package 'gyud'.");
  }

  return (
    <button
      ref={props.btnref}
      css={css({
        padding: compact ? "0px 7px" : "5px 20px",
        borderRadius: rounded ? 5 : 0,
        background: `linear-gradient(180deg, ${bgColor}90 0%, ${bgColor} 50%, ${bgColor}90 100%)`,
        border: border
          ? `1px solid ${
              bgColor !== "#eeeeee" && borderColor === "#cecece"
                ? bgColor
                : borderColor
            }`
          : undefined,
        boxShadow:
          "inset 1px 1px 3px #ffffff97, inset -0.5px -0.5px 1px #00000030",
        color: color ? `${color} !important` : "#000",
        "&:hover": {
          cursor: "pointer",
          background: `linear-gradient(180deg, ${bgColor}${(95 * 0.9).toFixed(
            0
          )} 0%, ${bgColor}${(100 * 0.9).toFixed(0)} 50%, ${bgColor}${(
            95 * 0.9
          ).toFixed(0)} 100%)`,
        },
        "&:active": {
          background: `linear-gradient(180deg, ${bgColor}90 0%, ${bgColor} 50%, ${bgColor}90 100%)`,
          boxShadow:
            "inset 1px 1px 3px #00000030, inset -0.5px -0.5px 1px #ffffff97",
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

export interface MesButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: any;
  primary?: "default" | "green" | "red" | "blue" | undefined;
}

export const MesButton = (props: MesButtonProps) => {
  const { children, ...anotherProps } = props;

  const primaryProps = () => {
    if (props.primary === undefined || props.primary === "default") {
      return null;
    }

    if (props.primary === "green") {
      return {
        bgColor: "#22cb5f",
        color: "#ffffff",
        borderColor: "#03cf00",
      };
    }

    if (props.primary === "red") {
      return {
        bgColor: "#df4873",
        borderColor: "#ff7070",
        color: "#ffffff",
      };
    }

    if (props.primary === "blue") {
      return {
        bgColor: "#1f619d",
        borderColor: "#396dff",
        color: "#ffffff",
      };
    }
  };

  return (
    <Button
      border={true}
      compact={true}
      css={css({
        padding: "3px 11px",
        "@media (min-width: 650px)": {
          padding: "5px 12px",
        },
      })}
      {...primaryProps()}
      {...anotherProps}
    >
      {children}
    </Button>
  );
};

export default Button;
