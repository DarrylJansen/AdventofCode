const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    let numGrid = [];
    let opArr = [];
    let lenArr = [];

    let opLine = lines[lines.length-1];
    // console.log(opLine.length);

    function addZeroes(numStr){
        let numFound = false;
        let str = '';

        for(let i=0; i<numStr.length; i++){
            if(numStr[i]!== ' '){
                str += numStr[i];
                numFound = true;
            }else{
                if(!numFound){
                    str += '0';
                }
            }
        }
        return str;
    }

    for(let i=0; i<opLine.length; i++){
        // console.log(opLine[i]);
        switch(opLine[i]){
            case '*':
                opArr.push('*');
                lenArr.push(0);

                // console.log(opArr, lenArr);
                break;
            case '+':
                opArr.push('+');
                lenArr.push(0);
                // console.log(opArr, lenArr);
                break;
            default:
                lenArr[opArr.length - 1] = lenArr[opArr.length - 1] + 1;
                // console.log(lenArr);
                break;
        }
    }
    lenArr[opArr.length - 1] = lenArr[opArr.length - 1] + 1;

    let start = 0;

    for(let i=0; i<opArr.length; i++){
        let len=lenArr[i];
        let arr=[];

        
        let num = [];

        for(let k=0; k<lines.length - 1; k++){
            for(let j=0; j<len; j++){
                num.push(lines[k][start + len - j - 1]);
            }
        }

        // for(let w=0; w<num.length; w++){
        //     if(num[w] === ' '){
        //         num[w] = 0;
        //     }
        // }
        console.log(num);
        let numLen = num.length / len;

        if(opArr[i] === '*'){
            let prod = 1;

            for(let q=0; q<len; q++){
                let numStr = '';

                for(let l=0; l<numLen; l++){
                    numStr += num[q+l*len];
                }
                // numStr = addZeroes(numStr);
                console.log(numStr);
                

                prod *= Number(numStr);
            }
            console.log('prod:', prod, ', len:',len, " numLen:",numLen);
            sum += prod;
        }

        if(opArr[i] === '+'){
            let s = 0;

            for(let q=0; q<len; q++){
                let numStr = '';

                for(let l=0; l<numLen; l++){
                    numStr += num[q+l*len];
                }
                // numStr = addZeroes(numStr);
                console.log(numStr);
                s += Number(numStr);
            }

            console.log('sum:', s, ', len:',len, " numLen:",numLen);
            sum += s;
        }

        start += len + 1;




        // console.log(num);
    }
    console.log(sum);

    // console.log(opArr, lenArr);
});

//too low 14788423030
//too low 6439300761303
//too low 6439300761303
//toohigh 11003785321743
//wrong.  4384276188732
//.       8674740488592
