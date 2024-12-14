const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    // let sum = 0;
    
    const spaceWidth = 101;
    const spaceHeight = 103;

    const middleWidth = Math.floor(spaceWidth / 2);
    const middleHeight = Math.floor(spaceHeight / 2);

    const qTotals = 
    [
        [0,0],
        [0,0]
    ];
    const seconds = 100;

    for(let i = 0; i < lines.length; i++){
        let [startX, startY] = lines[i].substring(2).split(' v')[0].split(',').map(Number);
        let [dx, dy] = lines[i].split('v=')[1].split(',').map(Number);
        // console.log(startX, startY);
        // console.log(dx, dy);
        let endX = startX + seconds * dx;
        let endY = startY + seconds * dy;
        // console.log(endX, endY);
        endX = (endX >= 0) ? endX % (spaceWidth) : (spaceWidth - ((-1)*endX % spaceWidth)) % spaceWidth;
        endY = (endY >= 0) ? endY % (spaceHeight) : (spaceHeight - ((-1)*endY % spaceHeight)) % spaceHeight;
        // console.log(endX, endY);
        countQuadrant(endX, endY);
    }

    console.table(qTotals);
    console.log(qTotals[0][0] * qTotals[0][1] * qTotals[1][0] * qTotals[1][1]);

    function countQuadrant(x,y){
        
        if(x == middleWidth || y == middleHeight){
            return false;
        }

        let lr = (x > middleWidth);
        let ud = (y > middleHeight);

        qTotals[Number(ud)][Number(lr)] ++;
    }
});