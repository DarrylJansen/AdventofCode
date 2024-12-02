const fs = require('fs');

const colors = ["red", "green", "blue"];
const bagContents = {
    "red" : 12,
    "green" : 13,
    "blue" : 14,
}

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.toString().split('\n');
    let sum = 0;

    for(let i=0; i<lines.length; i++){
        let line = lines[i];

        let gameID = getGameID(line);

        // console.log("gameID: "+gameID);
        
        sum += checkContents(line);
    }

    console.log("sum: "+sum);

});

function getGameID(line){
    let firstPart = line.split(": ")[0];
    return parseInt(firstPart.substring(5));
}

function checkContents(line){
    let bagMinimum = {
        "red" : 0,
        "green" : 0,
        "blue" : 0,
    }
    let lineContents = line.split(": ")[1].split("; ");

    for(let i=0; i<lineContents.length; i++){
        let grabContents = lineContents[i].split(", ");

        for(let j=0; j<grabContents.length; j++){
            for(let k=0; k<colors.length; k++){
                if(grabContents[j].includes(colors[k])){
                    let amount = parseInt(grabContents[j].split(colors[k])[0]);
                    if(amount > bagMinimum[colors[k]]){
                        bagMinimum[colors[k]] = amount;
                    }
                }
            }
        }
    }
    return bagMinimum["red"] * bagMinimum["green"] * bagMinimum["blue"];

}