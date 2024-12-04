const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const memory = data.toString();
    let allowed = ['0','1','2','3','4','5','6','7','8','9',','];
    let mulList = [];
    let mulEndList = [];
    let sum = 0;

    //find 'mul(' occurrences
    for (let i = 0; i < memory.length - 4; i++) {
        if (memory.slice(i, i + 4) === 'mul(') {
            mulList.push(i+4);
            i += 3;
        }
    }

    //find the end of working mul( functions and add them to mulEndList
    for (let i = 0; i < mulList.length; i++) {
        for(let c = mulList[i]+1; c< memory.length; c++) {
            if (allowed.includes(memory[c])) {
                if(memory[c] === ',' && memory[c+1] === ',') {
                    break;
                }else{
                    continue;
                }
                
            }else if(memory[c] === ')') {
                mulEndList.push(c);
                break;
            }else{
                mulList.splice(i,1);
                i--;
                break;
            }
        }
    }

    //find the numbers in the mul( functions and multiply them
    for (let i = 0; i < mulList.length; i++) {
        let numbers = memory.slice(mulList[i], mulEndList[i]).split(',');
        if (numbers.length === 2) {
            sum += numbers[0] * numbers[1];
        }
    }

    console.log(sum);


});