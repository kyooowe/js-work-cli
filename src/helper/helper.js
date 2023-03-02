//#region Import
import fs from "fs"
//#endregion

const CorrectingNameInFile = (path, oldName, newName) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err)
            throw err;

        const result = data.replaceAll(oldName, newName);

        fs.writeFile(path, result, 'utf-8', (err) => {
            if (err)
                throw err;
        })
    })
}

const CreateDirectories = async (path) => {
    await fs.promises.mkdir(path, { recursive: true })
}

export { CorrectingNameInFile, CreateDirectories }