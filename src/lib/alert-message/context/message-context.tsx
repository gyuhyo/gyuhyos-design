/** @jsxImportSource @emotion/react */
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  MessageClicentProps,
  MessageShowProps,
} from "../types/message-context-props";
import AlertMessage from "..";
import { useGyudAccess } from "../../access-context";

const MessageContext = createContext<MessageClicentProps | undefined>(
  undefined
);

export const MessageProvider = React.memo(
  ({ children }: { children: ReactNode }) => {
    const isAccess = useGyudAccess();
    const [messages, setMessages] = useState<MessageShowProps[]>([]);

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

    if (isAccess && !isAccess.result) {
      throw new Error("You do not have permission to use package 'gyud'.");
    }

    return (
      <MessageContext.Provider value={{ showMessage }}>
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
          />
        ))}
      </MessageContext.Provider>
    );
  }
);

export const useMessage = (): MessageClicentProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("message must be used within a MessageProvider");
  }
  return context;
};
