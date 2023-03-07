// #region Import
import path from 'path'
import fs from 'fs'
import Message from '../message/message.js'
import chalk from 'chalk'
import { CreateDirectories, DependenciesChecker, InstalledDependencies, ExecuteCommand } from '../helper/helper.js'
import { eExpressDependenciesWithTypes } from '../enums/eDependencies.js'
const { PreparingMessage, MiddleMessage, FinalMessage, CustomMessage, ErrorMessage } = Message()
// #endregion

// #region Local Var
const currentPath = path.resolve()
const dependencies = await InstalledDependencies()
// #endregion

// #region Options
const options = [
    { file: 'eConfig', template: 'eConfig' }, // Express Config
    { file: 'mConfig', template: 'mConfig' }, // Mongoose Config
    { file: 'routes', template: 'routes' }, // Custom Routes
    { file: 'schema', template: 'schema' }, // Schema (Mongoose)
    { file: '', template: 'crud' } // CRUD (Create, Read, Update, Delete), contain files: Controller, Schema, Routes
]
// #endregion

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
async function expressWorker (directory, template, path, fileName, fileType) {
    try {
        // Console Message
        await PreparingMessage(fileName)

        // Variables
        const destinationPathFolder = `${currentPath}/${path}`
        let destinationPathWithFile = `${currentPath}/`
        let snippetsPath = `${directory}/src/snippets/express-snippets/`
        const crudFiles = []

        // Find the template in options
        // To check if existing
        const templateObject = options.find((o) => o.template === template)

        if (templateObject === undefined || templateObject === null) { ErrorMessage(`Cant find template ${template}. Kindly suggest it so we can provide that template soon! 😉😇`) } else {
            if (template !== 'crud') {
                // Getting absolute snippets path
                snippetsPath = `${snippetsPath}${fileType}/${templateObject.file}.${fileType}`

                // Getting the destination file
                destinationPathWithFile = `${destinationPathWithFile}${path}/${fileName}.${fileType}`

                // Console Message
                await MiddleMessage()
                await ExpressHelperMessage(templateObject.template, fileType)

                // Workers
                if (fs.existsSync(destinationPathFolder)) {
                    // Copy custom file to destination
                    await fs.promises.copyFile(snippetsPath, destinationPathWithFile)
                } else {
                    // Create directories
                    await CreateDirectories(destinationPathFolder)

                    // Copy custom file to destination
                    await fs.promises.copyFile(snippetsPath, destinationPathWithFile)
                }

                // Console Message
                await FinalMessage(path, fileName, fileType)
            } else {
                // Console Message
                await MiddleMessage()
                await ExpressHelperMessage(templateObject.template, fileType)

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
                        return null
                    }))
                } else {
                    // Create directories
                    await CreateDirectories(destinationPathFolder)

                    // Copy custom files to destination
                    await Promise.all(crudFiles.map((file) => {
                        fs.promises.copyFile(file.path, file.destinationPath)
                        return null
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
const ExpressHelperMessage = async (starterChoice, fileType) => {
    // Console Message
    console.log(chalk.green('Checking if required dependencies already installed. \n'))

    switch (starterChoice) {
    case 'eConfig': {
        // Find required dependency in installed dependencies array
        const rDependencies = fileType === 'ts' ? ['express', 'cors', 'body-parse', 'compression', 'typescript'] : ['express', 'cors', 'body-parse', 'compression']
        const dObject = DependenciesChecker(dependencies, rDependencies, fileType, eExpressDependenciesWithTypes)
        let toBeInstalledDependenciesString = ''

        dObject.toBeInstalledDependencies.map((s) => {
            if (toBeInstalledDependenciesString === '') { toBeInstalledDependenciesString = s } else { toBeInstalledDependenciesString = `${toBeInstalledDependenciesString}, ${s}` }
            return null
        })

        if (dObject.scripts === '') { console.log(chalk.green(`${toBeInstalledDependenciesString} already installed. 😎 \n`)) } else {
            console.log(chalk.green(`Installing ${toBeInstalledDependenciesString}.....`))
            await ExecuteCommand(`npm i ${dObject.scripts}`)
            console.log(chalk.green(`JS-Work-CLI has successfully installed ${toBeInstalledDependenciesString}. 😎 \n`))
        }

        break
    }
    case 'mConfig': {
        // Find required dependency in installed dependencies array
        const reqDepsInstalled = dependencies.find((s) => s === 'mongoose')

        if (reqDepsInstalled !== undefined) { console.log(chalk.green('mongoose already installed. 😎 \n')) } else {
            console.log(chalk.green('Installing mongoose.....'))
            await ExecuteCommand('npm i mongoose')
            console.log(chalk.green('JS-Work-CLI has successfully installed mongoose. 😎 \n'))
        }

        break
    }
    case 'routes': {
        // Find required dependency in installed dependencies array
        const reqDepsInstalled = dependencies.find((s) => s === 'express')

        if (reqDepsInstalled !== undefined) { console.log(chalk.green('express already installed. 😎 \n')) } else {
            console.log(chalk.green('Installing express.....'))
            await ExecuteCommand('npm i express')
            console.log(chalk.green('JS-Work-CLI has successfully installed express. 😎 \n'))
        }

        break
    }
    case 'schema': {
        // Find required dependency in installed dependencies array
        const reqDepsInstalled = dependencies.find((s) => s === 'express')

        if (reqDepsInstalled !== undefined) { console.log(chalk.green('express already installed. 😎 \n')) } else {
            console.log(chalk.green('Installing express.....'))
            await ExecuteCommand('npm i express')
            console.log(chalk.green('JS-Work-CLI has successfully installed express. 😎 \n'))

            // Notes
            if (fileType === 'js') { console.log(chalk.green('Schema provided, just add some objects inside Schema.')) } else {
                console.log(chalk.green('Interface and Schema provided, just add some property inside Interface. '))
                console.log(chalk.green('PS: Schema object must be equals to Interface properties.'))
            }
        }

        break
    }
    case 'crud': {
        // Find required dependency in installed dependencies array
        const rDependencies = fileType === 'ts' ? ['express', 'mongoose', 'cors', 'body-parse', 'compression', 'typescript'] : ['express', 'mongoose', 'cors', 'body-parse', 'compression']
        const dObject = DependenciesChecker(dependencies, rDependencies, fileType, eExpressDependenciesWithTypes)
        let toBeInstalledDependenciesString = ''

        dObject.toBeInstalledDependencies.map((s) => {
            if (toBeInstalledDependenciesString === '') { toBeInstalledDependenciesString = s } else { toBeInstalledDependenciesString = `${toBeInstalledDependenciesString}, ${s}` }
            return null
        })

        if (dObject.scripts === '') { console.log(chalk.green(`${toBeInstalledDependenciesString} already installed. 😎 \n`)) } else {
            console.log(chalk.green(`Installing ${toBeInstalledDependenciesString}.....`))
            await ExecuteCommand(`npm i ${dObject.scripts}`)
            console.log(chalk.green(`JS-Work-CLI has successfully installed ${toBeInstalledDependenciesString}. 😎 \n`))
        }

        // Schema Notes
        if (fileType === 'js') { console.log(chalk.green('Schema provided, just add some objects inside Schema.')) } else {
            console.log(chalk.green('Interface and Schema provided, just add some property inside Interface. '))
            console.log(chalk.green('PS: Schema object must be equals to Interface properties.'))
        }

        console.log(chalk.green('Controller, Routes, Interface, Schema Templates provided. \n'))

        break
    }
    }
}

export { expressWorker }
