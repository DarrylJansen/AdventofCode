const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    const forkliftMap = new Map();
    const removedSet = new Set();

    function addOne(x,y){
        let coordStr = x+'/'+y;
        let forkValue = forkliftMap.get(coordStr);
        
        forkliftMap.set(coordStr, forkValue + 1)
        return forkValue + 1;
    }

    function checkAround(x,y){
        let returnVal = 0;
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                if(i===0 && j===0){ continue; }
                if(y+j < 0 || y+j >= lines.length){ continue; }
                if(x+i < 0 || x+i >= lines[0].length){ continue; }

                if(lines[y+j][x+i] == '@'){
                    returnVal = addOne(x,y);
                }
            }
        }
        return returnVal;
    }

    // function deleteInvalids(value, key, map) {
    //     if(value >= 4){
    //         forkliftMap.delete(key);
    //     }
    // }

    for(let y=0; y<lines.length; y++){
        for(let x=0; x<lines[y].length; x++){
            if(lines[y][x] == '.'){ continue; }

            let coordStr = x+'/'+y;
            forkliftMap.set(coordStr, 0);

            if(checkAround(x,y) < 4){
                console.log('removed',coordStr);
                removedSet.add(coordStr);
                // forkliftMap.clear();
                lines[y] = lines[y].slice(0,x) + '.' + lines[y].slice(x+1);
                // console.log(lines[y]);
                y=-1;
                break;
            }
        }
    }

    // forkliftMap.forEach(deleteInvalids);

    // for(let line of lines){
    //     console.log(line);
    // }

    console.log(removedSet);
    console.log(removedSet.size);
    
});

//wrong answers:
//1514 too low