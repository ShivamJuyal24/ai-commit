export function buildPrompt(diff: string): string {
    return `
You are an expert developer. Analyze this git diff and generate 
a commit message following Conventional Commits format.

Rules:
- First line: type(scope): short description (max 70 chars)
- Add maximum 3 bullet points for the most important changes only
- If there are many changes, summarize them, don't list all of them
- Be specific. Avoid generic messages like "fix bug" or "update code"

Git diff:
${diff}

Return ONLY the commit message. No explanation. No markdown fences.
    `.trim();
}