const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    const dxdy = [[1,0],[0,1],[-1,0],[0,-1]];

    let sum = 0;

    const checkedCoords = new Set();
    
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[0].length; x++) {
            let coord = x+';'+y;

            if(checkedCoords.has(coord)){
                continue;
            }
            const fenceMap = new Map();
            check(coord, fenceMap);
            // console.log(fenceMap);
            sum += countSides(fenceMap) * fenceMap.size;
            // console.log(fenceMap.size, sides);
            // sum += checkArray[0]*checkArray[1];
        }
    }
    console.log(sum);


    function check(coord, fenceMap){
        checkedCoords.add(coord);
        let fenceArray = [0,0,0,0];

        let coordX=Number(coord.split(';')[0]);
        let coordY=Number(coord.split(';')[1]);
        let currentChar = lines[coordY][coordX];

        for(let dir = 0; dir < 4; dir++){
            let checkX = coordX + dxdy[dir][0];
            let checkY = coordY + dxdy[dir][1];
            if(outOfBounds(checkX, checkY)){
                // console.log('out of bounds:',checkX,checkY);
                fenceArray[dir]++;
            }else if(checkedCoords.has(checkX+';'+checkY) && (lines[checkY][checkX] === currentChar)){
                continue;
            }else if(checkedCoords.has(checkX+';'+checkY)){
                fenceArray[dir]++;
                continue;
            }else if(lines[checkY][checkX] === currentChar){
                check(checkX+';'+checkY, fenceMap);

            }else{
                // console.log('other char',checkX, checkY);
                fenceArray[dir]++;
            }
        }
        fenceMap.set(coord, fenceArray);
    }

    function outOfBounds(x, y){
        return (x<0 || y<0 || x>=lines[0].length || y >=lines.length);
    }

    function countSides(fenceMap){
        let sides = 0;
        for(let [coord, fenceArray] of fenceMap){
            for(let dir = 0; dir < 4; dir++){
            
                let coordX=Number(coord.split(';')[0]);
                let coordY=Number(coord.split(';')[1]);

                if(fenceArray[dir] === 1){
                    sides++;
                    // console.log('sides+:', coord, dir);
                    fenceArray[dir] = 0;

                    for(let i = 1; i > 0; i++){
                        let newCoordX = coordX + dxdy[(dir+1) % 4][0] * i;
                        let newCoordY = coordY + dxdy[(dir+1) % 4][1] * i;
                        let newCoordString = newCoordX+';'+newCoordY;
                        if (fenceMap.has(newCoordString)){
                            if(fenceMap.get(newCoordString)[dir] === 1){
                                let tempArray = fenceMap.get(newCoordString);
                                tempArray[dir] = 0;
                                fenceMap.set(newCoordString, tempArray);
                            }else{
                                break;
                            }
                        }else{
                            break;
                        }
                    }
                    for(let i = 1; i > 0; i++){
                        let newCoordX = coordX + dxdy[(dir+3) % 4][0] * i;
                        let newCoordY = coordY + dxdy[(dir+3) % 4][1] * i;
                        let newCoordString = newCoordX+';'+newCoordY;
                        if (fenceMap.has(newCoordString)){
                            if(fenceMap.get(newCoordString)[dir] === 1){
                                let tempArray = fenceMap.get(newCoordString);
                                tempArray[dir] = 0;
                                fenceMap.set(newCoordString, tempArray);
                            }else{
                                break;
                            }
                        }else{
                            break;
                        }
                    }
                }
            }
        }
        return sides;
    }
});