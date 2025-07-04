/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";

const alertMessageHeader = (type: string = "default") => {
  let borderImage =
    "linear-gradient(90deg, #0d6f9b20 0%, #0d6f9b 50%, #0d6f9b20 100%)";

  if (type === "error") {
    borderImage =
      "linear-gradient(90deg, #ff2c5a20 0%, #ff2c5a 50%, #ff2c5a20 100%)";
  }

  if (type === "warnning") {
    borderImage =
      "linear-gradient(90deg, #dc983620 0%, #dc9836 50%, #dc983620 100%)";
  }

  if (type === "success") {
    borderImage =
      "linear-gradient(90deg, #45bf2d20 0%, #45bf2d 50%, #45bf2d20 100%)";
  }

  return css({
    flex: "none",
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid transparent",
    borderImage: borderImage,
    borderImageSlice: 1,
    boxShadow: "0px 2px 11px #00000030",
  });
};

const alertMessageCloseButton = css({
  cursor: "pointer",
  "&::after": {
    content: '"\\2715"',
    color: "#f40077",
    fontWeight: "bold",
    padding: "4px 7px",
    textAlign: "center",
  },
  "&:hover::after": {
    background: "#fbdcdc",
    borderRadius: 7,
  },
});

type AlertMessageHeaderProps = {
  type: string;
  title: string;
  isCloseButtonVisible: boolean;
  onCloseClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  closeAlert: () => void;
};

const AlertMessageHeader: React.FC<AlertMessageHeaderProps> = React.memo(
  ({ type, title, isCloseButtonVisible, onCloseClick, closeAlert }) => {
    return (
      <div css={alertMessageHeader(type)} className="alert-message-header">
        <p css={css({ fontWeight: "bold" })} className="alert-message-title">
          {title}
        </p>
        {isCloseButtonVisible && (
          <div
            css={alertMessageCloseButton}
            onClick={(e) => {
              if (onCloseClick) {
                onCloseClick(e);
              }
              closeAlert();
            }}
          />
        )}
      </div>
    );
  }
);

export default AlertMessageHeader;
