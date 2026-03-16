#!/usr/bin/env node
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env"), quiet: true });

import { getStagedDiff } from "./git/getStagedDiff";
import { buildPrompt } from "./prompt/buildPrompt";
import { generateCommitMessage } from "./ai/generateCommitMessage";
import { ensureApiKey } from "./config";
import { confirm } from "@inquirer/prompts";
import { execSync } from "child_process";
import ora from "ora";

async function main() {
    const apiKey = await ensureApiKey();

    const diffSpinner = ora("Reading staged changes...").start();
    const diff = getStagedDiff();

    if (!diff) {
        diffSpinner.fail("No staged changes found. Stage your files first.");
        return;
    }

    diffSpinner.succeed("Staged changes found.");

    const aiSpinner = ora("Generating commit message...").start();
    const prompt = buildPrompt(diff);
    const message = await generateCommitMessage(prompt, apiKey);
    aiSpinner.succeed("Done.\n");

    console.log("Suggested commit message:\n");
    console.log(message);
    console.log();

    const ok = await confirm({ message: "Commit with this message?" });

    if (ok) {
        execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`);
        console.log("\n✔ Committed successfully.");
    } else {
        console.log("\nCommit cancelled.");
    }
}

main();