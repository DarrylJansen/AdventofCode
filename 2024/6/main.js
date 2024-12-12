const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    const wallArray = [];
    const visitedArray = [];
    let guardCoords = [];
    let direction = 0; //0 = right, 1 = down, 2 = left, 3 = up

    //setup
    for(let y = 0; y < lines.length; y++){
        for(let x = 0; x < lines[y].length; x++){
            switch(lines[y][x]){
                case '#':
                    wallArray.push([x, y]);
                    break;
                case 'v':
                    direction = 1;
                    guardCoords = [x,y];
                    break;
                case '<':
                    direction = 2;
                    guardCoords = [x,y];
                    break;
                case '^':
                    direction = 3;
                    guardCoords = [x,y];
                    break;
                case '>':
                    direction = 0;
                    guardCoords = [x,y];
                    break;
            }
        }
    }

    
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
                    direction++;
                }
                break;
            case 1: //down
                targetCoords = [guardCoords[0], guardCoords[1]+1];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    direction++;
                }
                break;
            case 2: //left
                targetCoords = [guardCoords[0]-1, guardCoords[1]];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    direction++;
                }
                break;
            case 3: //up
                targetCoords = [guardCoords[0], guardCoords[1]-1];
                if(!checkWall(targetCoords)){
                    guardCoords = targetCoords;
                }else{
                    direction=0;
                }
                break;
        }
    }

    console.log(visitedArray.length);


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

    function checkWall(coords){
        for(wall of wallArray){
            if(arraysEqual(wall, coords)){
                return true;
            }
        }
        return false;
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

    // console.log(visitedArray);


});