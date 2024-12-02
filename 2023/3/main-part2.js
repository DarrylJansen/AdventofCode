const fs = require('fs');
const { start } = require('repl');

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

            if (char === '*'){
                checkGear(i,j);
            }

        }

    }

    console.log(sum);


    //FUNCTIONS
    
    function isDigit(char) {
        return /^\d$/.test(char);
    }

    function checkGear(line, position){
        xMax = lines[line].length-1;
        yMax = lines.length-1;

        let startX = Math.max(0, position-1);
        let startY = Math.max(0, line-1);

        let array = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];

        for(let y = startY; y <= Math.min(line+1, startY+2, yMax); y++){
            for(let x = startX; x <= Math.min(startX+2, xMax); x++){
                if(isDigit(lines[y][x])){
                    array[y-startY][x-startX] = true;
                }
            }
        }
        sum += checkArray(array, line, position);


    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
    
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function checkArray(array, line, position){
        let number = 0;
        
        for(let i=0; i<3; i++){
            // console.log(array[i]);
            if(arraysEqual(array[i], [false, false, false])){
                //do nothing
            }else if(arraysEqual(array[i], [true, false, true])){
                number += 2;
            }else{
                number += 1;
            }
        }

        if(number === 2){
            let num1 = 0;
            let num2 = 0;

            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    if(array[i][j] === true){
                        if(num1 === 0){
                            num1 = getNumber(line+i-1, position+j-1);
                        }else{
                            num2 = getNumber(line+i-1, position+j-1);
                        }
                        j++;
                        
                    }
                }
            }

            console.log(num1+"*"+num2+"="+num1*num2);
            return num1*num2;
        }else{
            return 0;
        }
    }
    
    function getNumber(line, position){
        let startX = 0;
        let endX = 0;

        for(let x=0; position+x<lines[line].length; x++){
            if(!isDigit(lines[line][position+x])){
                endX = position+x-1;
                break;
            }
        }
        if(endX === 0){
            endX = lines[line].length-1;
        }
        for(let x=0; position+x>=0; x--){
            if(!isDigit(lines[line][position+x])){
                startX = position+x+1;
                break;
            }
        }

        return lines[line].substring(startX, endX+1);
    }

});

