import newStyled from "@emotion/styled";
import React, { useCallback, useRef } from "react";
import { useStreamingPost } from "./useStreamingPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

const MesChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <ChatBotContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ChatBotContainer>
      <ChatBotFloatButton setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default MesChatBot;

const ChatBotContainer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const chatBotPositionRef = React.useRef({
    startX: 0,
    startWidth: 0,
  });
  const resizerRef = React.useRef<HTMLDivElement>(null);
  const { history, streamText, isLoading, error, fetchStream, clearData } =
    useStreamingPost();
  const [messages, setMessages] = React.useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);
  const [userMessage, setUserMessage] = React.useState<string>("");
  const sendingRef = useRef(false);

  const onSendMessage = useCallback(async () => {
    if (sendingRef.current) return;

    const msg = userMessage.trim();
    if (!msg) return;

    sendingRef.current = true;
    try {
      // 전송 직전에 비우면, 중복 호출 시 잔여 글자만 전송되는 현상이 더 잘 생깁니다.
      // 그래서 msg를 로컬 변수로 잡아두고 전송 후 비우는 게 안전합니다.
      setMessages((prev) => [...prev, { role: "user", content: msg }]);
      fetchStream({
        message: msg,
      });
      setUserMessage("");
    } finally {
      sendingRef.current = false;
    }
  }, [userMessage, fetchStream]);

  React.useEffect(() => {
    if (!streamText) return;

    setMessages((prev) => [
      ...(prev[prev.length - 1]?.role === "assistant"
        ? prev.slice(0, -1)
        : prev),
      {
        role: "assistant",
        content: streamText,
      },
    ]);
  }, [streamText]);

  const onResizerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizerRef.current) return;
    resizerRef.current.setPointerCapture(e.pointerId);
    (
      resizerRef.current.closest(".chat-bot-container") as HTMLDivElement
    ).style.transition = "none";
    chatBotPositionRef.current = {
      startX: e.clientX,
      startWidth: (
        e.currentTarget.closest(".chat-bot-container") as HTMLDivElement
      ).offsetWidth,
    };
  };

  const onResizerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      !resizerRef.current ||
      !resizerRef.current.hasPointerCapture(e.pointerId)
    )
      return;

    const diffX = chatBotPositionRef.current.startX - e.clientX;
    const newWidth = chatBotPositionRef.current.startWidth + diffX;

    if (newWidth < 200 || newWidth > 1000) return;
    const container = resizerRef.current.closest(".chat-bot-container");

    if (container) {
      (container as HTMLDivElement).style.width = `${newWidth}px`;
    }
  };

  const onResizerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizerRef.current) return;
    resizerRef.current.releasePointerCapture(e.pointerId);
    (
      resizerRef.current.closest(".chat-bot-container") as HTMLDivElement
    ).style.transition = "all 0.3s ease";
  };

  return (
    <ChatBotContainerBox
      className="chat-bot-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s ease",
        opacity: isOpen ? 1 : 0,
        boxShadow: isOpen ? "-5px 0px 12px 0 rgba(0, 0, 0, 0.2)" : "none",
        width: isOpen ? 450 : 0,
      }}
    >
      <ChatBotContainerHeader>
        <p>ChatBot</p>
        <p>
          <ChatBotContainerCloseButton
            className="fa-solid fa-xmark"
            onClick={() => setIsOpen(false)}
          />
        </p>
      </ChatBotContainerHeader>
      <ChatBotContainerContent>
        {messages.map((message, index) => {
          if (message.role === "user") {
            return (
              <ChatBotUserBubble key={index}>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.content}
                </p>
              </ChatBotUserBubble>
            );
          }
          return (
            <ChatBotAssistantBubble key={index}>
              <MarkdownBody>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  // ✅ 가능하면 rehypeRaw 제거 권장
                  // rehypePlugins={[rehypeRaw]}
                  components={{
                    table: ({ children }) => (
                      <TableWrap>
                        <table>{children}</table>
                      </TableWrap>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </MarkdownBody>
            </ChatBotAssistantBubble>
          );
        })}
      </ChatBotContainerContent>
      <ChatBotFooter>
        <ChatBotFooterInput
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if ((e as any).isComposing || (e.nativeEvent as any).isComposing)
              return;

            // ✅ 일부 환경(특히 IME)에서 keyCode 229가 조합을 의미
            if ((e as any).keyCode === 229 || (e as any).which === 229) return;

            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
        />
        <ChatBotFooterButton onClick={onSendMessage}>
          <i className="fa-solid fa-paper-plane" />
        </ChatBotFooterButton>
      </ChatBotFooter>
      <ChatBotResizerBar
        ref={resizerRef}
        onPointerDown={onResizerPointerDown}
        onPointerMove={onResizerPointerMove}
        onPointerUp={onResizerPointerUp}
      />
    </ChatBotContainerBox>
  );
};

