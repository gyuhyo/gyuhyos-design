import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { useMenuStore } from "../layout/stores/menu-store";
import { SideMenuItemsProps } from "../layout/types/side-menu-item-props";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const tools = [
  {
    type: "function" as const,
    name: "menu_control_tool",
    description:
      "사용자가 특정 메뉴를 열거나 닫아달라고 요청할 때 사용되는 툴입니다.",
    parameters: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["open", "close"] },
        menuName: { type: "string" },
      },
      required: ["type", "menuName"],
      additionalProperties: false,
    },
    strict: true,
  },
];

type OutputItem =
  | { type: "message"; id?: string; role?: string; content?: any[] }
  | {
      type: "function_call";
      id: string;
      call_id: string;
      name: string;
      arguments: string;
    }
  | { type: string; [k: string]: any };

type HistoryItem =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | { role: "assistant"; content: string };

export const useStreamingPost = () => {
  // ✅ data -> history (대화 기억)
  const [history, setHistory] = useState<HistoryItem[]>([
    // 원하면 시스템 규칙을 넣어 인사 반복도 줄일 수 있습니다.
    // { role: "system", content: "이미 인사한 적이 있다면 다시 인사하지 말고, 맥락을 이어서 답하세요." },
  ]);

  const historyRef = useRef<HistoryItem[]>(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const [streamText, setStreamText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const { menus, openMenu, closeMenu } = useMenuStore();

  const menuControlTool = ({
    type,
    menuName,
  }: {
    type: string;
    menuName: string;
  }) => {
    const allMenus: SideMenuItemsProps[] = menus.flatMap(
      (menu) => menu.children
    ) as SideMenuItemsProps[];

    const menu = allMenus
      .filter((f) => f)
      .find((menu) => menu.title === menuName);

    if (!menu) return `${menuName} 메뉴를 찾을 수 없습니다.`;

    if (type === "open") {
      openMenu(menu);
    } else if (type === "close") {
      closeMenu(menu);
    }
    return `${menuName} 메뉴를 성공적으로 ${type}했습니다.`;
  };

  const toolRegistry: Record<string, (args: any) => Promise<any> | any> = {
    menu_control_tool: async ({
      type,
      menuName,
    }: {
      type: string;
      menuName: string;
    }) => {
      return { result: menuControlTool({ type, menuName }) };
    },
  };

  const runOneStream = async ({
    input,
    optimisticText = true,
    onToolCallDetected,
  }: {
    input: any[];
    optimisticText?: boolean;
    onToolCallDetected?: () => void;
  }) => {
    const outputItems: OutputItem[] = [];
    const finalToolCalls: Record<number, OutputItem> = {};
    let textBuffer = "";
    let sawToolCall = false;

    const stream = await openai.responses.create({
      model: "gpt-4o-mini",
      input,
      tools,
      stream: true,
      store: true,
    });

    for await (const event of stream) {
      // 1) 텍스트 델타
      if (event.type === "response.output_text.delta") {
        const delta = event.delta as string;
        if (delta) {
          textBuffer += delta;

          // ✅ 일반 채팅은 스트리밍으로 보여줌
          // ✅ 단, 툴콜 감지된 이후엔 더 이상 1차 텍스트를 UI에 붙이지 않음
          if (optimisticText && !sawToolCall) {
            setStreamText((prev) => prev + delta);
          }
        }
        continue;
      }

      // 2) output item added (여기서 function_call 감지)
      if (event.type === "response.output_item.added") {
        const item = event.item as OutputItem;
        finalToolCalls[event.output_index] = item;

        if (item?.type === "function_call" && !sawToolCall) {
          sawToolCall = true;
          // ✅ 지금까지 출력된 1차 텍스트 롤백
          onToolCallDetected?.();
        }
        continue;
      }

      // 3) function_call arguments 누적
      if (event.type === "response.function_call_arguments.delta") {
        const index = event.output_index;
        const item = finalToolCalls[index];
        if (item && item.type === "function_call") {
          item.arguments = (item.arguments ?? "") + (event.delta ?? "");
        }
        continue;
      }

      // 4) output item done (최종 item 수집)
      if (event.type === "response.output_item.done") {
        outputItems.push(event.item as OutputItem);
        continue;
      }
    }

    return { outputItems, textBuffer, sawToolCall };
  };

  const fetchStream = useCallback(async ({ message }: { message: string }) => {
    setStreamText("");
    setIsLoading(true);
    setError(null);

    const baseHistory = historyRef.current;
    const userItem: HistoryItem = { role: "user", content: message };

    try {
      const input1: any[] = [...baseHistory, userItem];

      // ✅ 1차: 일반 채팅은 스트리밍이 보이도록 optimisticText=true
      // ✅ 툴콜 감지되면 setStreamText("")로 롤백
      const {
        outputItems,
        textBuffer: text1,
        sawToolCall,
      } = await runOneStream({
        input: input1,
        optimisticText: true,
        onToolCallDetected: () => {
          // 1차 인사/잡담 제거
          setStreamText("");
        },
      });

      const toolCalls = outputItems.filter(
        (it) => it.type === "function_call"
      ) as Extract<OutputItem, { type: "function_call" }>[];

      // ✅ 툴콜이 없으면: 이미 1차에서 스트리밍으로 보여줬으니 history만 저장
      if (!sawToolCall || toolCalls.length === 0) {
        const assistantItem: HistoryItem = {
          role: "assistant",
          content: text1,
        };
        setHistory((prev) => [...prev, userItem, assistantItem]);
        return;
      }

      // ✅ 툴콜이 있으면: 1차 텍스트는 롤백된 상태, 이제 2차로 최종 답변 스트리밍
      const input2: any[] = [...input1, ...outputItems];
      const toolSummaries: string[] = [];

      for (const call of toolCalls) {
        const handler = toolRegistry[call.name];

        let args: any = {};
        try {
          args = call.arguments ? JSON.parse(call.arguments) : {};
        } catch {
          args = {};
        }

        if (!handler) {
          input2.push({
            type: "function_call_output",
            call_id: call.call_id,
            output: JSON.stringify({ error: `Unknown tool: ${call.name}` }),
          });
          toolSummaries.push(`[tool:${call.name}] Unknown tool`);
          continue;
        }

        const result = await handler(args);

        input2.push({
          type: "function_call_output",
          call_id: call.call_id,
          output: JSON.stringify(result),
        });

        toolSummaries.push(
          `[tool:${call.name}] args=${JSON.stringify(
            args
          )} result=${JSON.stringify(result)}`
        );
      }

      // 2차 스트림 시작
      setStreamText("");

      const { textBuffer: text2 } = await runOneStream({
        input: input2,
        optimisticText: true,
      });

      const assistantItem: HistoryItem = {
        role: "assistant",
        content: toolSummaries.length
          ? `${toolSummaries.join("\n")}\n\n${text2}`
          : text2,
      };

      setHistory((prev) => [...prev, userItem, assistantItem]);
    } catch (err) {
      setError(err);
      console.error("Streaming failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setStreamText("");
    // ✅ 대화 기억까지 비우고 싶으면 history도 초기화
    setHistory([]);
  }, []);

  return { history, streamText, isLoading, error, fetchStream, clearData };
};
