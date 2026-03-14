import "dotenv/config";

import {getStagedDiff} from "./git/getStagedDiff"
import {buildPrompt} from "./prompt/buildPrompt"
import {generateCommitMessage} from "./ai/generateCommitMessage"
import { log } from "console";
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
    
}

main();