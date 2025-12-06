const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    let numGrid = [];
    let opGrid = [];

    for(let line of lines){
        let arr = line.split(' ').filter((val) => val !== '');
        
        numGrid.push(arr);
    }
    opGrid = numGrid[numGrid.length - 1];
    numGrid.pop();

    for(let i=0; i<opGrid.length; i++){
        
        switch(opGrid[i]){
            case '+':
                for(let j=0; j<numGrid.length; j++){
                    sum += Number(numGrid[j][i]);
                }
                break;
            
            case '*':
                let product = 1;
                for(let j=0; j<numGrid.length; j++){
                    product *= Number(numGrid[j][i]);
                }
                sum += product;
                break;

        }
    }

    console.log(numGrid);
    console.log(opGrid);
    console.log(sum);
});