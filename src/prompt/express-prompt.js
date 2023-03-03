//#region Import
import path from 'path'
import fs from "fs"
import Message from "../message/message.js"
import chalk from "chalk"
import { CreateDirectories } from "../helper/helper.js"
const { PreparingMessage, MiddleMessage, FinalMessage, CustomMessage, ErrorMessage } = Message()
//#endregion

//#region Local Var
const currentPath = path.resolve()
//#endregion

//#region Options
const options = [
    { file: 'eConfig', template: 'eConfig' },           // Express Config
    { file: 'mConfig', template: 'mConfig' },           // Mongoose Config
    { file: 'routes', template: 'routes' },             // Custom Routes
    { file: 'schema', template: 'schema' },             // Schema (Mongoose)
    { file: '', template: 'crud' },                     // CRUD (Create, Read, Update, Delete), contain files: Controller, Schema, Routes
]
//#endregion

/**
 * @name worker - this function immediately fires when all questions are done
 * @param directory - current directory of the js-work-cli itself
 * @param template - selected template of the user
 * @param path - destination path inputed by the user
 * @param fileName - user inputed filename for the template
 * @param fileType - file type selected by user
 * @var destinationPathFolder - get the current path 
 * @var destinationPathWithFile - get the current path, this will be use to add the filename and the type (eg. C:Users/data/test.jsx)
 * @var snippetsPath - get the snippets path base on the user choice
 * @var crudFiles - all custom crud files (controller, interface, schema and routes)
 * @returns null
 */
async function expressWorker(directory, template, path, fileName, fileType) {
    try {

        // Console Message
        await PreparingMessage(fileName)

        // Variables
        let destinationPathFolder = `${currentPath}/${path}`
        let destinationPathWithFile = `${currentPath}/`
        let snippetsPath = `${directory}/src/snippets/express-snippets/`
        let crudFiles = []

        // Find the template in options 
        // To check if existing
        const templateObject = options.find((o) => o.template === template)

        if (templateObject === undefined || templateObject === null)
            ErrorMessage(`Cant find template ${template}. Kindly suggest it so we can provide that template soon! 😉😇`)
        else {

            if (template !== 'crud') {

                // Getting absolute snippets path
                snippetsPath = `${snippetsPath}${fileType}/${templateObject.file}.${fileType}`

                // Getting the destination file
                destinationPathWithFile = `${destinationPathWithFile}${path}/${fileName}.${fileType}`

                // Console Message
                await MiddleMessage()
                ExpressHelperMessage(templateObject.template, fileType)

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
                await FinalMessage(path, fileName, fileType)

            }
            else {

                // Console Message
                await MiddleMessage()
                ExpressHelperMessage(templateObject.template, fileType)

                // Absolute snippetsPath
                snippetsPath = `${snippetsPath}${fileType}/crud/`

                // Create object per file then push to crudFiles array
                const dir = await fs.promises.opendir(snippetsPath)

                // Create object base on file properties and store in crudFiles array
                for await (const file of dir) {
                    crudFiles.push({ path: `${snippetsPath}${file.name}`, filename: file.name, destinationPath: `${destinationPathWithFile}${path}/${file.name}` })
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
                await CustomMessage(`Custom CRUD template is now now ready in ${path}.  Thanks for using JS Work-CLI. 💙💚`)
            }
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
        case "eConfig":

            // Notes
            if (fileType === "js") {
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
        case "mConfig":

            // Notes
            console.log(chalk.blueBright(`Kindly disregard if dependecies already installed.`))
            console.log(chalk.blueBright(`Need to install dependecies: ${chalk.green('mongoose.')}`))
            console.log(chalk.blueBright(`Example for installation dependencies: npm i mongoose.\n`))
            console.log(chalk.green(`Create .env file in root folder and add MONGO_DB=your@connectionStringValue \n`))
            break;
        case "routes":

            // Notes
            console.log(chalk.green(`Template already provided, just uncomment if needed. \n`))
            break;
        case "schema":

            // Notes
            if (fileType === "js")
                console.log(chalk.green(`Schema already provided, just add some objects inside Schema. \n`))
            else {
                console.log(chalk.green(`Interface and Schema already provided, just add some property inside Interface. `))
                console.log(chalk.green(`PS: Schema object must be equals to Interface properties. \n`))
            }
            break;
        case "crud":

            if (fileType === "js") {
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
            if (fileType === "js")
                console.log(chalk.green(`Schema already provided, just add some objects inside Schema.`))
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

export { expressWorker }