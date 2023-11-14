import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to solve my problem. Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.`;

type MyBot = Omit<Bot, "session">;

export const MY_BOTS: MyBot[] = [
  {
    id: "3",
    avatar: "1f5a5-fe0f",
    name: "Trend Replication Q&A Bot",
    botHello:
      "Hello! How can I help you learn more about trend replication research and methodology today?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Trend Replication Expert"),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "trend_replication",
    hideContext: false,
  },
  {
    id: "4",
    avatar: "1f5a5-fe0f",
    name: "Return Stacking Q&A Bot",
    botHello:
      "Hello! How can I help you learn more about Return Stacking today?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Return Stacking Expert"),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "return_stacking",
    hideContext: false,
  },
];

export const createMyBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  MY_BOTS.forEach((myBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(myBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
