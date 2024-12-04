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
            if (dataArray[i][j] === 'X') {
                checkXMAS(dataArray, i, j);
            }
        }
    }

    function checkXMAS(dataArray, i, j) {
        //right
        if (j + 3 < arrayWidth) {
            if (dataArray[i][j + 1] === 'M' && dataArray[i][j + 2] === 'A' && dataArray[i][j + 3] === 'S') {
                sum++;
            }
        }
        //downright
        if (i + 3 < arrayHeight && j + 3 < arrayWidth) {
            if (dataArray[i + 1][j + 1] === 'M' && dataArray[i + 2][j + 2] === 'A' && dataArray[i + 3][j + 3] === 'S') {
                sum++;
            }
        }
        //down
        if (i + 3 < arrayHeight) {
            if (dataArray[i + 1][j] === 'M' && dataArray[i + 2][j] === 'A' && dataArray[i + 3][j] === 'S') {
                sum++;
            }
        }
        //downleft
        if (i + 3 < arrayHeight && j - 3 >= 0) {
            if (dataArray[i + 1][j - 1] === 'M' && dataArray[i + 2][j - 2] === 'A' && dataArray[i + 3][j - 3] === 'S') {
                sum++;
            }
        }
        //left
        if (j - 3 >= 0) {
            if (dataArray[i][j - 1] === 'M' && dataArray[i][j - 2] === 'A' && dataArray[i][j - 3] === 'S') {
                sum++;
            }
        }
        //upleft
        if (i - 3 >= 0 && j - 3 >= 0) {
            if (dataArray[i - 1][j - 1] === 'M' && dataArray[i - 2][j - 2] === 'A' && dataArray[i - 3][j - 3] === 'S') {
                sum++;
            }
        }
        //up
        if (i - 3 >= 0) {
            if (dataArray[i - 1][j] === 'M' && dataArray[i - 2][j] === 'A' && dataArray[i - 3][j] === 'S') {
                sum++;
            }
        }
        //upright
        if (i - 3 >= 0 && j + 3 < arrayWidth) {
            if (dataArray[i - 1][j + 1] === 'M' && dataArray[i - 2][j + 2] === 'A' && dataArray[i - 3][j + 3] === 'S') {
                sum++;
            }
        }
    }

    console.log(sum);
});