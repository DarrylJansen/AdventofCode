const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    let sum = 0;
    const copies = Array(lines.length).fill(0);

    for (let i = 0; i < lines.length; i++) {
        for(let j = 0; j <= copies[i]; j++){
            let line = lines[i];

            let winningNumbers = getWinningNumbers(i);
            let ticketNumbers = getTicketNumbers(i);
    
            let intersection = winningNumbers.filter(element => ticketNumbers.includes(element));
            let amount = intersection.length;

            for(let k = 1; k <= amount; k++){
                copies[i+k]++;
            }
        }
    }
    for(let i = 0; i < copies.length; i++){
        sum += 1 + copies[i];
    }
    console.log(sum);

    function getWinningNumbers(l){
        let winningNumberString = lines[l].split(': ')[1].split(' | ')[0];
        let winningNumbers = winningNumberString.match(/\d+/g).map(Number);

        return winningNumbers;
    }

    function getTicketNumbers(l){
        let ticketString = lines[l].split(': ')[1].split(' | ')[1];
        let ticketNumbers = ticketString.match(/\d+/g).map(Number);

        return ticketNumbers;
    }
});

