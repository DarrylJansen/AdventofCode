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
        if(c % 2 == 0){
            //even
            fileArray.push(Number(diskMap[c]));
            blockSize += Number(diskMap[c]);
        }else{
            //uneven
            gapArray.push(Number(diskMap[c]));
        }
    }
    
    let blockIndex = 0;
    mainloop:{
        for(let i = 0; i < fileArray.length; i++){
            for(let j = 0; j < fileArray[i]; j++){
                checkSum += blockIndex * i;
                console.log(blockIndex,' * ', i);
                blockIndex ++;
            }

            for(let j = 0; j < gapArray[i]; j++){
                if(getLastFile(blockIndex)){
                    blockIndex++;
                }else{
                    break mainloop;
                }
                
            }
        }
    }


    console.log(checkSum);

    function getLastFile(i){
        if(i < blockSize){
            checkSum += i * (fileArray.length - 1);
            console.log(i,' ** ', (fileArray.length - 1));
            fileArray[fileArray.length - 1] -= 1;

            if(fileArray[fileArray.length - 1] === 0){
                // console.log('pop');
                fileArray.pop();
            }

            return true;
        }else{
            
            return false;
        }


    }
});