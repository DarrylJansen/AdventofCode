const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let col1 = [];
    let col2 = [];
    let sum = 0;

    //put numbers in arrays
    console.log("putting numbers in arrays");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split('  ');
        col1.push(parseInt(line[0]));
        col2.push(parseInt(line[1]));
    }

    //sort arrays
    console.log("sorting arrays");
    col1.sort((a, b) => a - b);
    col2.sort((a, b) => a - b);

    //sum of the differences
    console.log("sum of the differences");
    for (let i = 0; i < col1.length; i++) {
        console.log(col1[i], col2[i]);
        sum += Math.abs(col1[i] - col2[i]);
    }

    console.log(sum);
    

});