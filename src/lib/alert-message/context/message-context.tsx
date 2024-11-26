/** @jsxImportSource @emotion/react */
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  MessageClicentProps,
  MessageShowProps,
} from "../types/message-context-props";
import AlertMessage from "..";

const MessageContext = createContext<MessageClicentProps | undefined>(
  undefined
);

export const MessageProvider = React.memo(
  ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<MessageShowProps[]>([]);

    const showMessage = (props: MessageShowProps) => {
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
          onOkClick: (e) => props.onOkClick && props.onOkClick(e),
          isCancelButtonVisible: props.isCancelButtonVisible ?? true,
          onCancelClick: (e) => props.onCancelClick && props.onCancelClick,
          isCloseButtonVisible: props.isCloseButtonVisible ?? true,
          onCloseClick: (e) => props.onCloseClick && props.onCloseClick,
          footerStart: props.footerStart ?? undefined,
        },
      ]);
    };

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
