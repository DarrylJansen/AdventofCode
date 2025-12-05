const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    const rangesSet = new Set();
    const foodSet = new Set();

    let processingRanges = true;

    //process data
    for(let line of lines){
        if(processingRanges){
            if(line === ''){
                processingRanges = false;
                continue;
            }
            let rangeNums = line.split('-').map(Number);
            rangeNums[1] -= rangeNums[0] - 1
            rangesSet.add(rangeNums);
        }else{
            foodSet.add(Number(line));
        }
    }

    for(let food of foodSet){
        for(let range of rangesSet){

            let [rangeStart, rangeLength] = range;
            // console.log('checking:', food, rangeStart, rangeLength);

            if(food >= rangeStart && food < rangeStart + rangeLength){
                sum++;
                break;
            }
            
        }
    }

    console.log(sum);


    // console.log(rangesSet);
    // console.log(foodSet);
});