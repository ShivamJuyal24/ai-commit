import fs from "fs";
import path from "path";
import os from "os";
import { input } from "@inquirer/prompts";

const CONFIG_DIR = path.join(os.homedir(), ".ai-commit");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export function getConfig(): { groqApiKey: string } {
    if (fs.existsSync(CONFIG_FILE)) {
        const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
        return JSON.parse(raw);
    }
    return { groqApiKey: "" };
}

export function saveConfig(config: { groqApiKey: string }) {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export async function ensureApiKey(): Promise<string> {
    const config = getConfig();

    if (config.groqApiKey) {
        return config.groqApiKey;
    }

    console.log("\nNo Groq API key found.");
    console.log("Get your free key at: https://console.groq.com\n");

    const key = await input({ message: "Enter your Groq API key here:" });

    saveConfig({ groqApiKey: key });
    console.log("\n✔ Key saved. You will not be asked again.\n");

    return key;
}