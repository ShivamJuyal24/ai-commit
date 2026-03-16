import OpenAI from "openai";

export async function generateCommitMessage(prompt: string, apiKey: string): Promise<string> {
    try {
        const client = new OpenAI({
            apiKey,
            baseURL: "https://openrouter.ai/api/v1"
        });

        const response = await client.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
        });

        return response.choices[0].message.content || "";
    } catch (error: any) {
        if (error.status === 429) {
            console.error("Rate limit hit. Wait a minute and try again.");
        } else {
            console.error("AI generation failed:", error.message);
        }
        process.exit(1);
    }
}