//#region Import
import chalk from "chalk"
//#endregion

const Message = () => {

    const PreparingMessage = async (fileName) => {
        console.log(chalk.blueBright(`\nPreparing ${fileName} for creation, standby and sip your coffee. 🍵`))
        console.log(chalk.blueBright('Customizing the file base on your input request. 🔧🔨\n'))
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const MiddleMessage = async () => {
        console.log(chalk.blueBright('Finalizing the file.....\n'))
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const FinalMessage = async (fileName, type) => {
        console.log(chalk.blueBright(`${fileName}${type} is now ready! Thanks for using JS Work-CLI. 💙💚 \n`))
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const ErrorMessage = () => {
        console.log(chalk.blueBright('Error occured, you can start again to try our JS Work-CLI. \n'))
    }

    return { PreparingMessage, MiddleMessage, FinalMessage, ErrorMessage }
}

export default Message;