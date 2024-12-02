const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    for (let i = 0; i < lines.length; i++) {

        let message = lines[i];
        let firstDigit = null;
        let secondDigit = null;
        for (let j=0; j < message.length; j++) {
            let char = message[j];
            if (isDigit(char)) {
                firstDigit = parseInt(char);
                break;
            }
        }
        for(let j=message.length; j > 0; j--){
            let char = message[j];
            if (isDigit(char)) {
                secondDigit = parseInt(char);
                break;
            }
        }
        let number = null;
        if(secondDigit === null){
            number = 11*firstDigit;
        }else{
            number = 10*firstDigit + secondDigit;
        }

        sum += number;
        console.log("line "+i+": "+lines[i]+'\t'+"number: "+number);
    }

    console.log("sum: "+sum);
});

function isDigit(char) {
    return /^\d$/.test(char);
}