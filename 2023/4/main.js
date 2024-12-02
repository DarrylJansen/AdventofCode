const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let winningNumberString = line.split(': ')[1].split(' | ')[0];
        let winningNumbers = winningNumberString.match(/\d+/g).map(Number);
        
        let ticketString = line.split(': ')[1].split(' | ')[1];
        let ticketNumbers = ticketString.match(/\d+/g).map(Number);

        let intersection = winningNumbers.filter(element => ticketNumbers.includes(element));
        let amount = intersection.length;

        if(amount > 0){
            sum += Math.pow(2, amount-1);
        }
        
        

    }
    console.log(sum);
});

