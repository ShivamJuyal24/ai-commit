import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCommitMessage(prompt: string): Promise<string>{
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
        model:"gemini-2.0-flash"
    });
    const response = await model.generateContent(prompt);
    return response.response.text().trim();

}