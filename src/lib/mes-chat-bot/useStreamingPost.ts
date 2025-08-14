// src/hooks/useStreamingPost.js
import { useState, useCallback } from "react";

// 이전에 만들었던 "스마트 분류기" 함수를 훅 안으로 가져오거나 별도 유틸리티로 분리합니다.
const processJsonPayload = (parsedJson: any) => {
  // 'action' 이벤트일 경우에만 특별 처리를 합니다.
  if (parsedJson.event === "action" && parsedJson.data?.commands) {
    parsedJson.data.commands.forEach((command: any) => {
      // payload가 유효한 JSON 문자열일 경우에만 객체로 변환합니다.
      if (command.payload && typeof command.payload === "string") {
        try {
          command.payload = JSON.parse(command.payload);
        } catch (e) {
          // 파싱 실패 시 원본 문자열을 그대로 둡니다.
        }
      }
    });
  }
  return parsedJson;
};

export const useStreamingPost = () => {
  // 'data'는 모든 구조화된 이벤트 로그를 저장합니다.
  const [data, setData] = useState<any[]>([]);
  // 'streamText'는 'message' 이벤트의 텍스트만 누적하여 타이핑 효과를 구현합니다.
  const [streamText, setStreamText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStream = useCallback(
    async ({ url, body }: { url: string; body: any }) => {
      setData([]);
      setStreamText("");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Failed to get ReadableStream reader.");
        }

        const decoder = new TextDecoder("utf-8");
        let buffer = ""; // ✅ 1. 청크 데이터가 중간에 잘릴 경우를 대비한 버퍼

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // 버퍼에 새로운 청크를 추가하고, 줄바꿈 기준으로 라인들을 분리합니다.
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");

          // ✅ 2. 마지막 라인은 데이터가 잘렸을 수 있으므로 다음 청크를 위해 버퍼에 남겨둡니다.
          buffer = lines.pop() || "";

          for (const line of lines) {
            // ✅ 3. 각 라인을 독립적으로 처리합니다. (join X)
            if (line.startsWith("data:")) {
              const jsonString = line.slice(5).trim();
              if (jsonString) {
                try {
                  let parsedJson = JSON.parse(jsonString);

                  // ✅ 4. "스마트 분류기" 로직으로 이중 포장된 JSON을 처리합니다.
                  parsedJson = processJsonPayload(parsedJson);

                  // 전체 이벤트 로그에 추가
                  setData((prev) => [...prev, parsedJson]);

                  // ✅ 5. 'message' 이벤트의 텍스트만 따로 누적합니다.
                  if (
                    parsedJson.event === "message" &&
                    typeof parsedJson.data === "string"
                  ) {
                    setStreamText((prev) => prev + parsedJson.data);
                  }
                } catch (err) {
                  console.warn("Invalid JSON chunk skipped:", jsonString);
                }
              }
            }
          }
        }
      } catch (err) {
        setError(err as Error);
        console.error("Streaming failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearData = useCallback(() => {
    setData([]);
    setStreamText("");
  }, []);

  return { data, streamText, isLoading, error, fetchStream, clearData };
};
