import { css } from "@emotion/react";

interface backdropStyleProps {
  show: boolean;
  styles?: React.CSSProperties;
}

export const BACK_DROP_STYLE = ({ show = false, styles }: backdropStyleProps) =>
  css({
    width: "100dvw",
    height: "100dvh",
    overflow: "hidden",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(3px)",
    opacity: show ? 1 : 0,
    position: "absolute",
    left: 0,
    top: 0,
    transitionDuration: "300ms",
    transitionProperty: "opacity",
    zIndex: 9998,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...styles,
  });
