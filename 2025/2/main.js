const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split(',');
    let sum = 0;

    for(let line=0; line<lines.length; line++){
        let [min,max] = lines[line].split('-').map(Number);
        console.log('checking:',min,max);
        for(let i=min; i<=max; i++){
            let str = i.toString();
            let len = str.length;

            //check number of chars
            if(len % 2 === 1){ continue; }

            let leftPart = str.slice(0,len/2);
            let rightPart = str.slice(len/2);

            // console.log(leftPart,rightPart);

            if(leftPart === rightPart){
                console.log('invalid ID:',i, ' | range:', min,max);
                sum += i;
            }
        }
    }
    console.log(sum);


});