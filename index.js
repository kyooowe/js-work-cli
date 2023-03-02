#!/usr/bin/env node

//#region Import
import inquirer from "inquirer"
import path from 'path'
import chalk from 'chalk';
import boxen from 'boxen';
import figlet from "figlet"

// Prompt
import reactQuestions from "./src/prompt/react-prompt.js"
//#endregion

// variables
let answers = []

/**
 * @name welcome - welcome message
 * @param null
 * @returns null
 */
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

/**
 * @name askQuestions - initial prompt message
 * @event reactQuestions - run reactQuestions when the user select React as framework
 * @param null
 * @returns null
 */
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

// Workers
await welcome()
await askQuestions()