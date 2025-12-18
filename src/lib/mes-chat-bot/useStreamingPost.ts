// src/hooks/useStreamingPost.js
import { useState, useCallback, useEffect } from "react";
import { Chat, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY! });

export const useStreamingPost = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  // 'data'는 모든 구조화된 이벤트 로그를 저장합니다.
  const [data, setData] = useState<any[]>([]);
  // 'streamText'는 'message' 이벤트의 텍스트만 누적하여 타이핑 효과를 구현합니다.
  const [streamText, setStreamText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateNewChatSession = () => {
    const chat = ai.chats.create({
      model: "gemma-3-27b-it", // "gemini-2.5-flash", // || "gemma-3-27b-it",
      history: [],
    });
    setChatSession(chat);
  };

  useEffect(() => generateNewChatSession, []);

  const fetchStream = useCallback(
    async ({ message }: { message: string }) => {
      if (!chatSession) return;
      setData([]);
      setStreamText("");
      setIsLoading(true);
      setError(null);

      try {
        const result = await chatSession.sendMessageStream({
          message,
        });

        for await (const chunk of result) {
          if (!chunk.text) continue;
          setStreamText((prev) => prev + chunk.text);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Streaming failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [chatSession]
  );

  const clearData = useCallback(() => {
    setData([]);
    setStreamText("");
    generateNewChatSession();
  }, []);

  return { data, streamText, isLoading, error, fetchStream, clearData };
};
