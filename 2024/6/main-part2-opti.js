const fs = require('fs');

fs.readFile('testinput.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.time('Total Execution');
    console.time('Setup');
    const lines = data.toString().split('\n');

    const wallSet = new Set();
    const visitedSet = new Set();
    const infiniteSet = new Set();

    let guardCoords = "0,0";

    let startCoords = "0,0";
    let startDirection = 0;

    let arrayHeight = lines.length;
    let arrayWidth = lines[0].length;
    
    let direction = 0; //0 = right, 1 = down, 2 = left, 3 = up
    let dxdy = [[1,0],[0,1],[-1,0],[0,-1]];
    let sum = 0;

    let wallHistory = [];
    
    //setup
    for(let y = 0; y < arrayHeight; y++){
        for(let x = 0; x < arrayWidth; x++){
            let coordString = x.toString()+','+y.toString();
            switch(lines[y][x]){
                case '#':
                    wallSet.add(coordString);
                    break;
                case 'v':
                    startDirection = 1;
                    startCoords = coordString;
                    break;
                case '<':
                    startDirection = 2;
                    startCoords = coordString;
                    break;
                case '^':
                    startDirection = 3;
                    startCoords = coordString;
                    break;
                case '>':
                    startDirection = 0;
                    startCoords = coordString;
                    break;
            }
        }
    }

    resetGuard();

    //first run, set visitedSet
    while(!checkOutOfBounds(guardCoords)){
        visitedSet.add(guardCoords);
        
        let targetCoords = "0,0";
        let coordsArray = guardCoords.split(',').map(Number);

        let dx = dxdy[direction][0];
        let dy = dxdy[direction][1];

        targetCoords = (coordsArray[0] + dx) + ',' + (coordsArray[1] + dy);
        if(!wallSet.has(targetCoords)){
            guardCoords = targetCoords;
        }else{
            direction++;
            direction=direction%4;
        }
    }
    console.timeEnd('Setup');
    console.time('Obstacle Runs');
    //obstacle runs
    for(const spot of visitedSet){
        
        let isLooping = false;
        wallHistory = [];

        resetGuard();

        if(guardCoords == spot){
            continue;
        }
        wallSet.add(spot);
        let targetCoords = "0,0";
        while(!checkOutOfBounds(guardCoords) && !isLooping){
            
            let coordsArray = guardCoords.split(',').map(Number);
    
            let dx = dxdy[direction][0];
            let dy = dxdy[direction][1];
    
            targetCoords = (coordsArray[0] + dx) + ',' + (coordsArray[1] + dy);
    
            if(!wallSet.has(targetCoords)){
                guardCoords = targetCoords;
                continue;
            }else{
                if(checkLoop(targetCoords)){
                    isLooping = true;
                    wallSet.delete(spot);
                }
                direction++;
                direction=direction%4;
            }

            if(isLooping){
                sum++;
                infiniteSet.add(spot);
                wallSet.delete(spot);
                break;
            }
        }
        wallSet.delete(spot);
    }
    console.timeEnd('Obstacle Runs');
    console.timeEnd('Total Execution');

    console.log(sum);
    console.log(infiniteSet);


    function checkOutOfBounds(coords){
        let positions = coords.split(',').map(Number);
        if(positions[0] < 0 || positions[0] >= arrayWidth || positions[1] < 0 || positions[1] >= arrayHeight  ){
            return true;
        }else{
            return false;
        }
    }

    function checkLoop(coords){
        wallHistory.push(coords);
        let checkValue = wallHistory.length - 1;

        for(let i = 1; checkValue - 4*i >= 0; i++){
            if(wallHistory[checkValue] == wallHistory[checkValue - 4*i]){
                return true;
            }
        }
        return false;
    }

    function resetGuard(){
        guardCoords = startCoords;
        direction = startDirection;
    }

});
