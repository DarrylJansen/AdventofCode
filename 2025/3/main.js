const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    // 132435

    for(let battery of lines){
        let [pA, pB] = [0,1];
        let max = 0;
        
        while(pB < battery.length){
            let [vA, vB] = [battery[pA],battery[pB]].map(Number);
            max = Math.max(max, 10*vA + vB);

            if(vB > vA){
                pA = pB;
            }
            pB++;
        }

        console.log(max);
        sum += max;
    }
    console.log('---');
    console.log(sum);

});