const fs = require('fs');
const { start } = require('repl');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    const dataHeight = lines.length;
    const dataWidth = lines[0].length;

    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    const startPositions = [];
    const trailList = new Set();

    for(let y = 0; y < dataHeight; y++) {
        for(let x = 0; x < dataWidth; x++){
            if(lines[y][x] === '0'){
                startPositions.push({x:x,y:y})
            }

        }
    }
    // console.log(trailheadList);
    for(let i = 0; i < startPositions.length; i++){
        let start = startPositions[i];
        let index = 0;
        findNeighbor(start, start, index);
    }
    console.log(sum);



    function findNeighbor(startCoord, currentCoord, index){
        // console.log('findNeighbor:',start,index);
        for(let dir = 0; dir < 4; dir++){
            let checkingCoord = {x: (currentCoord.x + dxdy[dir][0]), y: (currentCoord.y + dxdy[dir][1])};
            
            if(checkingCoord.x < 0 || checkingCoord.x >= dataWidth || checkingCoord.y < 0 || checkingCoord.y >= dataHeight){
                continue;
            }else if(Number(lines[checkingCoord.y][checkingCoord.x]) === index + 1){
                
                if(index === 8){
                    sum++;
                    continue;
                }else{
                    findNeighbor(startCoord, checkingCoord, index + 1);
                }
            }
            
        }
    }
});