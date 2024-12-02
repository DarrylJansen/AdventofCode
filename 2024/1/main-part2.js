const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let col1 = [];
    let col2 = [];
    let counts = {};
    let sum = 0;

    //put numbers in arrays
    console.log("putting numbers in arrays");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split('  ');
        col1.push(parseInt(line[0]));
        col2.push(parseInt(line[1]));
    }

    //occurrences object for col2
    for (const num of col2) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    //check every col1 number for col2 occurrences
    for(const num of col1) {
        if(counts[num] > 0) {
            sum += counts[num] * num;
        }
        
    }
    console.log(sum);
    

});