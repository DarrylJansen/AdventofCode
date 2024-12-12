const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const startList = data.toString().split(' ');
    const steps = 7;

    let endList = [];
    const endMap = new Map();

    endList = blink(startList, 0, steps);
    console.log(endList.length);
    for(let i = 0; i < endList.length; i++){
        let currentAmount = endMap.get(endList[i]) ? endMap.get(endList[i]) : 0;
        endMap.set(endList[i], currentAmount + 1);
    }
    console.log(endMap);

    function blink(list, currentIndex, stopIndex){
        console.log('step:', currentIndex, ' | Length:',list.length);
        const tempList = [];
        for(let i = 0; i < list.length; i++){
            if(Number(list[i]) === 0){
                tempList.push('1');
                continue;
            }

            let listLength = list[i].length;

            if(listLength % 2 === 1){
                tempList.push((Number(list[i])*2024).toString());
                continue;
            }

            let listHalf = listLength / 2;

            if(listLength % 2 === 0){
                let firstPart = list[i].substring(0,listHalf);
                let secondPart = list[i].substring(listHalf);

                firstPart = Number(firstPart).toString();
                secondPart = Number(secondPart).toString();

                tempList.push(firstPart);
                tempList.push(secondPart);
                continue;
            }
        }
        currentIndex++;
        if(currentIndex === stopIndex){
            return tempList;
        }else{
            return blink(tempList, currentIndex, stopIndex);
        }

        
    }

});