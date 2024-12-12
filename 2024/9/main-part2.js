const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const diskMap = data.toString();
    const diskMapLength = diskMap.length;
    
    const fileArray = [];
    const gapArray = [];
    
    let checkSum = 0;
    let blockSize = 0; //amount of non '.' values

    for(let c = 0; c < diskMapLength; c++){
        let num = Number(diskMap[c]);

        if(c % 2 == 0){
            //even
            if(num === 0){
                num --;
            }
            fileArray.push(num);
            blockSize += num;
        }else{
            //uneven
            gapArray.push(num);
        }
    }
    console.log(fileArray, gapArray);
    const startFileArray = structuredClone(fileArray);
    let blockIndex = 0;
    let blockIndexMin = 0;

    mainloop:{
        for(let i = 0; i < fileArray.length; i++){
            while(fileArray[i] > 0){
                checkSum += blockIndex * i;
                fileArray[i] -= 1;
                console.log(blockIndex,' * ', i);
                blockIndex ++;
            }
            while(fileArray[i] < 0){
                console.log(blockIndex,' ----');
                blockIndex++;
                fileArray[i] += 1;
            }
            let gapAmount = gapArray[i];
            for(let j = 0; j < gapAmount; j++){
                
                subloop:{
                    // console.log('subloop started');
                    for(let k = fileArray.length -1; k >= 0; k--){
                        while(fileArray[k] <= gapArray[i] && fileArray[k] > 0){
                            // console.log(k);
                            let lastfileState = getLastFile(blockIndex, i, k, j);
                            
                            if(lastfileState === '2'){
                                blockIndex++;
                                break subloop;
                            }else if(lastfileState === '1'){
                                j++;
                                blockIndex++;
                            }else{
                                break mainloop;
                            }
                        }
                    }
                    console.log(blockIndex,' ----');
                    blockIndex++;
                }
            }
        }
    }


    console.log(checkSum);

    function getLastFile(i, gapIndex, k, j){
        // if(i < blockSize){
            checkSum += i * k;
            console.log(i,' ** ', k);
            fileArray[k] -= 1;
            gapArray[gapIndex] -= 1;

            if(fileArray[k] === 0){
                fileArray[k] = (-1)*startFileArray[k];
                return '2';
            }

            return '1';
        // }else{
            
        //     return '0';
        // }


    }
});