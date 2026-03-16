import Groq from "groq-sdk";

export async function generateCommitMessage(prompt: string, apiKey: string): Promise<string> {
    try {
        const client = new Groq({ apiKey });
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content;

        if (!content || content.trim() === "") {
            console.error("AI returned an empty response. Try running again.");
            process.exit(1);
        }

        return content;
    } catch (error: any) {
        if (error.status === 429) {
            console.error("Rate limit hit. Wait a minute and try again.");
        } else {
            console.error("AI generation failed:", error.message);
        }
        process.exit(1);
    }
}