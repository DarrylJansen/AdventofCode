const fs = require('fs');
const { start } = require('repl');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const maze = data.toString().split('\n');
    const mazeCopy = structuredClone(maze);
    const mazeCopyCopy = structuredClone(maze);
    const mazeValues = new Map();

    const width = maze[0].length;
    const height = maze.length;
    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    const startCoord = `1;${height - 2}`
    const endCoord = `${width - 2};1`
    const startDirection = 0;

    let sum = 2;

    mazeValues.set(startCoord, 0);
    maze[height - 2] = maze[height - 2].substring(0, 1) + 'X' + maze[height - 2].substring(2);

    walk(startCoord, startDirection, 0);

    const endValue = mazeValues.get(endCoord);
    console.log(endValue);
    mazeValues.clear();

    secondRun(startCoord, startDirection, 0);

    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            if(mazeCopyCopy[y][x] === '+'){
                sum++;
            }
            if(mazeCopyCopy[y][x] === '+'){
                mazeCopyCopy[y] = mazeCopyCopy[y].substring(0,x)+'█'+mazeCopyCopy[y].substring(x+1);
            }
        }
    }

    console.table(mazeCopyCopy);
    
    console.log(sum);

    function walk(coord, dir, curValue){

        let [curX, curY] = coord.split(';').map(Number);
        let openPaths = new Set();

        let deadEnd = true;
        for(let direction = 0; direction < 4; direction ++){
            let targetX = curX + dxdy[direction][0];
            let targetY = curY + dxdy[direction][1];
            let targetCoord = `${targetX};${targetY}`;

            let diff = 1;
            if(direction !== dir) { diff = 1001; }

            if(maze[targetY][targetX] === '.' || maze[targetY][targetX] === 'E' ){

                maze[targetY] = maze[targetY].substring(0, targetX) + 'X' + maze[targetY].substring(targetX + 1);
                openPaths.add({
                    coord: `${targetX};${targetY}`,
                    directionChange: !(direction === dir),
                    direction: direction,
                    diff: diff
                })
                deadEnd = false;

            }else if(maze[targetY][targetX] === 'X'){

                let targetValue = mazeValues.has(targetCoord) ? mazeValues.get(targetCoord) : 999999999999;
                
                if(targetValue > curValue + diff){
                    openPaths.add({
                        coord: `${targetX};${targetY}`,
                        directionChange: (direction === dir),
                        direction: direction,
                        diff: diff
                    })
                    deadEnd = false;
                }
                
            }
        }
        if(deadEnd){return false;}

        for(let path of openPaths){
            mazeValues.set(path.coord, curValue + path.diff);
            walk(path.coord, path.direction, curValue + path.diff);
        }
    }

    function secondRun(coord, dir, curValue){

        let [curX, curY] = coord.split(';').map(Number);
        let openPaths = new Set();

        let deadEnd = true;
        let returnValue = false;

        for(let direction = 0; direction < 4; direction ++){
            let targetX = curX + dxdy[direction][0];
            let targetY = curY + dxdy[direction][1];
            let targetCoord = `${targetX};${targetY}`;

            let diff = 1;
            if(direction !== dir) { diff = 1001; }

            if(mazeCopy[targetY][targetX] === 'E'){
                if(curValue + diff === endValue){
                    return true;
                }else{
                    return false;
                }
            }

            if(mazeCopy[targetY][targetX] === '+'){
                if(curValue + diff === mazeValues.get(targetCoord)){
                    return true;
                }

                for(let newDirection = 0; newDirection < 4; newDirection++){
                    let nextX = targetX + dxdy[newDirection][0];
                    let nextY = targetY + dxdy[newDirection][1];
                    let nextCoord = `${nextX};${nextY}`;

                    if(mazeCopy[nextY][nextX] === '+'){
                        if(curValue + 1002 === mazeValues.get(nextCoord)){
                            return true;
                        }
    
                        if(curValue + 2 === mazeValues.get(nextCoord)){
                            return true;
                        }
    
                        // if(curValue + 2002 === mazeValues.get(nextCoord)){
                        //     return true;
                        // }
                    }


                }
            }else if(mazeCopy[targetY][targetX] === '.'){
                
                mazeCopy[targetY] = mazeCopy[targetY].substring(0, targetX) + 'X' + mazeCopy[targetY].substring(targetX + 1);
                
                openPaths.add({
                    coord: `${targetX};${targetY}`,
                    directionChange: !(direction === dir),
                    direction: direction,
                    diff: diff
                })
                deadEnd = false;

            }else if(mazeCopy[targetY][targetX] === 'X' ){

                let targetValue = mazeValues.has(targetCoord) ? mazeValues.get(targetCoord) : 999999999999;
                
                if(targetValue > curValue + diff - 1001){
                    openPaths.add({
                        coord: `${targetX};${targetY}`,
                        directionChange: (direction === dir),
                        direction: direction,
                        diff: diff
                    })
                    deadEnd = false;
                }
                
            }
        }
        if(deadEnd){return false;}


        
        for(let path of openPaths){
            mazeValues.set(path.coord, curValue + path.diff);
            let [coordX, coordY] = path.coord.split(';').map(Number);
            
            if(secondRun(path.coord, path.direction, curValue + path.diff)){
                mazeCopyCopy[coordY] = mazeCopyCopy[coordY].substring(0, coordX) + '+' + mazeCopyCopy[coordY].substring(coordX + 1);
                mazeCopy[coordY] = mazeCopy[coordY].substring(0, coordX) + '.' + mazeCopy[coordY].substring(coordX + 1);
                
                returnValue = true;
            }
        }
        if(returnValue){
            mazeValues.delete(coord);
        }
        return returnValue;
    }
});