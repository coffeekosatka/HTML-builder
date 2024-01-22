const fs = require('fs/promises');
const path = require('path');
const { stdout } = process;

const secretFolderPath = `${__dirname}/secret-folder`;

async function collectInfo(file) {
    try {
        if (file.isFile()) {
            const [name, type] = file.name.split('.');
            const size = (await fs.stat(`${secretFolderPath}/${file.name}`)).size;
            const realSize = size/1000;
            const info = `${name} - ${type} - ${realSize}kb\n`;
            stdout.write(info);
        }
    } catch (error) {
        console.log(error);
    }
}

async function readFiles(folderPath) {
    try {
        const files = await fs.readdir(folderPath, {withFileTypes: true});
        for (const file of files) {
            await collectInfo(file);
        }
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    try {
        await readFiles(secretFolderPath);
    } catch (error) {
        console.log(error);
    }
}

main();
