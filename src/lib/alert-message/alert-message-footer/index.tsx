/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Button from "../../button";

const alertMessageFooter = css({
  padding: 12,
  display: "flex",
  flexDirection: "row",
  columnGap: 22,
  justifyContent: "space-between",
  alignItems: "center",
});

type AlertMessageFooterProps = {
  footerStart: React.ReactNode;
  isOkButtonVisible: boolean;
  onOkClick: (e?: React.MouseEvent<HTMLButtonElement>) => void | boolean;
  okCaption: string;
  closeAlert: () => void;
  isCancelButtonVisible: boolean;
  onCancelClick: (e?: React.MouseEvent<HTMLButtonElement>) => void | boolean;
  cancelCaption: string;
};

const AlertMessageFooter: React.FC<AlertMessageFooterProps> = React.memo(
  ({
    footerStart,
    isOkButtonVisible,
    onOkClick,
    okCaption,
    closeAlert,
    isCancelButtonVisible,
    onCancelClick,
    cancelCaption,
  }) => {
    return (
      <div css={alertMessageFooter}>
        <div>{footerStart}</div>
        <div
          css={css({
            display: "flex",
            flexDirection: "row",
            columnGap: 7,
          })}
        >
          {isOkButtonVisible && (
            <Button
              bgColor="#1f619d"
              color="#fff"
              onClick={(e) => {
                if (onOkClick) {
                  const next = onOkClick();
                  if (typeof next === "boolean" && !next) return;
                }
                closeAlert();
              }}
            >
              {okCaption}
            </Button>
          )}
          {isCancelButtonVisible && (
            <Button
              border={true}
              onClick={(e) => {
                if (onCancelClick) {
                  onCancelClick(e);
                }
                closeAlert();
              }}
            >
              {cancelCaption}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export default AlertMessageFooter;
