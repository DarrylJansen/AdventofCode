const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const reports = data.toString().split('\n');
    let sum = 0;

    for (let i = 0; i < reports.length; i++) {
        const report = reports[i].split(' ').map(Number);

        if(isSafeDiff(report) && isSorted(report)){
            sum++;
        }
    }


    console.log(sum);
    
    function isSorted(report){
        if(report.length === 1){
            return true;
        }
        if(report[0] < report[1]){
            //report sould be ascending
            const ascending = report.toSorted((a, b) => a - b);
            return arraysEqual(report, ascending);
        }else{
            //report should be descending
            const descending = report.toSorted((a, b) => b - a);
            return arraysEqual(report, descending);
        }
    }

    function isSafeDiff(report){
        let lastLevel = null;
        for(const level of report){
            if(lastLevel === null){
                lastLevel = parseInt(level);
            } else {
                let diff = Math.abs(lastLevel - parseInt(level));
                lastLevel = parseInt(level);
                if(diff > 3 || diff === 0){
                    return false;
                }
            }
        }
        return true;
    }

    function arraysEqual(arr1, arr2) {
        // Check if lengths are the same
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        // Compare each element
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    
        return true;
    }
});