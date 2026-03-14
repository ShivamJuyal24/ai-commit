export function buildPrompt(diff: string): string {
    return `
You are an expert developer. Analyze this git diff and generate 
a commit message following Conventional Commits format.

Rules:
- First line: type(scope): short description (max 70 chars)
- Add bullet points for key changes underneath
- Be specific. Avoid generic messages like "fix bug" or "update code"

Git diff:
${diff}

Return ONLY the commit message. No explanation. No markdown fences.
    `.trim();
}