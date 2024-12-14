const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    const puzzles = new Set();

    let puzzleArray = [];

    //3 tokens A, 1 token B

    for(let i = 0; i < lines.length; i ++){
        switch(i % 4){
            case 0:
            case 1:
                puzzleArray.push(lines[i].substring(12,14) + ';' + lines[i].substring(18,20));
                break;
            case 2:
                let endX = lines[i].split('=')[1].split(',')[0];
                let endY = lines[i].split('=')[2];

                puzzleArray.push(endX + ';' + endY);
                break;
            case 3:
                puzzles.add(puzzleArray);
                puzzleArray = [];
                break;
        }
        if(i === lines.length - 1){ puzzles.add(puzzleArray); }
    }
    // console.log(puzzles);

    for(let puzzle of puzzles){
        let [dxA, dyA] = puzzle[0].split(';').map(Number);
        let [dxB, dyB] = puzzle[1].split(';').map(Number);
        let [prizeX, prizeY] = puzzle[2].split(';').map(Number);
        
        prizeX += 10000000000000;
        prizeY += 10000000000000;

        let [mA, mB] = [dyA / dxA, dyB / dxB];
        let [pressesA, pressesB] = [0,0];

        if(Math.abs(mA - mB) < 0.000001){
            console.log('fix this');
        }

        let targetX = (prizeY - mB * prizeX) / (mA - mB);

        if(isEffectivelyInteger(targetX)){
            targetX = Math.round(targetX);
            pressesA = targetX / dxA;
            pressesB = (prizeX - targetX) / dxB;

            if (isEffectivelyInteger(pressesA)) {
                pressesA = Math.round(pressesA);
            }
            if (isEffectivelyInteger(pressesB)) {
                pressesB = Math.round(pressesB);
            }

            if(isEffectivelyInteger(pressesA) && isEffectivelyInteger(pressesB)){
                console.log(prizeX, targetX, pressesA, pressesB, dxA, dxB, pressesA * dxA + pressesB * dxB - prizeX, pressesA * dyA + pressesB * dyB - prizeY);
                sum += 3*pressesA + pressesB;
            }
        }
    }

    console.log(sum);


    function isEffectivelyInteger(value, epsilon = 1e-2) {
        const rounded = Math.round(value);
        return Math.abs(value - rounded) < epsilon;
    }
});