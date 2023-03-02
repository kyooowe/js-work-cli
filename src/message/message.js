//#region Import
import chalk from "chalk"
//#endregion

const Message = () => {

    const PreparingMessage = (fileName) => {
        console.log(chalk.blueBright(`\nPreparing ${fileName} for creation, standby and sip your coffee. 🍵`))
        console.log(chalk.blueBright('Customizing the file base on your input request. 🔧🔨\n'))
        setTimeout((""), 500)
    }

    const MiddleMessage = () => {
        console.log(chalk.blueBright('Finalizing the file.....\n'))
        setTimeout((""), 500)
    }

    const FinalMessage = (fileName, type) => {
        console.log(chalk.blueBright(`${fileName}${type} is now ready! Thanks for using JS Work-CLI. 💙💚 \n`))
        setTimeout((""), 500)
    }

    const ErrorMessage = () => {
        console.log(chalk.blueBright('Error occured, you can start again to try our JS Work-CLI. \n'))
    }

    return { PreparingMessage, MiddleMessage, FinalMessage, ErrorMessage }
}

export default Message;