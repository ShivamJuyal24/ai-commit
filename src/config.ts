import fs from "fs";
import path from "path";
import os from "os";
import { input } from "@inquirer/prompts";

const CONFIG_DIR = path.join(os.homedir(), ".ai-commit");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export function getConfig(): { openRouterApiKey: string } {
    if (fs.existsSync(CONFIG_FILE)) {
        const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
        return JSON.parse(raw);
    }
    return { openRouterApiKey: "" };
}

export function saveConfig(config: { openRouterApiKey: string }) {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export async function ensureApiKey(): Promise<string> {
    const config = getConfig();

    if (config.openRouterApiKey) {
        return config.openRouterApiKey;
    }

    console.log("\nNo OpenRouter API key found.");
    console.log("Get your free key at: https://openrouter.ai\n");

    const key = await input({ message: "Enter your OpenRouter API key:" });

    saveConfig({ openRouterApiKey: key });
    console.log("\n✔ Key saved. You will not be asked again.\n");

    return key;
}