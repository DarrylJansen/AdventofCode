const fs = require('fs');
const { start } = require('repl');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const maze = data.toString().split('\n');
    const mazeValues = new Map();
    const width = maze[0].length;
    const height = maze.length;
    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    const startCoord = `1;${height - 2}`
    const endCoord = `${width - 2};1`
    const startDirection = 0;

    let sum = 0;

    mazeValues.set(startCoord, 0);
    maze[height - 2] = maze[height - 2].substring(0, 1) + 'X' + maze[height - 2].substring(2);

    walk(startCoord, startDirection, 0);

    // console.table(maze);
    console.log(mazeValues.get(endCoord));
    // console.log(mazeValues);
    // console.log(mazeValues.get("3;13")); //correct
    // console.log(mazeValues.get("1;10"));
    // console.log(mazeValues.get("2;9"));


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
});