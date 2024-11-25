const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

function generateMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

async function dictionaryAttack(dictionaryPath) {
    try {
        const fileStream = fs.createReadStream(dictionaryPath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        console.log('Starting dictionary attack...');

        for await (const word of rl) {
            const hash = generateMD5(word.trim());

            if (hash === targetHash) {
                console.log(`Bob's password is: ${word}`);
                return word;
            }
        }

        console.log('Password not found in the dictionary.');
        return null;
    } catch (error) {
        console.error(`Error reading dictionary file: ${error.message}`);
    }
}

const dictionaryPath = '500-worst-passwords.txt';

dictionaryAttack(dictionaryPath);
