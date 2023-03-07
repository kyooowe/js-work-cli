// #region Import
import fs from 'fs'
import { exec } from 'child_process'
// #endregion

/**
 * @name CorrectingNameInFile - for changing fileName and changing some string in file itself
 * @param path - path directory
 * @param oldName  - old fileName
 * @param newName - new fileName
 * @return - null
 */
const CorrectingNameInFile = (path, oldName, newName) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) { throw err }

        const result = data.replaceAll(oldName, newName)

        fs.writeFile(path, result, 'utf-8', (err) => {
            if (err) { throw err }
        })
    })
}

/**
 * @name CreateDirectories - for creating of not existing directories
 * @param path - directories to be created
 * @return - promise
 */
const CreateDirectories = async (path) => {
    await fs.promises.mkdir(path, { recursive: true })
}

/**
 * @name DependenciesChecker - for checking all dependencies
 * @param dArr - all installed dependencies
 * @param dRquiredArr - required to installed dependencies
 * @param fileType - fileType selected by user, can be JS or TS
 * @param dWithTypes - dependencies with types (for typescript only) eg. react need @types/react for typescript
 * @var rDependencies -  same behavior with @dRquiredArr but with flagger if installed or not
 * @var scripts - scripts to return eg. react @types/react
 * @var toBeInstalledDependencies - all dependencies ready to install
 * @var isTypescriptInstalled - flagger if typescript is already installed
 * @var missingDependencies - filtered in @rDependencies but flagger is not installed
 * @returns - { scripts: string, toBeinstalledDependencies: arr of need to install dependencies}
 */
const DependenciesChecker = (dArr, dRequiredArr, fileType, dWithTypes) => {
    const rDependencies = []
    let scripts = ''
    const toBeInstalledDependencies = []

    // Map through given required dependencies
    dRequiredArr.map((d) => {
        const dependency = { name: d }
        const isDependencyInstalled = dArr.find((s) => s === d)

        if (isDependencyInstalled === undefined) { dependency.isAlreadyInstalled = false } else { dependency.isAlreadyInstalled = true }

        rDependencies.push(dependency)

        return ''
    })

    // Variable for missing dependencies
    const missingDependencies = rDependencies.filter((d) => !d.isAlreadyInstalled)

    // Check if typescript already installed if fileType is TS
    if (fileType !== 'ts') {
        // Map through missing dependencies to generate scripts
        missingDependencies.map((d) => {
            scripts = `${scripts} ${d.name}`

            toBeInstalledDependencies.push(d.name)

            return ''
        })
    } else {
        // Map through missing dependencies to generate scripts
        missingDependencies.map((d) => {
            const isDependencyNeedTypes = dWithTypes.find((s) => s === d.name)

            if (isDependencyNeedTypes === undefined) { scripts = `${scripts} ${d.name}` } else { scripts = `${scripts} ${d.name} @types/${d.name}` }

            toBeInstalledDependencies.push(d.name)

            return ''
        })
    }

    return { scripts, toBeInstalledDependencies }
}

/**
 * @name InstalledDependencies - for getting all installed dependencies
 * @returns PromiseResolve
 */
const InstalledDependencies = async () => {
    return new Promise((resolve, reject) => {
        exec('npm ls --json', (err, stdout, stderr) => {
            if (err) { reject(err) } else {
                const packageJsonObject = JSON.parse(stdout)
                const dependenciesInstalledArr = Object.keys(packageJsonObject.dependencies)

                resolve(dependenciesInstalledArr)
            }
        })
    })
}

/**
 * @name ExecuteCommand - for executing npm command
 * @param command - command string
 * @returns PromiseResolve
 */
const ExecuteCommand = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) { reject(err) }

            resolve(stdout)
        })
    })
}

export { CorrectingNameInFile, CreateDirectories, DependenciesChecker, InstalledDependencies, ExecuteCommand }
