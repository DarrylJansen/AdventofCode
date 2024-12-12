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

            // sum += check(coord);
            let checkArray = check(coord);
            console.log(checkArray);
            sum += checkArray[0]*checkArray[1];
            // console.log(check(coord));
            // console.log(sum, checkedCoords);
        }
    }
    console.log(sum);
    // console.log(checkedCoords);

    
    // console.log(check("2;1"), sum, checkedCoords);



    function check(coord, fences = 0, area = 0){
        checkedCoords.add(coord);
        area++;

        let coordX=Number(coord.split(';')[0]);
        let coordY=Number(coord.split(';')[1]);
        let currentChar = lines[coordY][coordX];

        for(let dir = 0; dir < 4; dir++){
            let checkX = coordX + dxdy[dir][0];
            let checkY = coordY + dxdy[dir][1];
            if(outOfBounds(checkX, checkY)){
                // console.log('out of bounds:',checkX,checkY);
                fences++;
            }else if(checkedCoords.has(checkX+';'+checkY) && (lines[checkY][checkX] === currentChar)){
                continue;
            }else if(checkedCoords.has(checkX+';'+checkY)){
                fences++;
                continue;
            }else if(lines[checkY][checkX] === currentChar){
                let checkArray = check(checkX+';'+checkY, fences, area);
                fences = checkArray[0];
                area = checkArray[1]
            }else{
                // console.log('other char',checkX, checkY);
                fences++;
            }
        }
        // console.log(coord, ' returned:', fences, area);
        return [fences, area];
    }

    function outOfBounds(x, y){
        return (x<0 || y<0 || x>=lines[0].length || y >=lines.length);
    }
});