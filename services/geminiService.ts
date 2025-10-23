
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptForScore = (score: number): string => {
    if (score >= 80) {
        return `Mi esposa parece estar muy contenta, con una puntuación de felicidad del ${score}%. Dame un consejo corto, divertido y original para mantener esta maravillosa racha. El tono debe ser de celebración.`;
    } else if (score >= 50) {
        return `La situación con mi esposa está en una zona neutral, con una puntuación de felicidad del ${score}%. Dame un consejo corto, proactivo y cariñoso para mejorar el día y sumar puntos. El tono debe ser optimista y útil.`;
    } else {
        return `Mi esposa parece no estar contenta, con una puntuación de felicidad del ${score}%. Dame un consejo corto, ingenioso y práctico para mejorar la situación urgentemente. El tono debe ser comprensivo y un poco humorístico, sin ser alarmista.`;
    }
}

export const getAdvice = async (score: number): Promise<string> => {
    try {
        const prompt = getPromptForScore(score);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching advice from Gemini:", error);
        return "Hubo un problema al contactar al sabio digital. Quizás el mejor consejo sea simplemente llevarle un chocolate.";
    }
};
