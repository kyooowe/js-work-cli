#!/usr/bin/env node

//#region Import
import fs from "fs"
import inquirer from "inquirer"
import path from 'path'
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import boxen from 'boxen';
import figlet from "figlet"

// Prompt
import reactQuestions from "./src/prompt/react-prompt.js"
//#endregion

// variables
let answers = []
const currentPath = path.resolve()

async function welcome() {

    console.log(chalk.greenBright(figlet.textSync('JS Work-CLI', { horizontalLayout: 'full', whitespaceBreak: true })))
    console.log(
        boxen(
            chalk.blueBright(
                `A helpful CLI for React and Express\n\n 
        React: Easily create files with built in hooks of your choice
        Express: Easily create built in services, models and templates\n

        ${chalk.gray("PS: Vue, Svelte support coming soon")}
        `
            ), {
            borderStyle: 'round',
            textAlignment: 'center',
            width: 82,
            borderColor: 'blue'
        }));
    console.log('\n')

}

async function askQuestions() {
    answers = await inquirer.prompt([
        {
            type: "list",
            name: "framework",
            message: "What framework are you using?",
            choices: ['React', 'Express'],
        },
    ])

    if (answers.framework === 'React')
        await reactQuestions()

}

async function doAnswers() {

    let destinationPath = `${currentPath}/${answers.path}/`
    let fileToCopyPath = ""
    let snippetsPath = ""
    let type = ""

    if (answers.framework === 'React')
        snippetsPath = "./src/react-snippets/react"

    if (answers.type === "JS")
        type = ".js"
    else
        type = ".ts"

    fileToCopyPath = `${fileToCopyPath}${snippetsPath}${type}`
    destinationPath = `${destinationPath}${answers.name}${type}`

    fs.copyFile(fileToCopyPath, destinationPath, (err) => {
        if (err)
            throw err;

        console.log(`${answers.name}.${answers.type} is now active in ${answers.path}`)
    })

}


await welcome()
await askQuestions()
// await doAnswers()