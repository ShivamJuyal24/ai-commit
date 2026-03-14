// child_process module is used to execute git commands in the terminal and get the output as a string
import {execSync} from "child_process";

export function getStagedDiff(): string{
    try{
        const diff = execSync("git diff --staged",{
            encoding: "utf-8",
        })
        return diff;
    }catch(error){
        console.error("Error getting staged diff:", error);
        process.exit(1);
    }
}