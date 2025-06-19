/** @jsxImportSource @emotion/react */
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  IToastMessage,
  MessageClicentProps,
  MessageShowProps,
} from "../types/message-context-props";
import AlertMessage from "..";
import { useGyudAccess } from "../../access-context";
import ToastMessage, { IToastMessageComponent } from "../toast-message";
import styled from "@emotion/styled";

const MessageContext = createContext<MessageClicentProps | undefined>(
  undefined
);

export const MessageProvider = React.memo(
  ({ children }: { children: ReactNode }) => {
    const isAccess = useGyudAccess();
    const [messages, setMessages] = useState<MessageShowProps[]>([]);
    const [toastMessages, setToastMessages] = useState<
      IToastMessageComponent[]
    >([]);

    const showMessage = (props: MessageShowProps): Promise<boolean> => {
      return new Promise((resolve) => {
        setMessages((prev) => [
          ...prev,
          {
            alertID: Date.now().toString(),
            type: props.type ?? "default",
            title: props.title ?? "메시지",
            message: props.message,
            okCaption: props.okCaption ?? "확인",
            cancelCaption: props.cancelCaption ?? "취소",
            isOkButtonVisible: props.isOkButtonVisible ?? true,
            input: props.input ?? false,
            inputOption: props.inputOption ?? {},
            onOkClick: (e) => {
              if (props.onOkClick) props.onOkClick(e);
              resolve(true); // 확인 버튼 클릭 시 Promise 해결
              removeMessage(Date.now().toString());
            },
            isCancelButtonVisible: props.isCancelButtonVisible ?? true,
            onCancelClick: (e) => {
              if (props.onCancelClick) props.onCancelClick(e);
              resolve(false); // 취소 버튼 클릭 시 Promise 해결
              removeMessage(Date.now().toString());
            },
            isCloseButtonVisible: props.isCloseButtonVisible ?? true,
            onCloseClick: (e) => {
              if (props.onCloseClick) props.onCloseClick(e);
              resolve(false); // 닫기 버튼 클릭 시 Promise 해결
              removeMessage(Date.now().toString());
            },
            footerStart: props.footerStart ?? undefined,
            duration: props.duration,
          },
        ]);
      });
    };

    const removeMessage = (alertID: string) => {
      setMessages((current) => current.filter((m) => m.alertID !== alertID));
    };

    const showToastMessage = (props: IToastMessage): void => {
      setToastMessages((prev) => {
        const align = props.align ?? "topRight";
        return [
          {
            id: Date.now().toString(),
            length: 1,
            type: props.type ?? "info",
            align: align,
            title: props.title ?? "",
            message: props.message ?? "",
            duration: props.duration ?? 3000,
            startAt: Date.now(),
            endAt: Date.now() + (props.duration ?? 3000),
            removeToastMessage: (alertId) => removeToastMessage(alertId),
          },
          ...prev.map((p) => ({
            ...p,
            length: p.length + 1,
          })),
        ];
      });
    };

    const removeToastMessage = (alertID: string) => {
      setToastMessages((current) => {
        const filtered = current.filter((m) => m.id !== alertID);
        return filtered.map((x) => ({ ...x, length: filtered.indexOf(x) + 1 }));
      });
    };

    if (isAccess && !isAccess.result) {
      throw new Error("You do not have permission to use package 'gyud'.");
    }

    return (
      <MessageContext.Provider value={{ showMessage, showToastMessage }}>
        {children}
        {messages.map((msg) => (
          <AlertMessage
            key={msg.alertID}
            setIsShow={(isVisible) => {
              if (!isVisible) {
                setMessages((current) =>
                  current.filter((m) => m.alertID !== msg.alertID)
                );
              }
            }}
            type={msg.type!}
            title={msg.title!}
            message={msg.message}
            okCaption={msg.okCaption!}
            cancelCaption={msg.cancelCaption!}
            isOkButtonVisible={msg.isOkButtonVisible!}
            onOkClick={msg.onOkClick!}
            isCancelButtonVisible={msg.isCancelButtonVisible!}
            onCancelClick={msg.onCancelClick!}
            isCloseButtonVisible={msg.isCancelButtonVisible!}
            onCloseClick={msg.onCloseClick!}
            footerStart={msg.footerStart}
            duration={msg.duration}
            input={msg.input!}
            inputOption={msg.inputOption!}
          />
        ))}
        {toastMessages &&
          toastMessages.map((msg) => (
            <ToastMessage
              key={msg.id}
              id={msg.id}
              length={msg.length}
              align={msg.align}
              title={msg.title}
              message={msg.message}
              type={msg.type}
              duration={msg.duration}
              startAt={msg.startAt}
              endAt={msg.endAt}
              removeToastMessage={removeToastMessage}
            />
          ))}
      </MessageContext.Provider>
    );
  }
);

const ToastMessageContainer = styled.div({
  display: "flex",
});

export const useMessage = (): MessageClicentProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("message must be used within a MessageProvider");
  }
  return context;
};
