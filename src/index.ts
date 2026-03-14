#!/usr/bin/env node

import path from "path";
import dotenv from "dotenv";

// Load .env from the tool's own directory, not the current folder
dotenv.config({ path: path.join(__dirname, "../.env") });

import {getStagedDiff} from "./git/getStagedDiff"
import {buildPrompt} from "./prompt/buildPrompt"
import {generateCommitMessage} from "./ai/generateCommitMessage"
import {execSync} from "child_process"
import {confirm} from "@inquirer/prompts"
async function main(){
    console.log("Reading staged changes...");
    const diff = getStagedDiff();
    
    if(!diff){
        console.log("No staged changes found.");
        return;
    }
    console.log("Generating commit message...");
    const prompt = buildPrompt(diff);
    const commitMessage = await generateCommitMessage(prompt);
    console.log("\n Suggested commit message\n");
    console.log(commitMessage);

    const isConfirmed = await confirm({ message:"Do you want to use this commit message?"});
    if(isConfirmed){
        try{
        execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
        console.log("\nCommitted successfully.");
        }catch(error){
            console.error("Error committing changes:", error);
        }
    }else{
        console.log("Commit aborted. You can edit the message and commit manually.");
    }
    
}

main();