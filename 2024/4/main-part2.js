const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const dataArray = data.toString().split('\n');
    const arrayWidth = dataArray[0].length;
    const arrayHeight = dataArray.length;
    
    let sum = 0;

    for (let i = 0; i < arrayHeight; i++) {
        for (let j = 0; j < arrayWidth; j++) {
            if (dataArray[i][j] === 'M') {
                checkMAS(dataArray, i, j);
            }
        }
    }

    function checkMAS(dataArray, i, j) {
        /*
            VARIANT 1
           >M * M
            * A *
            S * S
        */
        if((i + 2 < arrayHeight) && (j + 2 < arrayWidth)){
            if(dataArray[i + 2][j] === 'S' && dataArray[i][j + 2] == 'M' && dataArray[i + 1][j + 1] == 'A' && dataArray[i + 2][j + 2] == 'S'){
                sum++;
            }
        }

        /*
            VARIANT 2
           >M * S
            * A *
            M * S
        */
        if((i + 2 < arrayHeight) && (j + 2 < arrayWidth)){
            if(dataArray[i + 2][j] === 'M' && dataArray[i][j + 2] == 'S' && dataArray[i + 1][j + 1] == 'A' && dataArray[i + 2][j + 2] == 'S'){
                sum++;
            }
        }

        /*
            VARIANT 3
            S *>M
            * A *
            S * M
        */
        if((i + 2 < arrayHeight) && (j - 2 >= 0)){
            if(dataArray[i + 2][j] === 'M' && dataArray[i][j - 2] == 'S' && dataArray[i + 1][j - 1] == 'A' && dataArray[i + 2][j - 2] == 'S'){
                sum++;
            }
        }

        /*
            VARIANT 4
            S * S
            * A *
           >M * M
        */
        if((i - 2 >= 0) && (j + 2 < arrayWidth)){
            if(dataArray[i - 2][j] === 'S' && dataArray[i][j + 2] == 'M' && dataArray[i - 1][j + 1] == 'A' && dataArray[i - 2][j + 2] == 'S'){
                sum++;
            }
        }
    }

    console.log(sum);
});