/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";

const alertMessageBody = css({
  flex: "1 1 0%",
  padding: 12,
  borderBottom: "1px solid #ccc",
});

type AlertMessageBodyProps = {
  message: React.ReactNode;
};
const AlertMessageBody: React.FC<AlertMessageBodyProps> = React.memo(
  ({ message }) => {
    return (
      <div css={alertMessageBody}>
        {typeof message === "string" ? <p>{message}</p> : message}
      </div>
    );
  }
);

export default AlertMessageBody;
