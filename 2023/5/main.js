const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let minValue = 0;

    const seeds = lines[0].split(': ')[1].match(/\d+/g).map(Number);
    
    for(let seed=0; seed<seeds.length; seed++){
        let searchValue = parseInt(seeds[seed]);
        searchValue = getValue(3,14,searchValue);
        searchValue = getValue(17,37,searchValue);
        searchValue = getValue(40,55,searchValue);
        searchValue = getValue(58,102,searchValue);
        searchValue = getValue(105,151,searchValue);
        searchValue = getValue(154,176,searchValue);
        searchValue = getValue(179,204,searchValue);
        console.log(searchValue);
        console.log('-------------');
        if(searchValue < minValue || minValue == 0){
            minValue = searchValue;
        }

    }
    console.log(minValue);

    function getValue(start, end, searchValue){
        for(let line=start; line<=end; line++){
            let destination = parseInt(lines[line].split(' ')[0]);
            let source = parseInt(lines[line].split(' ')[1]);
            let range = parseInt(lines[line].split(' ')[2]);

            if(searchValue >= source && searchValue <= source + range - 1){
                let offset = searchValue - source;
                let destinationValue = destination + offset;
                console.log('searchValue: ' + searchValue + ' source: ' + source + ' range: ' + range + ' offset: ' + offset + ' destination: ' + destination + ' destinationValue: ' + destinationValue);
                searchValue = parseInt(destinationValue);
                break;
            }

        }
        return searchValue;
    }

});