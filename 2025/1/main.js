const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let dial = 50;
    let zeroes = 0;

    for(let i=0; i<lines.length;i++){
        let [command, amount] = [lines[i][0], Number(lines[i].slice(1))];
        if(command === 'L'){amount*=-1;}

        dial += amount;

        dial %= 100;
        if(dial < 0){
            dial += 100;
        }
        if(dial === 0){
            zeroes++;
        }
    }
    console.log(zeroes);


});