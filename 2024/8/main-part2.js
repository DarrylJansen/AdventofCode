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

        let multiplier = 0;

        let checkX = coAx + multiplier * xDiff;
        let checkY = coAy + multiplier * yDiff;

        while(checkCoords(checkX, checkY)){
            antiNodes.add(checkX+';'+checkY);
            multiplier++;
            checkX = coAx + multiplier * xDiff;
            checkY = coAy + multiplier * yDiff;
        }

        multiplier = 0;
        checkX = coAx + multiplier * xDiff;
        checkY = coAy + multiplier * yDiff;

        while(checkCoords(checkX, checkY)){
            antiNodes.add(checkX+';'+checkY);
            multiplier--;
            checkX = coAx + multiplier * xDiff;
            checkY = coAy + multiplier * yDiff;
        }
    }

    function checkCoords(coX, coY){
        return !(coX < 0 || coX >= datawidth || coY < 0 || coY >= dataheight);
    }

    // console.log(antennaMap);

});