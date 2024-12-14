const fs = require('fs');

fs.readFile('testinput.txt', (err, data) => {
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

    for(puzzle of puzzles){
        let [dxA, dyA] = puzzle[0].split(';').map(Number);
        let [dxB, dyB] = puzzle[1].split(';').map(Number);
        let [prizeX, prizeY] = puzzle[2].split(';').map(Number);
        let [curX, curY] = [0,0];
        let [pressesA, pressesB] = [0,0];

        let distA = Math.sqrt(dxA * dxA + dyA * dyA);
        let distB = Math.sqrt(dxB * dxB + dyB * dyB);

        let valid = false;

        for(let i = 0; ; i++){
            // console.log(curX, curY, pressesA, pressesB);
            if((prizeX - curX) % dxB === 0 && (prizeY - curY) % dyB === 0){
                if((prizeX - curX) / dxB === (prizeY - curY) / dyB){
                    pressesB += (prizeX - curX) / dxB;
                    valid = true;
                    break;
                }
            }
            pressesA++;
            curX += dxA;
            curY += dyA;

            if(curX === prizeX && curY === prizeY){
                valid = true;
                break;
            }

            if(curX > prizeX || curY > prizeY){
                break;
            }
        }

        if(valid){
            console.log(puzzle, pressesA, pressesB);
            sum += 3*pressesA + pressesB;
        }else{
            console.log(puzzle, '- INVALID');
        }
    }

    console.log(sum);

});