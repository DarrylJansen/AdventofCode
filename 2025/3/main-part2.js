const fs = require('fs');

fs.readFile('testinput.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    
    //163985968353813 too low


    for(let battery of lines){
        // console.log(battery);
        let pointers = [0,1,2,3,4,5,6,7,8,9,10,11];
        let max = 0;
        

        for(let i=0; i<12; i++){
            // console.log(i);
            if(i===11 && pointers[11] < battery.length - 1){
                if(battery[pointers[10]] < battery[pointers[11]]){
                    // console.log('pp',pointers[10], pointers[11]);
                    pointers[10] = pointers[11];
                    pointers[11]++;
                    // console.log('swapped 11');
                    i=-1;
                }else{
                    pointers[11]++;
                    // console.log('push 11');
                    i=-1;
                }
            }else if(pointers[i+1] > pointers[i] + 1){
                // pointers[i] has place
                let place = pointers[i+1]-pointers[i]-1;
                

                if(battery[pointers[i-1]] < battery[pointers[i]]){
                    pointers[i-1] = pointers[i];
                    pointers[i]++;
                    // console.log('swapped', i);
                    i=-1;
                    continue;
                }else if(battery[pointers[i] + 1] >= battery[pointers[i]]){
                    pointers[i]++;
                    // console.log('pushed', i);
                    i=-1;
                }
            }
        }

        let numStr = '';
        for(let pointer of pointers){
            numStr += battery[pointer];
        }
        console.log(numStr);
        sum += Number(numStr);
        // console.log('---');
    }
    console.log('---');
    console.log('---');
    console.log(sum);

});