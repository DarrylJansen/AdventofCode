const fs = require('fs');
const numberStrings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {

        let message = lines[i];
        let firstDigit = '';
        let secondDigit = '';
        for (let j=0; j < message.length; j++) {
            let char = message[j];
            if (isDigit(char)) {
                firstDigit = parseInt(char);
                break;
            }else{
                firstDigit = firstDigit + char;
                let numberWord = isNumberWord(firstDigit);
                if(numberWord){
                    firstDigit = numberStrings.indexOf(numberWord);
                    break;
                }
            }
        }
        for(let j=message.length - 1; j >= 0; j--){
            let char = message[j];
            if (isDigit(char)) {
                secondDigit = parseInt(char);
                break;
            }else{
                secondDigit = char + secondDigit;
                let numberWord = isNumberWord(secondDigit);
                if(numberWord){
                    secondDigit = numberStrings.indexOf(numberWord);
                    break;
                }
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

function isNumberWord(string) {
    for(let i = 0; i < numberStrings.length; i++){
        if(string.includes(numberStrings[i])){
            return numberStrings[i];
        }
    }
    return false;
}