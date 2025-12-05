const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');

    let sum = 0;
    
    //163985968353813 too low
    //105369509710937 too low
    //105369509710937
    //105055470429838
    //159756040349004
    //171388730430281

    //xxxxxxxxxxxxooo
    //818181911112111
    //xoxxxxxxxxxxxoo

    for(let battery of lines){
        // console.log(battery);
        let pointers = [0,1,2,3,4,5,6,7,8,9,10,11];
        let max = 0;
        

        for(let i=0; i<12; i++){
            console.log('i:',i);

            let maxMove = battery.length - (12-i) - pointers[i];
            let maxInt = battery[pointers[i]];
            let move = 0;
            console.log('pointers[i]', pointers[i]);
            console.log('maxmove:',maxMove);
            console.log('maxint:', maxInt);
            for(let k=1; k<=maxMove; k++){
                console.log('checking:',pointers[i],k,battery[pointers[i]+k])
                if(battery[pointers[i]+k] > maxInt){
                    maxInt = battery[pointers[i]+k];
                    move = k;
                }
            }
            console.log('move:', move);
            for(let j=i; j<12; j++){
                pointers[j] += move;
            }
        }

        let numStr = '';
        for(let pointer of pointers){
            numStr += battery[pointer];
        }
        console.log(numStr);
        sum += Number(numStr);
        console.log('---');
    }
    console.log('---');
    console.log('---');
    console.log(sum);

});