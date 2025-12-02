const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split(',');
    let sum = 0;

    for(let line=0; line<lines.length; line++){
        let [min,max] = lines[line].split('-').map(Number);
        console.log('checking:',min,max);
        for(let i=min; i<=max; i++){
            let str = i.toString();
            let len = str.length;
            let divisors = new Set();

            if(len===1){continue;}
            
            for(let j=1; j<=Math.ceil(len/2); j++){
                if(len % j == 0){
                    divisors.add(j);
                }
            }
            // console.log(str,len,divisors);

            for(let d of divisors){
                // console.log('checking divisor:',d);
                let subString = str.substring(0,d);
                let invalid = true;
                for(let n=1; n<len/d; n++){
                    if(str.substring(d*n, d*(n+1)) !== subString){
                        invalid = false;
                        break;
                    }
                }
                if(invalid){
                    sum+=i;
                    console.log(i,'is invalid:',subString);
                    break;
                }
            }
            
        }
    }
    console.log(sum);


});