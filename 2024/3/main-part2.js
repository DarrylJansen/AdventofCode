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
    let doList = [];
    let dontList = [];
    let enabled = true;
    let sum = 0;

    //find 'mul(' occurrences
    for (let i = 0; i < memory.length - 4; i++) {
        if (memory.slice(i, i + 4) === 'mul(') {
            mulList.push(i+4);
        }else if(memory.slice(i, i + 4) === 'do()') {
            doList.push(i+4);
        }else if(memory.slice(i, i + 7) === "don't()") {
            dontList.push(i+7);
        }
    }

    console.log(mulList);
    console.log(doList);
    console.log(dontList);

    for(let i = 0; i < memory.length; i++) {
        if(enabled){
            if(dontList.includes(i)) {
                enabled = false;
            }
        }else{
            if(doList.includes(i)) {
                enabled = true;
            }
        }

        
        if (mulList.includes(i)){
            if(enabled){
                for(let c = i; c< memory.length; c++) {
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
                        console.log("removing ", i, c);
                        mulList.splice(mulList.indexOf(i),1);
                        break;
                    }
                }
            }else{
                mulList.splice(mulList.indexOf(i),1);
            }
        }
    }

    console.log(mulList);
    console.log(mulEndList);

    //find the numbers in the mul( functions and multiply them
    for (let i = 0; i < mulList.length; i++) {
        let numbers = memory.slice(mulList[i], mulEndList[i]).split(',');
        if (numbers.length === 2) {
            sum += numbers[0] * numbers[1];
        }
    }

    console.log(sum);


});