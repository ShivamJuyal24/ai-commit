import Groq from "groq-sdk";

export async function generateCommitMessage(prompt: string): Promise<string> {
    try {
        const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
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