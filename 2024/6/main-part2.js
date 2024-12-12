const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');

    const wallArray = [];
    const visitedArray = [];
    let guardCoords = [];
    let startCoords = [];
    let startDirection = 0;
    let direction = 0; //0 = right, 1 = down, 2 = left, 3 = up
    let sum = 0;
    let wallHistory = [];

    //setup
    for(let y = 0; y < lines.length; y++){
        for(let x = 0; x < lines[y].length; x++){
            switch(lines[y][x]){
                case '#':
                    wallArray.push([x, y]);
                    break;
                case 'v':
                    startDirection = 1;
                    startCoords = [x,y];
                    break;
                case '<':
                    startDirection = 2;
                    startCoords = [x,y];
                    break;
                case '^':
                    startDirection = 3;
                    startCoords = [x,y];
                    break;
                case '>':
                    startDirection = 0;
                    startCoords = [x,y];
                    break;
            }
        }
    }

    guardCoords[0] = startCoords[0];
    guardCoords[1] = startCoords[1];
    direction = startDirection;

    //first run, set visitedArray
    while(!checkOutOfBounds(guardCoords)){
        if(!checkVisited(guardCoords)){
            visitedArray.push(guardCoords);
        }
        
        let targetCoords = [];
        switch(direction){
            case 0: //right
                targetCoords = [guardCoords[0]+1, guardCoords[1]];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    if(checkLoop(targetCoords)){
                        break;
                    }
                    direction++;
                }
                break;
            case 1: //down
                targetCoords = [guardCoords[0], guardCoords[1]+1];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    if(checkLoop(targetCoords)){
                        break;
                    }
                    direction++;
                }
                break;
            case 2: //left
                targetCoords = [guardCoords[0]-1, guardCoords[1]];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    if(checkLoop(targetCoords)){
                        break;
                    }
                    direction++;
                }
                break;
            case 3: //up
                targetCoords = [guardCoords[0], guardCoords[1]-1];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    if(checkLoop(targetCoords)){
                        break;
                    }
                    direction=0;
                }
                break;
        }
    }


    let counter = 1;

    //obstacle runs
    for(spot of visitedArray){
        let newCourse = copyArray(wallArray);
        let isLooping = false;
        wallHistory = [];

        console.log(counter);
        counter++;

        resetGuard();

        if(arraysEqual(guardCoords, spot)){
            continue;
        }
        newCourse.push(spot);

        while(!checkOutOfBounds(guardCoords) && !isLooping){
            let targetCoords = [];
            switch(direction){
                case 0: //right
                    targetCoords = [guardCoords[0]+1, guardCoords[1]];
                    if(!checkWall(targetCoords, newCourse)){
                        guardCoords = targetCoords;
                    }else{
                        if(checkLoop(targetCoords)){
                            isLooping = true;
                            break;
                        }
                        direction++;
                    }
                    break;
                case 1: //down
                    targetCoords = [guardCoords[0], guardCoords[1]+1];
                    if(!checkWall(targetCoords, newCourse)){
                        guardCoords = targetCoords;
                    }else{
                        if(checkLoop(targetCoords)){
                            isLooping = true;
                            break;
                        }
                        direction++;
                    }
                    break;
                case 2: //left
                    targetCoords = [guardCoords[0]-1, guardCoords[1]];
                    if(!checkWall(targetCoords, newCourse)){
                        guardCoords = targetCoords;
                    }else{
                        if(checkLoop(targetCoords)){
                            isLooping = true;
                            break;
                        }
                        direction++;
                    }
                    break;
                case 3: //up
                    targetCoords = [guardCoords[0], guardCoords[1]-1];
                    if(!checkWall(targetCoords, newCourse)){
                        guardCoords = targetCoords;
                    }else{
                        if(checkLoop(targetCoords)){
                            isLooping = true;
                            break;
                        }
                        direction=0;
                    }
                    break;
            }
            if(isLooping){
                sum++;
                break;
            }
        }
    }

    console.log(sum);


    function checkOutOfBounds(coords){
        if(coords[0] < 0 || coords[0] >= lines[0].length || coords[1] < 0 || coords[1] >= lines.length  ){
            return true;
        }else{
            return false;
        }
    }

    function checkVisited(coords){
        for(coord of visitedArray){
            if(arraysEqual(coord,coords)){
                return true;
            }
        }
        return false;
    }

    function checkWall(coords, walls = wallArray){
        for(wall of walls){
            if(arraysEqual(wall, coords)){
                return true;
            }
        }
        return false;
    }

    function checkLoop(coords){
        wallHistory.push(coords);
        let checkValue = wallHistory.length - 1;

        for(let i = 1; checkValue - 4*i >= 0; i++){
            if(arraysEqual(wallHistory[checkValue], wallHistory[checkValue - 4*i])){
                return true;
            }
        }
        return false;
    }

    function resetGuard(){
        guardCoords[0] = startCoords[0];
        guardCoords[1] = startCoords[1];
        direction = startDirection;
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function copyArray(arr) {
        return [...arr];
    }

    // console.log(visitedArray);


});