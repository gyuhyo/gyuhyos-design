import { css } from "@emotion/react";

interface sideSettingSliderContainerProps {
  opened: boolean;
  bgColor?: string;
}

export const sideSettingSliderContainerStyle = ({
  opened,
  bgColor = "#fff",
}: sideSettingSliderContainerProps) =>
  css({
    position: "absolute",
    zIndex: 9999,
    width: "280px",
    height: "100dvh",
    top: 0,
    right: opened ? "0px" : "-280px",
    transition: "right 300ms ease-in-out",
    background: "rgb(var(--background-color))",
  });
