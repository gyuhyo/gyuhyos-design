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
  onOkClick: (e?: any) => void | boolean;
  okCaption: string;
  closeAlert: () => void;
  isCancelButtonVisible: boolean;
  onCancelClick: (e?: React.MouseEvent<HTMLButtonElement>) => void | boolean;
  cancelCaption: string;
  value: any;
  input: boolean;
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
    value,
    input,
  }) => {
    return (
      <div css={alertMessageFooter} className="alert-message-footer">
        <div className="alert-message-footer-left">{footerStart}</div>
        <div
          css={css({
            display: "flex",
            flexDirection: "row",
            columnGap: 7,
          })}
          className="alert-message-footer-right"
        >
          {isOkButtonVisible && (
            <Button
              bgColor="#1f619d"
              border={true}
              borderColor="#1f619d"
              color="#fff"
              onClick={(e) => {
                if (onOkClick) {
                  const next = onOkClick(value);
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
