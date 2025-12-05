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
    const goodSet = new Set();

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
            // console.log('checking:',rangeStart,rangeEnd,processedMin,processedMax);
            // || (rangeEnd >= processedMin && rangeEnd <= processedMax)
            if(rangeStart >= processedMin && rangeStart <= processedMax){
                // console.log('collision (start) between:',rangeStart,rangeEnd,processedMin,processedMax);
                rangeStart = processedMax + 1;
            }

            if(rangeEnd >= processedMin && rangeEnd <= processedMax){
                // console.log('collision (end) between:',rangeStart,rangeEnd,processedMin,processedMax);
                rangeEnd = processedMin - 1;
            }

            if(rangeStart < processedMin && rangeEnd > processedMax){
                rangesSet.add([processedMax + 1, rangeEnd]);
                rangeEnd = processedMin -1;
            }

            
        }

        if(rangeEnd >= rangeStart){
            // console.log('adding:',rangeStart,rangeEnd);
            sum += rangeEnd - rangeStart + 1;
            processedRanges.add([rangeStart, rangeEnd]);
        }
    }


    // console.log(processedRanges);
    console.log(sum);
    // console.log(foodSet);
});


//349485103963315 too high
//345821388687084