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
        if(command === 'L'){
            amount*=-1;
            if(dial === 0){zeroes--;}
        }
        
        dial += amount;
        while(dial < 0){
            dial += 100;
            zeroes++;
        }
        
        if(dial === 0){zeroes++;}
        zeroes += Math.floor(dial/100);
        dial %= 100;

        console.log(dial,zeroes);

    }
    console.log(zeroes);


});