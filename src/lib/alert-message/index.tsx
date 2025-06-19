/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import * as React from "react";
import AlertMessageBody from "./alert-message-body";
import AlertMessageFooter from "./alert-message-footer";
import AlertMessageHeader from "./alert-message-header";
import { MessageContextTypes } from "./types/message-context-props";
import "./message.styles.css";

const backdrop = css({
  width: "100dvw",
  height: "100dvh",
  top: 0,
  left: 0,
  visibility: "visible",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgb(0, 0, 0, 0.5)",
  opacity: 0,
  backdropFilter: "blur(3px)",
  zIndex: 4,
  transition: "backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out",
});

const visibleAlert = css({
  opacity: 1,
  visibility: "visible",
  transition: "opacity 200ms ease-in-out",
});

const hiddenAlert = css({
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 200ms ease-in-out, visibility 0ms ease-in-out 200ms",
});

const AlertMessage: React.FC<MessageContextTypes> = (props) => {
  const {
    setIsShow,
    type,
    title,
    message,
    okCaption,
    cancelCaption,
    isOkButtonVisible,
    onOkClick,
    isCancelButtonVisible,
    onCancelClick,
    isCloseButtonVisible,
    onCloseClick,
    footerStart,
    input,
    inputOption,
  } = props;
  const [value, setValue] = React.useState<any>("");
  const [isShowState, setIsShowState] = React.useState(true);

  const closeAlert = () => {
    setIsShowState(false);

    const timer = setTimeout(() => {
      setIsShow(false);
    }, 500);

    return () => clearTimeout(timer);
  };

  React.useEffect(() => {
    if (typeof window === undefined) return;

    (document.activeElement! as HTMLElement).blur();

    const closeKeyDownPopup = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (onOkClick) {
          const next = onOkClick();
          if (typeof next === "boolean" && !next) return;
        }
        closeAlert();
      }
    };

    window.addEventListener("keydown", closeKeyDownPopup);

    return () => {
      window.removeEventListener("keydown", closeKeyDownPopup);
    };
  }, []);

  return (
    <div css={[backdrop, isShowState ? visibleAlert : hiddenAlert]}>
      <div
        className={`alertMessageWrapper ${
          isShowState ? undefined : "alertMessageWrapperClose"
        }`}
      >
        <AlertMessageHeader
          type={type!}
          title={title!}
          isCloseButtonVisible={isCloseButtonVisible}
          onCloseClick={onCloseClick}
          closeAlert={closeAlert}
        />
        <AlertMessageBody
          message={message}
          input={input}
          inputOption={inputOption}
          value={value}
          setValue={setValue}
        />
        <AlertMessageFooter
          footerStart={footerStart}
          isOkButtonVisible={isOkButtonVisible}
          onOkClick={onOkClick}
          okCaption={okCaption}
          closeAlert={closeAlert}
          isCancelButtonVisible={isCancelButtonVisible}
          onCancelClick={onCancelClick}
          cancelCaption={cancelCaption}
          value={value}
          input={input}
        />
      </div>
    </div>
  );
};

export default React.memo(AlertMessage);
