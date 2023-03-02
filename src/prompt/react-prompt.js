
//#region Import
import inquirer from "inquirer"
import path from 'path'
import fs from "fs"
import Message from "../message/message.js"
import { CorrectingNameInFile } from "../helper/helper.js"
const { PreparingMessage, MiddleMessage, FinalMessage, ErrorMessage } = Message()
//#endregion

//#region Local var
let answers
let hooksAnswer
let finalAnswer

const currentPath = path.resolve()
//#endregion

//#region Hooks Choices
const hooks = [
    { name: 'Plain useState', file: 'pState' },
    { name: 'Plain useEffect', file: 'pEffect' },
    { name: 'Plain useRef', file: 'pRef' },
    { name: 'Built in useState and useEffect', file: 'stateAndEffect' },
    { name: 'Built in useState, useEffect and useRef', file: 'stateEffectAndRef' },
]
//#endregion

/**
 * @name reactQuestions - creates react promp questions
 * @param null
 * @returns null
 */
export default async function reactQuestions() {
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
        await reactHookConfirmation()
    }

    await reactFinalQuestion()
    await worker()
}

/**
 * @name reactHookConfirmation - fires only when react hooks confirmation is true
 * @param null
 * @returns null
 */
async function reactHookConfirmation() {

    hooksAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "starterChoice",
            message: "Select starter file you want:",
            choices: hooks.map(h => h.name)
        }
    ])

}

/**
 * @name reactFinalQuestion - create react last prompt questions
 * @param null
 * @returns null
 */
async function reactFinalQuestion() {
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
async function worker() {

    // Merge all answers
    const absoluteAnswers = { ...answers, ...hooksAnswer, ...finalAnswer }

    // Console Message
    PreparingMessage(absoluteAnswers.fileName)

    // Variables
    let destinationPathFolder = `${currentPath}/`
    let destinationPathWithFile = `${currentPath}/`
    let snippetsPath = "./src/snippets/react-snippets/"
    let type = ""

    // Answer condition
    if (absoluteAnswers.type === "JSX")
        type = ".jsx"
    else
        type = ".tsx"

    if (!absoluteAnswers.hooksConfirmation)
        snippetsPath = `${snippetsPath}${type === ".jsx" ? "js" : "ts"}/plain.jsx`
    else {

        const hook = hooks.filter(h => h.name === absoluteAnswers.starterChoice)
        snippetsPath = `${snippetsPath}${type === ".jsx" ? "js" : "ts"}/${hook[0].file}.jsx`
    }

    // Getting the exact destination file
    destinationPathFolder = `${destinationPathFolder}${absoluteAnswers.createPath}`
    destinationPathWithFile = `${destinationPathWithFile}${absoluteAnswers.createPath}/${absoluteAnswers.fileName}${type}`

    // Console Message
    MiddleMessage()

    // Workers
    if (fs.existsSync(destinationPathFolder))
        fs.copyFile(snippetsPath, destinationPathWithFile, (err) => {
            if (err)
                ErrorMessage()

            CorrectingNameInFile(destinationPathWithFile, 'Unique', absoluteAnswers.fileName)
        })
    else {
        fs.mkdirSync(destinationPathFolder)

        fs.copyFile(snippetsPath, destinationPathWithFile, (err) => {
            if (err)
                ErrorMessage()

            CorrectingNameInFile(destinationPathWithFile, 'Unique', absoluteAnswers.fileName)
        })
    }

    // Console Message
    FinalMessage(absoluteAnswers.fileName, type)
}