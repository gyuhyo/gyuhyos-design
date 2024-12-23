import { css } from "@emotion/react";

interface sideMenuContainerProps {
  opened: boolean;
  bgColor?: string;
}

export const sideMenuContainerStyle = ({
  opened,
  bgColor = `linear-gradient(217deg, rgb(1 11 25), rgba(255, 0, 0, 0) 100%),
  linear-gradient(127deg, rgb(85 109 124), rgba(0, 255, 0, 0) 100%),
  linear-gradient(336deg, rgb(54 68 105), rgba(0, 0, 255, 0) 100%)`,
}: sideMenuContainerProps) =>
  css({
    position: "sticky",
    flex: "none",
    width: opened ? "250px" : "55px",
    height: "100vh",
    top: 0,
    transition: "width 300ms ease-in-out",
    background: bgColor,
    color: "#fff",
    zIndex: 4,
  });
