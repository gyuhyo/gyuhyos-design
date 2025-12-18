import newStyled from "@emotion/styled";
import React from "react";
import { useStreamingPost } from "./useStreamingPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MesChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    setTimeout(() => {
      const width = document.querySelector(".tab-panel-container")?.clientWidth;
      const contents = document.querySelectorAll(".tab-panel-full-content");

      for (const content of contents) {
        (content as HTMLElement).style.width = `${width}px`;
        (content as HTMLElement).style.minWidth = `${width}px`;
        (content as HTMLElement).style.maxWidth = `${width}px`;
      }
    }, 300);
  }, [isOpen]);

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
  const { data, streamText, isLoading, error, fetchStream, clearData } =
    useStreamingPost();
  const [messages, setMessages] = React.useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);
  const [userMessage, setUserMessage] = React.useState<string>("");

  const onSendMessage = () => {
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    fetchStream({
      message: userMessage,
    });
    setUserMessage("");
  };

  React.useEffect(() => {
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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  strong: ({ node, ...props }) => (
                    <h3 style={{ margin: "10px 0 0 0" }}>
                      <strong {...props} />
                    </h3>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </ChatBotAssistantBubble>
          );
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

const ChatBotContainerBox = newStyled.div(
  ({ isOpen }: { isOpen: boolean }) => ({
    flex: "none",
    opacity: isOpen ? 1 : 0,
    boxShadow: isOpen ? "-5px 0px 12px 0 rgba(0, 0, 0, 0.2)" : "none",
    width: isOpen ? 450 : 0,
    height: "100%",
    borderRadius: 5,
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
    paddingBottom: 5,
    zIndex: 2,
  })
);

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
  backgroundColor: "#e9e9e9",
  borderRadius: "5px 0px 5px 5px",
  boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.3)",
  padding: 10,
  alignSelf: "flex-end",
  maxWidth: "-webkit-fill-available",
});

const ChatBotAssistantBubble = newStyled.div({
  borderRadius: 5,
  padding: 10,
  alignSelf: "flex-start",
  maxWidth: "-webkit-fill-available",
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
