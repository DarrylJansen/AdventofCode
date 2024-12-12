const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    const dataheight = lines.length;
    const datawidth = lines[0].length;
    
    const antennaMap = new Map();
    const antiNodes = new Set();
    let sum = 0;

    //create antennaMap
    for(let i = 0; i < lines.length; i++){
        for(let j = 0; j < lines[0].length; j++){
            let checkChar = lines[i][j];

            if(checkChar !== '.'){
                if(antennaMap.has(checkChar)){
                    antennaMap.get(checkChar).push(i+';'+j);
                }else{
                    antennaMap.set(checkChar, [i+';'+j]);
                }
            }
        }
    }

    //place antiNodes
    for(antenna of antennaMap){
        const char = antenna[0];
        const coords = antenna[1];
        
        for(let i = 0; i < coords.length - 1; i++){
            for(let j = i + 1; j < coords.length; j++){
                setAntiNodes(coords[i], coords[j]);
            }
        }
    }

    console.log(antiNodes);

    function setAntiNodes(coA, coB){
        const [coAx, coAy] = coA.split(';').map(Number);
        const [coBx, coBy] = coB.split(';').map(Number);

        let xDiff = coBx - coAx;
        let yDiff = coBy - coAy;

        antinodeA = [coBx + xDiff, coBy + yDiff];
        antinodeB = [coAx - xDiff, coAy - yDiff];

        if(!(antinodeA[0] < 0 || antinodeA[0] >= datawidth || antinodeA[1] < 0 || antinodeA[1] >= dataheight)){
            antiNodes.add(antinodeA[0]+';'+antinodeA[1]);
        }else{
            // console.log('not added:', antinodeA)
        }

        if(!(antinodeB[0] < 0 || antinodeB[0] >= datawidth || antinodeB[1] < 0 || antinodeB[1] >= dataheight)){
            antiNodes.add(antinodeB[0]+';'+antinodeB[1]);
        }else{
            // console.log('not added:', antinodeB)
        }
    }

    // console.log(antennaMap);

});