const fs = require('node:fs');
const path = require('node:path');

const readStream = fs.createReadStream('emails.txt');
const writeStream = fs.createWriteStream('gmail.txt');

readStream.on('data', (chunk) => {
    const data = chunk.toString().split('\n');
    for (const str of data) {
        console.log('>', {str});
        const [_, email] = str.split('\t\t\t');
        if (email && email.match('gmail.com')) {
            console.log(email);
            writeStream.write(`${email}\n`);
        }
    }
}).on('end', () => {
    console.log('> end');
    readStream.close();
});