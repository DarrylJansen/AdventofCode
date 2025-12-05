const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    const rangesSet = new Set();
    const processedRanges = new Set();

    let processingRanges = true;

    //process data
    for(let line of lines){
        if(processingRanges){
            if(line === ''){
                processingRanges = false;
                continue;
            }
            let rangeNums = line.split('-').map(Number);
            rangesSet.add(rangeNums);
        }
    }

    //main flow
    for(let [rangeStart, rangeEnd] of rangesSet){
        for([processedMin, processedMax] of processedRanges){
            //check for collision between ranges
            if(rangeStart >= processedMin && rangeStart <= processedMax){
                rangeStart = processedMax + 1;
            }

            if(rangeEnd >= processedMin && rangeEnd <= processedMax){
                rangeEnd = processedMin - 1;
            }

            if(rangeStart < processedMin && rangeEnd > processedMax){
                rangesSet.add([processedMax + 1, rangeEnd]);
                rangeEnd = processedMin -1;
            }
        }

        if(rangeEnd >= rangeStart){
            sum += rangeEnd - rangeStart + 1;
            processedRanges.add([rangeStart, rangeEnd]);
        }
    }


    console.log(sum);
});