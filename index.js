#!/usr/bin/env node

// Current beta version: 1.0.14-beta
// Current test version: 1.0.14-test

//#region Import
import { dirname } from "path"
import { fileURLToPath } from "url"
import yargs from "yargs";
import { reactWorker } from "./src/prompt/react-prompt.js"
import { expressWorker } from "./src/prompt/express-prompt.js";
import Message from "./src/message/message.js";
import { hideBin } from "yargs/helpers"

const argv = yargs(hideBin(process.argv)).argv
const { ErrorMessage } = Message()

//#endregion

/**
 * @name compileArguments - worker for arguments inputed by the user
 * 
 * 
 * @description usage: node . --framework --template --path --fileName --fileType
 * @description example: node . react plain src/components button ts
 * 
 * 
 * @var __filename - get the index.js directory path
 * @var __dirname - get the directory of the project
 * @var userArguments - get all arguments inputed by the user
 * @var framework - get framework argument 
 * @var template - get template argument  
 * @var path - get path argument  
 * @var fileName - get fileName argument  
 * @var fileType - get fileType argument
 * @returns null
 */
async function compileArguments() {


    // Get the current directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Get the input arguments
    const userArguments = argv._

    // Add to const value the specic arguments
    const framework = userArguments[0]
    const template = userArguments[1]
    const path = userArguments[2]
    const fileName = userArguments[3]
    const fileType = userArguments[4]


    if (framework === 'react')
        await reactWorker(__dirname, template, path, fileName, fileType)
    else if (framework === 'express')
        await expressWorker(__dirname, template, path, fileName, fileType)
    else
        ErrorMessage()
}

// Workers
await compileArguments()
