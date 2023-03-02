//#region Import
import inquirer from "inquirer"
import path from 'path'
import fs from "fs"
import Message from "../message/message.js"
import chalk from "chalk"
import { CorrectingNameInFile, CreateDirectories } from "../helper/helper.js"
const { PreparingMessage, MiddleMessage, FinalMessage, ErrorMessage } = Message()
//#endregion

//#region Local Var
let answers
let fileName

const currentPath = path.resolve()
//#endregion

//#region Options
const options = [
    { name: 'Express Config', file: 'eConfig' },
    { name: 'Mongoose Config', file: 'mConfig' },
    { name: 'Routes', file: 'routes' },
    { name: 'Schema (Mongoose)', file: 'schema' },
    { name: 'CRUD', file: '' },
]
//#endregion

/**
 * @name expressPrompt - creates express prompt questions
 * @param directory - current path 
 * @returns null
 */
export default async function expressPrompt(directory) {
    answers = await inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "What file type you need?",
            choices: ['JS', 'TS']
        },
        {
            type: "list",
            name: "starterChoice",
            message: "Select starter file you want:",
            choices: options.map(h => h.name)
        },
        {
            type: "input",
            name: "createPath",
            message: "Where do you want to create the file? (eg. src/core):"
        },
    ])

    if (answers.starterChoice !== 'CRUD')
        await fileNamePrompt()

    await worker(directory)
}

/**
 * @name fileNamePrompt - creates prompt for fileName 
 * @param directory - current path 
 * @returns null
 */
async function fileNamePrompt() {
    fileNamePrompt = await inquirer.prompt([
        {
            type: "input",
            name: "fileName",
            message: "Name of the file? special characters not allowed (eg. products.usage):",
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
 * @var crudFiles - all custom crud files (controller, interface, schema and routes)
 * @returns null
 */
async function worker(directory) {
    try {

        // Add answers in const var
        const absoluteAnswers = { ...answers, ...fileName }

        // Console Message
        await PreparingMessage(absoluteAnswers.fileName)

        // Variables
        let destinationPathFolder = `${currentPath}/`
        let destinationPathWithFile = `${currentPath}/`
        let snippetsPath = `${directory}/src/snippets/express-snippets/`
        let type = ""

        // Answer condition
        if (absoluteAnswers.type === "JS")
            type = ".js"
        else
            type = ".ts"

        if (absoluteAnswers.starterChoice !== 'CRUD') {

            // Filter object
            const starter = options.filter(s => s.name === absoluteAnswers.starterChoice)
            snippetsPath = `${snippetsPath}${type === ".js" ? "js" : "ts"}/${starter[0].file}${type}`

            // Getting the exact destination file
            destinationPathFolder = `${destinationPathFolder}${absoluteAnswers.createPath}`
            destinationPathWithFile = `${destinationPathWithFile}${absoluteAnswers.createPath}/${absoluteAnswers.fileName}${type}`

            // Console Message
            await MiddleMessage()
            ExpressHelperMessage(absoluteAnswers.starterChoice, absoluteAnswers.type)

            // Workers
            if (fs.existsSync(destinationPathFolder)) {

                // Copy custom file to destination
                await fs.promises.copyFile(snippetsPath, destinationPathWithFile)
            }

            else {

                // Create directories
                await CreateDirectories(destinationPathFolder)

                // Copy custom file to destination
                await fs.promises.copyFile(snippetsPath, destinationPathWithFile)
            }

            // Console Message
            await FinalMessage(absoluteAnswers.fileName, type)
        }
        else {

            // Getting the exact destination file
            destinationPathFolder = `${destinationPathFolder}${absoluteAnswers.createPath}`
            snippetsPath = `${snippetsPath}${type === ".js" ? "js" : "ts"}/crud/`
            let crudFiles = []

            // Console Message
            await MiddleMessage()
            ExpressHelperMessage("CRUD", absoluteAnswers.type)

            const dir = await fs.promises.opendir(snippetsPath)
            for await (const file of dir) {
                crudFiles.push({ path: `${snippetsPath}${file.name}`, filename: file.name, destinationPath: `${destinationPathWithFile}${absoluteAnswers.createPath}/${file.name}` })
            }

            // Workers
            if (fs.existsSync(destinationPathFolder)) {

                // Copy custom files to destination
                await Promise.all(crudFiles.map((file) => {
                    fs.promises.copyFile(file.path, file.destinationPath)
                }))
            }
                
            else {

                // Create directories
                await CreateDirectories(destinationPathFolder)

                // Copy custom files to destination
                await Promise.all(crudFiles.map((file) => {
                    fs.promises.copyFile(file.path, file.destinationPath)
                }))
            }

            // Console Message
            await FinalMessage("Custom CRUD", "")

        }

    } catch (err) {
        ErrorMessage()
    }
}

/**
 * @name ExpressHelperMessage - helper function for logging helper message
 * @var starterChoice - file select by user
 * @var fileType - file type
 * @returns null
 */
const ExpressHelperMessage = (starterChoice, fileType) => {
    switch (starterChoice) {
        case "Express Config":

            // Notes
            if (fileType === "JS") {
                console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
                console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('express, cors, bodyParser, compression and helmet.')}`))
                console.log(chalk.blueBright(`Example for installation dependencies: npm i express\n`))
            }
            else {
                console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
                console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('typescript, express, cors, bodyParser, compression and helmet.')}`))
                console.log(chalk.blueBright(`Example for installation dependencies: npm i @types/express\n`))
            }
            break;
        case "Mongoose Config":

            // Notes
            console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
            console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('mongoose.')}`))
            console.log(chalk.blueBright(`Example for installation dependencies: npm i mongoose.\n`))
            console.log(chalk.green(`Create .env file in root folder and add MONGO_DB=your@connectionStringValue \n`))
            break;
        case "Routes":

            // Notes
            console.log(chalk.green(`Template already provided, just uncomment if needed. \n`))
            break;
        case "Schema (Mongoose)":

            // Notes
            if (fileType === "JS")
                console.log(chalk.green(`Schema already provided, just add some objects inside Schema. \n`))
            else {
                console.log(chalk.green(`Interface and Schema already provided, just add some property inside Interface. `))
                console.log(chalk.green(`PS: Schema object must be equals to Interface properties. \n`))
            }
            break;
        case "CRUD":

            if (fileType === "JS") {
                console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
                console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('express, mongoose, cors, bodyParser, compression and helmet.')}`))
                console.log(chalk.blueBright(`Example for installation dependencies: npm i express\n`))
            }
            else {
                console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
                console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('typescript, mongoose, express, cors, bodyParser, compression and helmet.')}`))
                console.log(chalk.blueBright(`Example for installation dependencies: npm i @types/express\n`))
            }

            // Schema Notes
            if (fileType === "JS")
                console.log(chalk.green(`Schema already provided, just add some objects inside Schema. \n`))
            else {
                console.log(chalk.green(`Interface and Schema already provided, just add some property inside Interface. `))
                console.log(chalk.green(`PS: Schema object must be equals to Interface properties. \n`))
            }

            // Route and Controller notes
            console.log(chalk.green('Controller Templates already provided.'))
            console.log(chalk.green(`Routes Template already provided. \n`))
            break;
    }
}