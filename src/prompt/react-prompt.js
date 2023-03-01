
import inquirer from "inquirer"

let answers
let hooksAnswer
let finalAnswer

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

    if(answers.hooksConfirmation) {
        await reactHookConfirmation()
    }

    await reactFinalQuestion()
    await worker()
}

async function reactHookConfirmation () {

    hooksAnswer = await inquirer.prompt([
        {
            type: "checkbox",
            name: "hooksChoice",
            message: "Select hooks you want to add:",
            choices: ['useState', 'useEffect', 'useRef']
        }
    ])
   
}

async function reactFinalQuestion () {
    finalAnswer = await inquirer.prompt([
        {
            type: "input",
            name: "createPath",
            message: "Where do you want to create the file? (eg. src/components):"
        },
        {
            type: "input",
            name: "fileName",
            message: "Name of the file? (eg. button):",
        }
    ])
}

async function worker() {
    const absoluteAnswers = {...answers, ...hooksAnswer, ...finalAnswer}

    console.log(absoluteAnswers)
}