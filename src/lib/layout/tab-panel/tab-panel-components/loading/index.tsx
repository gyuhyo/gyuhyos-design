/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import * as React from "react";

const rotate = keyframes`
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
`;

export const TabPanelLoading: React.FC = React.memo(() => {
  return (
    <div
      css={css({
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        visibility: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(0, 0, 0, 0.5)",
        opacity: 0,
        backdropFilter: "blur(3px)",
        zIndex: 3,
        transition:
          "backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out",
      })}
    >
      <div
        css={css({
          width: 200,
          height: 80,
          background: "#fff",
          borderRadius: 7,
          position: "relative",
          display: "flex",
          alignItems: "center",
        })}
      >
        <svg viewBox="-200 0 500 5" width={100} height={80}>
          <circle
            cx="0"
            cy="0"
            r="100"
            fill="none"
            stroke="#a0a0a0"
            strokeWidth="20"
            strokeDasharray="50 10"
            css={css({
              animation: `${rotate} 1000ms linear infinite`,
            })}
          ></circle>
        </svg>
        <span>처리중...</span>
      </div>
    </div>
  );
});
