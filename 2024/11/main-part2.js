const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const startList = data.toString().split(' ');
    const startMap = new Map();

    for(let i = 0; i < startList.length; i++){
        let currentAmount = startMap.get(startList[i]) ? Number(startMap.get(startList[i])) : 0;
        startMap.set(startList[i], currentAmount + 1);
    }
    const steps = 75;

    // console.log(startMap);
    const endmap = blink(startMap, 0, steps);
    
    // console.log(endmap);
    console.log(getMapSum(endmap));

    function blink(map, currentIndex, stopIndex){
        // console.log('step:', currentIndex, ' | Length:', map.size);
        // console.log(map);
        const tempMap = new Map();

        for(let [num, amount] of map){
            if(Number(num) === 0){
                let targetValue = '1';
                let currentAmount = tempMap.get(targetValue) ? tempMap.get(targetValue) : 0;

                tempMap.set(targetValue, currentAmount + amount);
                continue;
            }

            let numLength = num.length;

            if(numLength % 2 === 1){
                let targetValue = (Number(num)*2024).toString();
                let currentAmount = tempMap.get(targetValue) ? tempMap.get(targetValue) : 0;
                tempMap.set(targetValue, currentAmount + amount);
                continue;

            }else{
                let listHalf = numLength / 2;

                let firstPart = num.substring(0, listHalf);
                let secondPart = num.substring(listHalf);

                firstPart = Number(firstPart).toString();
                secondPart = Number(secondPart).toString();

                if(firstPart != secondPart){
                    let currentAmount1 = tempMap.get(firstPart) ? Number(tempMap.get(firstPart)) : 0;
                    let currentAmount2 = tempMap.get(secondPart) ? Number(tempMap.get(secondPart)) : 0;
                    tempMap.set(firstPart, currentAmount1 + amount);
                    tempMap.set(secondPart, currentAmount2 + amount);
                }else{
                    let currentAmount = tempMap.get(firstPart) ? Number(tempMap.get(firstPart)) : 0;
                    tempMap.set(firstPart, currentAmount + 2*amount);
                }




                continue;
            }
        }
        currentIndex++;
        if(currentIndex === stopIndex){
            return tempMap;
        }else{
            return blink(tempMap, currentIndex, stopIndex);
        }
    }

    function getMapSum(map){
        let sum = 0;
        for([num, value] of map){
            sum += value;
        }
        return sum;
    }

});