const ChatBotFloatButton = ({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}) => {
  return <ChatBotButton isOpen={isOpen} onClick={() => setIsOpen(true)} />;
};

const ChatBotContainerBox = newStyled.div({
  position: "relative",
  flex: "none",
  height: "100%",
  borderRadius: 5,
  backgroundColor: "#fff",
  paddingBottom: 5,
  zIndex: 2,
});

const ChatBotResizerBar = newStyled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: 3,
  height: "100%",
  cursor: "ew-resize",
  "&:hover": {
    backgroundColor: "rgb(122 174 241 / 40%)",
  },
});

const ChatBotContainerHeader = newStyled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 35,
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "#f0f0f0",
  padding: "0 10px",
});

const ChatBotContainerCloseButton = newStyled.i({
  cursor: "pointer",
  "&:hover": {
    color: "#f150a8",
  },
});

const ChatBotContainerContent = newStyled.div({
  flex: 1,
  width: "100%",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  overflow: "hidden auto",
});

const ChatBotUserBubble = newStyled.div({
  backgroundColor: "#bdffeb",
  borderRadius: "5px 0px 5px 5px",
  boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.3)",
  padding: 10,
  alignSelf: "flex-end",
  maxWidth: "-webkit-fill-available",
  "& * ": { userSelect: "text" },
});

const ChatBotAssistantBubble = newStyled.div({
  borderRadius: 10,
  padding: "0 10px",
  alignSelf: "flex-start",
  maxWidth: "-webkit-fill-available",
  backgroundColor: "#ebebeb",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "1px 1px 10px 0 rgba(0, 0, 0, 0.08)",
  "& * ": { userSelect: "text" },
});

const ChatBotFooter = newStyled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  borderTop: "1px solid #e0e0e0",
  backgroundColor: "#f0f0f0",
});

const ChatBotFooterInput = newStyled.textarea({
  width: "100%",
  height: "max-content",
  border: "1px solid #e0e0e0",
  borderRadius: 5,
  padding: 10,
  resize: "none",
});

const ChatBotFooterButton = newStyled.button({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
});

const ChatBotButton = newStyled.div(
  ({ isOpen }: { isOpen: boolean }) =>
    ({
      position: "absolute",
      bottom: 20,
      right: 20,
      opacity: isOpen ? 0 : 1,
      width: isOpen ? 0 : 50,
      height: isOpen ? 0 : 50,
      backgroundColor: "#fff",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: "2px 2px 10px 0 rgba(0, 0, 0, 0.5)",
      backgroundImage: "url(/1538298822.svg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f0f0f0",
        transform: "scale(1.1)",
      },
      "&::after": {
        content: "'AI'",
        position: "absolute",
        top: -3,
        right: -3,
        background: "linear-gradient(45deg, #db64de, #67d1f1)",
        borderRadius: 7,
        color: "#fff",
        padding: "0 7px",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
        boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.3)",
      },
    } as const)
);

const TableWrap = newStyled.div({
  overflowX: "auto",
  margin: "12px 0",
});

const MarkdownBody = newStyled.div({
  color: "rgba(20, 20, 20, 0.92)",
  fontSize: 14,
  lineHeight: 1.75,

  "& p": {
    margin: "8px 0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },

  "& h1, & h2, & h3": {
    margin: "14px 0 8px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  "& h1": { fontSize: 20 },
  "& h2": { fontSize: 17 },
  "& h3": { fontSize: 15 },

  "& ul, & ol": {
    margin: "10px 0",
    paddingLeft: 18,
  },
  "& li": { margin: "4px 0" },

  "& blockquote": {
    margin: "10px 0",
    padding: "10px 12px",
    borderLeft: "3px solid rgba(0,0,0,0.18)",
    background: "rgba(0,0,0,0.03)",
    borderRadius: 10,
    color: "rgba(0,0,0,0.75)",
  },

  "& a": {
    color: "#2b6fe8",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },

  "& :not(pre) > code": {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    padding: "0.15em 0.35em",
    borderRadius: 8,
    background: "rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.08)",
    fontSize: "0.92em",
  },

  "& pre": {
    margin: "12px 0",
    padding: 12,
    borderRadius: 12,
    background: "rgba(0,0,0,0.85)",
    overflowX: "auto",
  },
  "& pre code": {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 13,
  },

  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    margin: "12px 0",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
  },
  "& thead": {
    background: "rgba(0,0,0,0.04)",
  },
  "& th, & td": {
    padding: "10px 10px",
    borderTop: "1px solid rgba(0,0,0,0.10)",
    textAlign: "left",
    verticalAlign: "top",
    fontSize: 13,
  },
  "& th": {
    fontWeight: 700,
  },
});
