/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI;

const MODEL_NAME = "gemini-2.5-flash"; 

const getAiInstance = (): GoogleGenAI => {
  if (!API_KEY) {
    throw new Error("API Key not configured. Please set process.env.API_KEY.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
};

interface ImagePart {
  inlineData: {
    mimeType: string;
    data: string;
  };
}

export const extractTextFromImage = async (image: ImagePart): Promise<string> => {
  if (!API_KEY) {
     throw new Error("API Key is not configured.");
  }

  const currentAi = getAiInstance();

  const textPart = {
    text: "Extract all text from the attached image. Return only the raw, extracted text without any formatting, commentary, or explanations.",
  };

  const contents: Content[] = [{ role: "user", parts: [image, textPart] }];

  try {
    const response: GenerateContentResponse = await currentAi.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        const googleError = error as any;
        if (googleError.message?.includes("API key not valid")) {
            throw new Error("Invalid API Key. Please check your environment variable.");
        }
         throw new Error(`Failed to get response from AI: ${googleError.message}`);
    }
    throw new Error("An unknown error occurred while contacting the AI service.");
  }
};
