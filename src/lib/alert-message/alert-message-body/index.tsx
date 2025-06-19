/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import newStyled from "@emotion/styled";
import * as React from "react";

const alertMessageBody = css({
  flex: "1 1 0%",
  padding: 12,
  borderBottom: "1px solid #ccc",
  alignContent: "center",
});

type AlertMessageBodyProps = {
  message: React.ReactNode;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  input: boolean;
  inputOption: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    React.AriaAttributes;
};
const AlertMessageBody: React.FC<AlertMessageBodyProps> = React.memo(
  ({ message, input, inputOption, value, setValue }) => {
    return (
      <div css={alertMessageBody}>
        {typeof message === "string" ? (
          <p css={css({ whiteSpace: "pre-wrap" })}>{message}</p>
        ) : (
          message
        )}
        {input && (
          <InputBox>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              {...inputOption}
            />
          </InputBox>
        )}
      </div>
    );
  }
);

const InputBox = newStyled.div({
  marginTop: 12,
});

const Input = newStyled.input({
  width: "100%",
  height: 30,
  maxWidth: 400,
  border: "1px solid #ddd",
  padding: "14px 7px",
  marginTop: 3,
});
export default AlertMessageBody;
