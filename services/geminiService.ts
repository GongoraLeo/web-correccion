import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle } from '../types';

export const fetchLanguageNews = async (): Promise<NewsArticle[]> => {
  try {
    // FIX: Removed explicit API_KEY check to align with coding guidelines, which state to assume the key is pre-configured and valid.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Generate a list of 4 recent and interesting news headlines or facts related to linguistics, literature, or the Spanish language. 
      For each one, provide a brief one-sentence summary and the original source URL if available. If no source URL is found, provide an empty string.
      The output must be in Spanish.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'The headline of the news or fact.',
              },
              summary: {
                type: Type.STRING,
                description: 'A brief, one-sentence summary of the news.',
              },
              url: {
                type: Type.STRING,
                description: 'The URL to the original source article. Can be an empty string if not applicable.'
              }
            },
            required: ["title", "summary", "url"],
          },
        },
      },
    });

    const jsonString = response.text;
    const newsData: NewsArticle[] = JSON.parse(jsonString);
    return newsData;

  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    // Return mock data or throw an error to be handled by the UI
    // FIX: Aligned error message with guidelines to be generic and not mention API keys.
    throw new Error("Failed to fetch news. Please try again later.");
  }
};