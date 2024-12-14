const fs = require('fs');

fs.readFile('input.txt', async (err, data) => {
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

    let coordSet = new Set();
    // const startCanvas = Array.from({ length: spaceHeight }, () => Array(spaceWidth).fill('.'));
    // let canvas = structuredClone(startCanvas);

    const qTotals = 
    [
        [0,0],
        [0,0]
    ];
    const maxSeconds = 25000;

    for(let seconds = 0; seconds < maxSeconds; seconds++){
        coordSet = new Set();
        let canvas = Array.from({ length: spaceHeight }, () => Array(spaceWidth).fill('.'));
        
        let isAllUnique = true;
        for(let i = 0; i < lines.length; i++){
            let [startX, startY] = lines[i].substring(2).split(' v')[0].split(',').map(Number);
            let [dx, dy] = lines[i].split('v=')[1].split(',').map(Number);

            let endX = startX + seconds * dx;
            let endY = startY + seconds * dy;

            endX = (endX >= 0) ? endX % (spaceWidth) : (spaceWidth - ((-1)*endX % spaceWidth)) % spaceWidth;
            endY = (endY >= 0) ? endY % (spaceHeight) : (spaceHeight - ((-1)*endY % spaceHeight)) % spaceHeight;

            if(coordSet.has(endX+','+endY)){
                isAllUnique = false;
                break;
            }else{
                coordSet.add(endX+','+endY);
                canvas[endY][endX] = 'X'
            }
        }
        if(isAllUnique){ 
            console.log(seconds); 
            // fs.writeFileSync('output-'+seconds+'.txt', canvas);
            await writeToFile(seconds, canvas);
            break;
        }
        
    }

    async function writeToFile(id, array) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(`output-${id}.txt`);
            file.on('error', (err) => {
                console.error(err);
                reject(err);
            });
            file.on('finish', resolve);
            array.forEach(row => file.write(row.join('') + '\n'));
            file.end();
        });
    }

    // console.table(qTotals);
    // console.log(qTotals[0][0] * qTotals[0][1] * qTotals[1][0] * qTotals[1][1]);

    function countQuadrant(x,y){
        
        if(x == middleWidth || y == middleHeight){
            return false;
        }

        let lr = (x > middleWidth);
        let ud = (y > middleHeight);

        qTotals[Number(ud)][Number(lr)] ++;
    }
});