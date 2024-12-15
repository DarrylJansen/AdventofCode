const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    
    const wallSet = new Set();
    const boxSet = new Set();
    const pushSet = new Set();

    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    let robotPosition;
    let sum = 0;

    for(let y = 0; y < lines.length; y++){
        if(lines[y][0] === '#'){
            for(let x = 0; x < lines[y].length; x++){
                switch(lines[y][x]){
                    case '#':
                        wallSet.add(`${2*x};${y}`);
                        wallSet.add(`${2*x+1};${y}`);
                        break;
                    case 'O':
                        boxSet.add(
                            {
                                left: `${2*x};${y}`,
                                right: `${2*x+1};${y}`
                            }
                        );
                        break;
                    case '@':
                        robotPosition = `${2*x};${y}`;
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

    console.table(boxSet);

    // gps sum
    for(boxObject of boxSet){
        let box = boxObject.left;
        let [boxX, boxY] = box.split(',')[0].split(';').map(Number);
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

        for(let box of boxSet){
            if(box.left === targetCoord || box.right === targetCoord){
                if(moveBox(box, direction)){
                    console.log('robot moved push to',targetCoord);
                    robotPosition = targetCoord;
                    return true;
                }else{
                    return false;
                }
            }
        }
        console.log('robot moved nopush to',targetCoord)
        robotPosition = targetCoord;
        return true;
    }

    function moveBox(box, direction){
        let isPushable = true;

        if(!checkPushable(box, direction)){
            isPushable = false;
        };
        
        if(isPushable){
            //push boxes in pushset and reset the set
            for(box of pushSet){
                let [boxLeftX, boxLeftY] = box.left.split(';').map(Number);
                let [boxRightX, boxRightY] = box.right.split(';').map(Number);

                box.left = `${boxLeftX+dxdy[direction][0]};${boxLeftY+dxdy[direction][1]}`;
                box.right = `${boxRightX+dxdy[direction][0]};${boxRightY+dxdy[direction][1]}`;
            }
            pushSet.clear();
            return true;
        }else{
            return false;
        }




    }

    function checkPushable(box, direction){
        let targetCoords = [];
        let [boxLeftX, boxLeftY] = box.left.split(';').map(Number);
        let [boxRightX, boxRightY] = box.right.split(';').map(Number);

        switch(direction){
            case 0:
                targetCoords.push(`${boxRightX + 1};${boxRightY}`);
                break;
            case 1:
                targetCoords.push(`${boxLeftX};${boxLeftY+1}`);
                targetCoords.push(`${boxRightX};${boxRightY+1}`);
                break;
            case 2:
                targetCoords.push(`${boxLeftX -1};${boxRightY}`);
                break;
            case 3:
                targetCoords.push(`${boxLeftX};${boxLeftY-1}`);
                targetCoords.push(`${boxRightX};${boxRightY-1}`);
                break;
        }

        let isPushable = true;
        for(coord of targetCoords){
            if(wallSet.has(coord)){ 
                console.log('NONPUSHABLE', coord)
                isPushable = false;
                continue;
            }
            for(let newBox of boxSet){
                if((newBox.left === coord || newBox.right === coord) && isPushable){
                    if(!checkPushable(newBox, direction)){
                        isPushable = false;
                    }
                }
            }
        }
        if(isPushable){
            pushSet.add(box)
            return true;
        }else{
            pushSet.clear();
            return false;
        }


    }
});