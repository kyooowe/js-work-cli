
//#region Import
import inquirer from "inquirer"
import path from 'path'
import fs from "fs"
import Message from "../message/message.js"
import { CorrectingNameInFile, CreateDirectories } from "../helper/helper.js"
const { PreparingMessage, MiddleMessage, FinalMessage, ErrorMessage } = Message()
//#endregion

//#region Local var
let answers
let hooksAnswer
let finalAnswer

const currentPath = path.resolve()
//#endregion

//#region Options
const options = [
    { name: 'Plain useState', file: 'pState' },
    { name: 'Plain useEffect', file: 'pEffect' },
    { name: 'Plain useRef', file: 'pRef' },
    { name: 'Built in useState and useEffect', file: 'stateAndEffect' },
    { name: 'Built in useState, useEffect and useRef', file: 'stateEffectAndRef' },
]
//#endregion

/**
 * @name reactPrompt - creates react prompt questions
 * @param directory - current path 
 * @returns null
 */
export default async function reactPrompt(directory) {
    answers = await inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "What file type you need?",
            choices: ['JSX', 'TSX']
        },
        {
            type: "confirm",
            name: "hooksConfirmation",
            message: "Do you need built in hooks?"
        }
    ])

    if (answers.hooksConfirmation) {
        await reactHooksPrompt()
    }

    await reactFinalPrompt()
    await worker(directory)
}

/**
 * @name reactHookConfirmation - fires only when react hooks confirmation is true
 * @param null
 * @returns null
 */
async function reactHooksPrompt() {

    hooksAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "starterChoice",
            message: "Select starter file you want:",
            choices: options.map(h => h.name)
        }
    ])

}

/**
 * @name reactFinalQuestion - create react last prompt questions
 * @param null
 * @returns null
 */
async function reactFinalPrompt() {
    finalAnswer = await inquirer.prompt([
        {
            type: "input",
            name: "createPath",
            message: "Where do you want to create the file? (eg. src/components):"
        },
        {
            type: "input",
            name: "fileName",
            message: "Name of the file? special characters not allowed (eg. button):",
        }
    ])
}

/**
 * @name worker - this function immediately fires when all questions are done
 * @var absoluteAnswers - Merge all answers
 * @var destinationPathFolder - get the current path 
 * @var destinationPathWithFile - get the current path, this will be use to add the filename and the type (eg. C:Users/data/test.jsx)
 * @var snippetsPath - get the snippets path base on the user choice
 * @var type - file type
 * @returns null
 */
async function worker(directory) {

    try {
        // Merge all answers
        const absoluteAnswers = { ...answers, ...hooksAnswer, ...finalAnswer }

        // Console Message
        await PreparingMessage(absoluteAnswers.fileName)

        // Variables
        let destinationPathFolder = `${currentPath}/`
        let destinationPathWithFile = `${currentPath}/`
        let snippetsPath = `${directory}/src/snippets/react-snippets/`
        let type = ""

        // Answer condition
        if (absoluteAnswers.type === "JSX")
            type = ".jsx"
        else
            type = ".tsx"

        if (!absoluteAnswers.hooksConfirmation)
            snippetsPath = `${snippetsPath}${type === ".jsx" ? "js" : "ts"}/plain${type}`
        else {

            const hook = options.filter(h => h.name === absoluteAnswers.starterChoice)
            snippetsPath = `${snippetsPath}${type === ".jsx" ? "js" : "ts"}/${hook[0].file}${type}`
        }

        // Getting the exact destination file
        destinationPathFolder = `${destinationPathFolder}${absoluteAnswers.createPath}`
        destinationPathWithFile = `${destinationPathWithFile}${absoluteAnswers.createPath}/${absoluteAnswers.fileName}${type}`

        // Console Message
        await MiddleMessage()

        // Workers
        if (fs.existsSync(destinationPathFolder)) {

            // Copy custom file to destination
            await fs.promises.copyFile(snippetsPath, destinationPathWithFile)

            // Renaming the function based on input fileName
            CorrectingNameInFile(destinationPathWithFile, 'Unique', absoluteAnswers.fileName)
        }
        else {

            // Create directories
            await CreateDirectories(destinationPathFolder)

            // Copy custom file to destination
            await fs.promises.copyFile(snippetsPath, destinationPathWithFile)
            
            // Renaming the function based on input fileName
            CorrectingNameInFile(destinationPathWithFile, 'Unique', absoluteAnswers.fileName)
        }

        // Console Message
        await FinalMessage(absoluteAnswers.fileName, type)
    } catch (err) {
        ErrorMessage()
    }
}