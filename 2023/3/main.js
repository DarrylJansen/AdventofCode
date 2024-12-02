const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let charAmount = line.length;

        for (let j = 0; j < charAmount; j++) {
            let char = line[j];

            if (isDigit(char)){
                let length = 1;
                let pos = j+length-1;
                while((pos<charAmount) && (isDigit(line[pos]))){
                    length++;
                    pos = j+length-1;
                }
                let number = parseInt(line.substring(j, pos));
                let endpos = pos-1;
                // console.log("line "+i+": "+'\t'+"number: "+number+"\t"+"length: "+(number.toString().length)+"\t"+"start: "+j+"\t"+"end: "+(endpos));
                sum += checkNumber(number, i, j, charAmount);
                j=pos;
            }

        }


    }

    console.log(sum);


    //FUNCTIONS
    
    function isDigit(char) {
        return /^\d$/.test(char);
    }
    
    function checkNumber(number, line, position, charAmount){
        let startX = Math.max(0, position-1);
        let startY = Math.max(0, line-1);
    
        let numberLength = number.toString().length;
    
        for(let y = startY; y <= Math.min(line+1, startY+2, lines.length-1); y++){
            for(let x = startX; x <= Math.min(startX+numberLength+1, charAmount-1); x++){
                // console.log("line "+y+": "+'\t'+"char: "+lines[y][x]+"\t"+"x: "+x+"\t"+"y: "+y);
                if(lines[y][x] !== '.' && !isDigit(lines[y][x])){
                    return number;
                }
            }
        }
        return 0;
    }
});

