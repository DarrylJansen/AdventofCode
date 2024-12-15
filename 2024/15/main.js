const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    
    const wallSet = new Set();
    const boxSet = new Set();

    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    let robotPosition;
    let sum = 0;

    for(let y = 0; y < lines.length; y++){
        if(lines[y][0] === '#'){
            for(let x = 0; x < lines[y].length; x++){
                switch(lines[y][x]){
                    case '#':
                        wallSet.add(`${x};${y}`);
                        break;
                    case 'O':
                        boxSet.add(`${x};${y}`);
                        break;
                    case '@':
                        robotPosition = `${x};${y}`;
                        break;
                }
            }
            continue;
        }

        for(let x = 0; x < lines[y].length; x++){
            switch(lines[y][x]){
                case '>':
                    moveRobot(0);
                    break;
                case 'v':
                    moveRobot(1);
                    break;
                case '<':
                    moveRobot(2);
                    break;
                case '^':
                    moveRobot(3);
                    break;
            }
        }
    }


    //gps sum
    for(box of boxSet){
        let [boxX, boxY] = box.split(';').map(Number);
        sum += 100*boxY + boxX;
    }

    console.log(sum);
    // console.table(wallSet);
    // console.table(boxSet);


    function moveRobot(direction){
        let [robotX, robotY] = robotPosition.split(';').map(Number);

        let targetX = robotX + dxdy[direction][0];
        let targetY = robotY + dxdy[direction][1];

        let targetCoord = `${targetX};${targetY}`;

        if(wallSet.has(targetCoord)){ return false; }

        if(boxSet.has(targetCoord)){
            if(moveBox(targetCoord, direction)){
                // console.log('robot moved to',targetCoord);

                robotPosition = targetCoord;
                return true;
            }else{
                return false;
            }
        }
        // console.log('robot moved to',targetCoord);
        robotPosition = targetCoord;
        return true;
    }

    function moveBox(coord, direction){
        let [boxX, boxY] = coord.split(';').map(Number);

        let targetX = boxX + dxdy[direction][0];
        let targetY = boxY + dxdy[direction][1];

        let targetCoord = `${targetX};${targetY}`;

        if(wallSet.has(targetCoord)){ return false; }

        if(boxSet.has(targetCoord)){
            if(moveBox(targetCoord, direction)){
                
                boxSet.delete(coord);
                boxSet.add(targetCoord);
                // console.log('box moved from', coord, 'to', targetCoord);
                return true;
            }else{
                return false;
            }
        }
        // console.log('box moved from', coord, 'to', targetCoord);

        boxSet.delete(coord);
        boxSet.add(targetCoord);

        return true;
    }

});