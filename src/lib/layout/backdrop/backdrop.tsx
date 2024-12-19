/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import * as React from "react";
import { BACK_DROP_STYLE } from "./backdrop.style";

interface BackdropProps {
  children: React.ReactNode;
  isShow: boolean;
  onClick?: (e: any) => void | undefined;
  styles?: React.CSSProperties;
  backdropStyles?: React.CSSProperties;
}

function Backdrop(props: BackdropProps) {
  React.useEffect(() => {
    const body = document.querySelector("body");
    if (props.isShow) {
      if (body) body.style.overflow = "hidden";
    } else {
      if (body) body.style.overflow = "";
    }

    return () => {
      if (body) body.style.overflow = "";
    };
  }, [props.isShow]);

  const onBackdropClick = (e: any) => {
    if (!props.onClick) return;

    props.onClick(e);
  };
  return (
    <div
      css={css({
        visibility: props.isShow ? "visible" : "hidden",
        transitionProperty: "visibility",
        transitionDuration: "200ms",
        display: "flex",
        ...props.styles,
      })}
      onClick={(e) => onBackdropClick(e)}
    >
      <div
        css={BACK_DROP_STYLE({
          show: props.isShow,
          styles: props.backdropStyles,
        })}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Backdrop;
