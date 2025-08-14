// src/hooks/useStreamingPost.js
import { useState, useCallback } from "react";

export const useStreamingPost = () => {
  const [streamEffect, setStreamEffect] = useState("");
  const [data, setData] = useState<
    {
      event: string;
      data: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 스트림 요청을 시작하는 함수
   * @param {string} url - 요청을 보낼 엔드포인트 URL
   * @param {object} body - POST 요청의 body 객체
   */
  const fetchStream = useCallback(
    async ({ url, body }: { url: string; body: any }) => {
      // 요청 시작 시 로딩 상태로 변경. 이전 데이터는 삭제.
      setStreamEffect("");
      setData([]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = (await reader?.read()) || {
            done: true,
            value: new Uint8Array(),
          };
          if (done) break;

          const chunk = decoder.decode(value);
          const clean = chunk
            .split("\n") // 줄 단위 분리
            .filter((line) => line.startsWith("data:")) // data:로 시작하는 줄만
            .map((line) => line.slice(5).trim()) // "data: " 제거
            .join("");

          if (clean) {
            // 이전 데이터(prevData)에 새로운 조각(chunk)을 계속 이어붙임
            const jsonData = JSON.parse(clean);

            setStreamEffect(clean);

            setData((prev) => [...prev, jsonData]);
          }
        }
      } catch (err) {
        setError(err as any);
        console.error("Streaming failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  ); // useCallback으로 감싸 불필요한 재성성 방지

  /**
   * 저장된 데이터를 초기화하는 함수
   */
  const clearData = useCallback(() => {
    setData([]);
    setStreamEffect("");
  }, []);

  // 컴포넌트에서 사용할 상태와 함수들을 반환
  return { data, streamEffect, isLoading, error, fetchStream, clearData };
};
