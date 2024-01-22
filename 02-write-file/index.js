
const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const textPath = path.resolve(__dirname, 'text.txt');

const initializeTextFile = () => {
    fs.writeFile(textPath, '', (err) => {
        if (err) throw err;
    });
};

const writeToTextFile = (data) => {
    fs.appendFile(textPath, data.toString(), (err) => {
        if (err) throw err;
    });
};

const handleUserInput = () => {
    stdout.write('Tell me your problems:\n');

    stdin.on('data', (data) => {
        const trimmedData = data.toString().trim();

        if (trimmedData === 'exit') {
            process.exit();
        }

        writeToTextFile(data);
    });
};

const handleExit = () => {
    process.on('exit', () => {
        stdout.write("\nPraise the Sun, my friend!");
    });
    process.on('SIGINT', () => {
        process.exit();
    });
};



initializeTextFile();
handleUserInput();
handleExit();


