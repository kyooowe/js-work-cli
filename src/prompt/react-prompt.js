
//#region Import
import path from 'path'
import fs from "fs"
import Message from "../message/message.js"
import { CorrectingNameInFile, CreateDirectories, DependenciesChecker, InstalledDependencies, ExecuteCommand } from "../helper/helper.js"
import chalk from 'chalk'
import { eReactDependenciesWithTypes } from '../enums/eDependencies.js'
const { PreparingMessage, MiddleMessage, FinalMessage, CustomMessage, InfoMessage, ErrorMessage } = Message()
//#endregionp

//#region Local var
const currentPath = path.resolve()
const dependencies = await InstalledDependencies()
//#endregion

//#region Options
const options = [
    { file: 'plain', template: 'plain' },                 // Plain
    { file: 'pState', template: 'pState' },               // Plain useState
    { file: 'pEffect', template: 'pEffect' },             // Plain useEffect
    { file: 'pRef', template: 'pRef' },                   // Plain useRef
    { file: 'stateAndEffect', template: 'stef' },         // Built in useState and useEffect
    { file: 'stateEffectAndRef', template: 'stefr' },     // Built in useState, useEffect and useRef
    { file: 'httpService', template: 'httpService' },     // Custom Http Service with sample api request
    { file: 'zustand', template: 'zustand' },             // Custom Zustand 
    { file: 'debounce', template: 'debounce' }            // Custom Zustand 
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
 * @returns null
 */
async function reactWorker(directory, template, path, fileName, fileType) {

    try {
        // Console Message
        await PreparingMessage(fileName)

        // Variables
        let destinationPathFolder = `${currentPath}/${path}`
        let destinationPathWithFile = `${currentPath}/`
        let snippetsPath = `${directory}/src/snippets/react-snippets/`
        let crudFiles = []

        const templateObject = options.find((o) => o.template === template)

        if (templateObject === undefined || template === null)
            ErrorMessage(`Cant find template ${template}. Kindly suggest it so we can provide that template soon! 😉😇`)
        else {
            switch (templateObject.template) {

                case "httpService":

                    // Console Message
                    await MiddleMessage()
                    await ReactHelperMessage('httpService', '')

                    // Getting absolute snippets path
                    snippetsPath = `${snippetsPath}${fileType}/httpRequest/`

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
                    await InfoMessage(`HttpService and sample API request provided.`)
                    await CustomMessage(`Custom HttpService template is now now ready in ${path}.  Thanks for using JS Work-CLI. 💙💚`)

                    break;
                case 'zustand':

                    // Console Message
                    await MiddleMessage()
                    await ReactHelperMessage('zustand', '')

                    // Getting absolute snippets path
                    snippetsPath = `${snippetsPath}${fileType}/zustand.${fileType}`

                    // Getting the destination file
                    destinationPathWithFile = `${destinationPathWithFile}${path}/${fileName}.${fileType}`

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
                    await CustomMessage(`Zustand template is now now ready in ${path}.  Thanks for using JS Work-CLI. 💙💚`)

                    break;
                case 'debounce':

                    // Console Message
                    await MiddleMessage()
                    await ReactHelperMessage('debounce', fileType)

                    // Getting absolute snippets path
                    snippetsPath = `${snippetsPath}${fileType}/debounce.${fileType}`

                    // Getting the destination file
                    destinationPathWithFile = `${destinationPathWithFile}${path}/${fileName}.${fileType}`

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
                    await CustomMessage(`Zustand template is now now ready in ${path}.  Thanks for using JS Work-CLI. 💙💚`)

                    break;
                default: // React Hooks

                    // Getting absolute snippets path
                    snippetsPath = `${snippetsPath}${fileType}/${templateObject.file}.${fileType === "js" ? "jsx" : "tsx"}`

                    // Getting the destination file
                    destinationPathWithFile = `${destinationPathWithFile}${path}/${fileName}.${fileType === "js" ? "jsx" : "tsx"}`

                    // Console Message
                    await MiddleMessage()

                    // Workers
                    if (fs.existsSync(destinationPathFolder)) {

                        // Copy custom file to destination
                        await fs.promises.copyFile(snippetsPath, destinationPathWithFile)

                        // Renaming the function based on input fileName
                        CorrectingNameInFile(destinationPathWithFile, 'Unique', fileName)
                    }
                    else {

                        // Create directories
                        await CreateDirectories(destinationPathFolder)

                        // Copy custom file to destination
                        await fs.promises.copyFile(snippetsPath, destinationPathWithFile)

                        // Renaming the function based on input fileName
                        CorrectingNameInFile(destinationPathWithFile, 'Unique', fileName)
                    }

                    // Console Message
                    await FinalMessage(path, fileName, fileType)
                    break;
            }

        }

    } catch (err) {
        console.log(err)
        ErrorMessage()
    }
}

/**
 * @name ReactHelperMessage - helper function for logging helper message
 * @var starterChoice - file select by user
 * @var fileType - file type
 * @returns null
 */
const ReactHelperMessage = async (starterChoice, fileType) => {

    // Console Message
    console.log(chalk.green(`Checking if required dependencies already installed. \n`))

    switch (starterChoice) {

        case "httpService": {

            // Find required dependency in installed dependencies array
            const reqDepsInstalled = dependencies.find((s) => s === 'axios')

            if (reqDepsInstalled !== undefined)
                console.log(chalk.green(`axios already installed. 😎 \n`))
            else {
                console.log(chalk.green(`Installing axios.....`))
                await ExecuteCommand('npm i axios')
                console.log(chalk.green(`JS-Work-CLI has successfully installed axios. 😎 \n`))
            }

            break;
        }

        case "zustand": {

            // Find required dependency in installed dependencies array
            const reqDepsInstalled = dependencies.find((s) => s === 'zustand')

            if (reqDepsInstalled !== undefined)
                console.log(chalk.green(`zustand already installed. 😎 \n`))
            else {
                console.log(chalk.green(`Installing zustand.....`))
                await ExecuteCommand('npm i zustand')
                console.log(chalk.green(`JS-Work-CLI has successfully installed zustand. 😎 \n`))
            }

            break;
        }

        case "debounce": {

            // Find required dependency in installed dependencies array
            const rDependencies = fileType === 'ts' ? ['react', 'react-dom', 'typescript'] : ['react', 'react-dom']
            const dObject = DependenciesChecker(dependencies, rDependencies, fileType, eReactDependenciesWithTypes)
            let toBeInstalledDependenciesString = ''
            
            dObject.toBeInstalledDependencies.map((s) => {

                if(toBeInstalledDependenciesString === '')
                    toBeInstalledDependenciesString = s
                else 
                    toBeInstalledDependenciesString = `${toBeInstalledDependenciesString}, ${s}`

            })

            if (dObject.scripts === '')
                console.log(chalk.green(`react, react-dom, typescript already installed. 😎 \n`))
            else {
                console.log(chalk.green(`Installing ${toBeInstalledDependenciesString}.....`))
                await ExecuteCommand(`npm i ${dObject.scripts}`)
                console.log(chalk.green(`JS-Work-CLI has successfully installed ${toBeInstalledDependenciesString}. 😎 \n`))
            }

            break;

        }

        default:
            break;
    }
}


export { reactWorker }