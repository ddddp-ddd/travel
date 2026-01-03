
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 获取即时初始化的 AI 客户端，防止环境变量在模块加载时尚未就绪。
 */
const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not available in environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateZGenCaption = async (sceneType: string, emotion: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `作为一个名为Momo的Z世代旅行向导，为一张描述${sceneType}、情绪为${emotion}的照片写一句感性文案。
      要求：
      1. 绝对禁止提及任何“路名”、“街道号”或“门牌号”。
      2. 严禁出现“***”等任何形式的星号占位符，地名必须完整输出。
      3. 强调空间感和个人情绪，使用颜文字（如 (。•ᴗ-)✧）。
      4. 长度在20字以内。`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.9,
      }
    });
    return response.text?.trim().replace(/^"|"$/g, '') || "世界喧嚣，我只想在这片绿意里坐上一整天。(。•ᴗ-)✧";
  } catch (error) {
    console.error("Gemini Caption Error:", error);
    return "生活在别处，我们在风里见。";
  }
};

export const getSmartRecommendation = async (userInput: string) => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用户需求: "${userInput}"。
      推荐一个真实的中国小众秘境。
      要求：
      1. 必须是真实存在的地点，如：景德镇三宝村、威海那香海、杭州浴鹄湾。
      2. 绝对禁止包含“路名”、“街道”等具体行政地址，请使用描述性地理位置。
      3. 严禁使用“***”屏蔽任何字符。
      4. 返回JSON格式。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spotName: { type: Type.STRING, description: "真实地名" },
            reason: { type: Type.STRING, description: "推荐理由（无具体路名）" },
            vibeTag: { type: Type.STRING, description: "氛围标签" },
          },
          required: ["spotName", "reason", "vibeTag"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return { spotName: "西湖深处", reason: "因为那里最安静，适合思考。", vibeTag: "治愈系" };
  }
};

export const getAssistantChatStream = async (history: { role: string, parts: string }[]) => {
  const ai = getClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 1000 },
      systemInstruction: `你是一个名为'Momo'的AI秘境向导。
      
      核心准则：
      1. 绝对禁止在回复中提供具体的“路名”、“街道号”或“门牌号”。
      2. 绝对禁止使用“***”屏蔽地名。地标名称必须完整且真实。
      3. 采用文学性的空间描述，例如：“在老城墙东北角的绿荫里”、“靠近湖泊西岸的静谧栈道尽头”。
      4. 语气要松弛、有审美、懂生活，常用颜文字，如 (。•ᴗ-)✧, (´▽\`ʃ♡ƪ)。
      5. 你的推荐必须基于真实世界的地理位置，如果使用搜索，请引用真实的背景信息。`,
    },
    history: history.slice(0, -1).map(item => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.parts }]
    }))
  });

  const lastMessage = history[history.length - 1].parts;
  return await chat.sendMessageStream({ message: lastMessage });
};

export const recommendAlbumTemplate = async (userPrompt: string) => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `照片描述: "${userPrompt}"。推荐照片墙模版（film, journal, minimal）。禁止“***”占位符。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            template: { type: Type.STRING, enum: ['film', 'journal', 'minimal'] },
            caption: { type: Type.STRING },
            stickers: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["template", "caption", "stickers"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { template: 'minimal', caption: "时间停止了。", stickers: ['✨'] };
  }
};
