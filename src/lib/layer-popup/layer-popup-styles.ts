import { css } from "@emotion/react";

export interface LayerPopupStyleProps {
  width?: number;
  height?: number;
}

export const layerPopupStyles = (props: LayerPopupStyleProps) =>
  css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,

    "[data-name='layer-popup-container']": {
      background: "rgb(var(--background-color))",
      border: "1px solid var(--border-color)",
      borderRadius: "7px",
      boxShadow: "1px 1px 11px #00000050",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    "[data-name='layer-popup-header']": {
      flex: "none",
      borderRadius: "7px 7px 0px 0px",
      background: "var(--dt-header-color)",
      lineHeight: "30px",
      borderBottom: "1px solid var(--border-color)",
      padding: "0px 7px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      "& > p": {
        flex: "1 1 0%",
        cursor: "move",
        width: "100%",
        height: "30px",
        flexGrow: 1,
      },
      "& > [data-name='layer-popup-header-buttons']": {
        flex: "none",
        cursor: "auto",
        "& i": {
          color: "#5a5a5a",
          fontSize: "16px",
          lineHeight: "30px",
          cursor: "pointer",
          "&:hover": {
            color: "#000",
          },
          "&:not(:first-of-type)": {
            marginLeft: "12px",
          },
        },
      },
    },

    "[data-name='layer-popup-body']": {
      flex: "1 1 0%",
      padding: "7px",
      overflowY: "auto",
      overflowX: "hidden",

      "&::-webkit-scrollbar": {
        width: "10px !important",
        height: "10px !important",
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c7c7c7 !important",
        backgroundClip: "padding-box !important",
        border: "2px solid transparent !important",
        borderRadius: "20px !important",
      },

      "&::-webkit-scrollbar-track": {
        background: "#fff",
      },
    },

    "[data-name='layer-popup-footer']": {
      flex: "none",
      borderTop: "1px solid var(--border-color)",
      padding: "0px 7px",
    },
  });
