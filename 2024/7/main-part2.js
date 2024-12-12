const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    let numbers = [];
    
    for(let i = 0; i < lines.length; i++){
        let line = lines[i].split(':');
        // console.log("===-", line,"-===");

        const solution = line[0];
        numbers = line[1].split(" ");
        numbers.shift();

        let searchIndex = numbers.length - 1;

        if(checkDivisible(solution, searchIndex) || checkSubtract(solution, searchIndex) || checkConcat(solution, searchIndex)){
            sum += Number(solution);
        }
    }

    console.log(sum);

    function checkDivisible(target, index){
        let checkNum = Number(numbers[index]);

        if(target == checkNum && index == 0){
            return true;
        }

        if(target % checkNum == 0 && index > 0){
            return(checkDivisible(target / checkNum, index - 1) || checkSubtract(target / checkNum, index - 1) || checkConcat(target / checkNum, index - 1))
        }else{
            return false;
        }
    }

    function checkSubtract(target, index){
        let checkNum = Number(numbers[index]);

        if(target == checkNum && index == 0){
            return true;
        }

        if(target > checkNum && index > 0){
            return(checkDivisible(target - checkNum, index - 1) || checkSubtract(target - checkNum, index - 1) || checkConcat(target - checkNum, index - 1))
        }else{
            return false;
        }
    }

    function checkConcat(target, index){
        // console.log('checkconcat',target,numbers[index]);
        let checkNum = Number(numbers[index]);
        let targetString = target.toString();
        let targetSubString = "";
        let leftover = "";

        if(target == checkNum && index == 0){
            return true;
        }

        if(targetString.length > checkNum.toString().length){
            targetSubString = targetString.substring(targetString.length - checkNum.toString().length);
            leftover = targetString.substring(0,targetString.length - checkNum.toString().length);
            // console.log('yes,',targetSubString, leftover);
        }else{
            return false;
        }

        if(targetSubString == checkNum.toString() && index > 0){
            // console.log('concattable,',targetSubString, leftover);
            return(checkDivisible(leftover, index - 1) || checkSubtract(leftover, index - 1) || checkConcat(leftover, index - 1))
        }else{
            return false;
        }
    }
});