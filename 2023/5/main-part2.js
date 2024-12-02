const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let minValue = 0;

    const seeds = lines[0].split(': ')[1].match(/\d+/g).map(Number);
    
    for(let i=1; true; i++){
        let searchValue = i;
        searchValue = getValueReverse(179,204,searchValue)
        searchValue = getValueReverse(154,176,searchValue);
        searchValue = getValueReverse(105,151,searchValue);
        searchValue = getValueReverse(58,102,searchValue);
        searchValue = getValueReverse(40,55,searchValue);
        searchValue = getValueReverse(17,37,searchValue);
        searchValue = getValueReverse(3,14,searchValue);
    }

    function getValue(start, end, searchValue){
        // console.log("Get value: " + searchValue + " start: " + start + " end: " + end);
        for(let line=start; line<=end; line++){
            let destination = parseInt(lines[line].split(' ')[0]);
            let source = parseInt(lines[line].split(' ')[1]);
            let range = parseInt(lines[line].split(' ')[2]);

            if(searchValue >= source && searchValue <= source + range - 1){
                let offset = searchValue - source;
                let destinationValue = destination + offset;
                // console.log('searchValue: ' + searchValue + ' source: ' + source + ' range: ' + range + ' offset: ' + offset + ' destination: ' + destination + ' destinationValue: ' + destinationValue);
                searchValue = parseInt(destinationValue);
                break;
            }

        }
        
        return searchValue;
    }

    function getValueReverse(start, end, searchValue){
        for(let line=start; line<=end; line++){
            
        }
    }

});