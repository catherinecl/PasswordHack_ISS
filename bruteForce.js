const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69';

function generateMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function bruteForcePIN() {
    for (let pin = 0; pin <= 9999; pin++) {
        const pinString = pin.toString().padStart(4, '0');
        
        const hash = generateMD5(pinString);
        
        if (hash === targetHash) {
            console.log(`Alice's PIN is: ${pinString}`);
            return pinString;
        }
    }
    console.log('PIN not found');
    return null;
}

bruteForcePIN();
