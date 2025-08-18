import newStyled from "@emotion/styled";
import React from "react";
import { useStreamingPost } from "./useStreamingPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MesChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ChatBotPositionedContainer>
      <ChatBotContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ChatBotContainer>
      <ChatBotFloatButton setIsOpen={setIsOpen} isOpen={isOpen} />
    </ChatBotPositionedContainer>
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
  const { data, streamText, isLoading, error, fetchStream, clearData } =
    useStreamingPost();
  const [messages, setMessages] = React.useState<
    {
      role: "user" | "assistant";
      event: string;
      content: string;
    }[]
  >([]);
  const [userMessage, setUserMessage] = React.useState<string>(
    `주조 생산 메뉴를 열고 조회 후 profDate: 2025-08-18, profCount: 100, profNgCount: 5 데이터 추가해줘.`
  );

  const onSendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", event: "message", content: userMessage },
    ]);
    fetchStream({
      url: "http://localhost:8000/api/stream",
      body: { query: userMessage },
    });
  };

  React.useEffect(() => {
    if (data.length === 0) return;

    const lastEvent = data[data.length - 1].event;

    if (lastEvent === "message") {
      setMessages((prev) => {
        const newContent =
          prev[prev.length - 1].role === "assistant" && "message"
            ? prev[prev.length - 1].content + data[data.length - 1].data
            : data[data.length - 1].data;

        return [
          ...(prev[prev.length - 1].role === "assistant" &&
          prev[prev.length - 1].event === "message"
            ? prev.slice(0, -1)
            : prev),
          {
            role: "assistant",
            event: lastEvent,
            content: newContent,
          },
        ];
      });
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          event: lastEvent,
          content: data[data.length - 1].data,
        },
      ]);
    }
  }, [streamText]);

  return (
    <ChatBotContainerBox
      isOpen={isOpen}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
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
          if (message.event === "message") {
            if (message.role === "user") {
              return (
                <ChatBotUserBubble key={index}>
                  <p>{message.content}</p>
                </ChatBotUserBubble>
              );
            }
            return (
              <ChatBotAssistantBubble key={index}>
                <ReactMarkdown
                  key={index}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {message.content}
                </ReactMarkdown>
              </ChatBotAssistantBubble>
            );
          }
          return null;
        })}
      </ChatBotContainerContent>
      <ChatBotFooter>
        <ChatBotFooterInput
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
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

const ChatBotPositionedContainer = newStyled.div({
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 4,
});

const ChatBotContainerBox = newStyled.div(
  ({ isOpen }: { isOpen: boolean }) => ({
    scale: isOpen ? 1 : 0,
    opacity: isOpen ? 1 : 0,
    boxShadow: isOpen ? "2px 2px 10px 0 rgba(0, 0, 0, 0.5)" : "none",
    width: isOpen ? 450 : 0,
    height: isOpen ? 600 : 0,
    borderRadius: 5,
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
  })
);

const ChatBotContainerHeader = newStyled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "#f0f0f0",
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
  backgroundColor: "#e9e9e9",
  borderRadius: "5px 0px 5px 5px",
  boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.3)",
  padding: 10,
  alignSelf: "flex-end",
});

const ChatBotAssistantBubble = newStyled.div({
  borderRadius: 5,
  padding: 10,
  alignSelf: "flex-start",
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
      position: "relative",
      placeSelf: "end",
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
