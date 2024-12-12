const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    let endA = 1176;
    let endB = 1373;

    // endA = 21;
    // endB = 28;

    let orderMap = new Map();

    for(let i = 0; i < endA; i++ ){
        let lineValues = lines[i].split('|');
        
        if(orderMap.has(lineValues[0])){
            orderMap.set(orderMap.get(lineValues[0]).push(lineValues[1]));
        }else{
            orderMap.set(lineValues[0], [lineValues[1]]);
        }
    }

    for(let i = endA + 1; i < endB; i++){
        
        let update = lines[i].split(',');
        let valid = true;

        for(let j = update.length - 1; j >= 1; j--){
            for(let k = j - 1; k >= 0; k--){
                if(orderMap.has(update[j])){
                    if(orderMap.get(update[j]).includes(update[k])){
                        valid = false;
                        // console.log(update);
                        break;
                    }
                }
            }
            if(!valid){
                console.log(update);
                orderUpdate(update);
                break;
            }
        }
    }

    console.log(sum);

    function orderUpdate(update){
        for(let j = update.length - 1; j >= 1; j--){
            for(let k = j - 1; k >= 0; k--){
                if(orderMap.has(update[j])){
                    if(orderMap.get(update[j]).includes(update[k])){
                        //switch values and reset j and k

                        let tempValue = update[j];
                        update[j] = update[k];
                        update[k] = tempValue;

                        j = update.length;
                        break;
                    }
                }
            }
        }

        sum += Number(update[Math.floor(update.length / 2)]);
    }
});