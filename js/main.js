'use strict';

const boxRowsAndCellsArray = Array.from(document.querySelectorAll('.row .column'));
const tableSize = 3;
const currentGamer = document.querySelector('#currentGamer');

const fillColumn = () => {
    let winStatus = [3];
    // console.log(currentGamer);
    event.target.innerHTML = currentGamer.innerHTML;
    event.target.removeEventListener('click', fillColumn);
    event.target.classList.add('reserved');
    if ((winStatus = checkWin())[0]) { displayResult(winStatus); } else {
        currentGamer.innerHTML = currentGamer.innerHTML === 'X' ? 'O' : 'X';
        if (winStatus[2].length === tableSize ** 2 - 1) { displayResult(winStatus); }
    }
};

(() => {
    boxRowsAndCellsArray.forEach(item => item.addEventListener('click', fillColumn))
})()


const checkWin = () => {
    const reservedCells = boxRowsAndCellsArray.map(item => item.innerHTML);
    let winPositions = [];
    if ((winPositions = checkHorizontalWin(reservedCells)).length === 3) { return [true, winPositions, reservedCells.length]; }
    if ((winPositions = checkVerticalWin(reservedCells)).length === 3) { return [true, winPositions, reservedCells.length]; }
    if ((winPositions = checkDiagonalWin(reservedCells)).length === 3) { return [true, winPositions, reservedCells.length]; }
    return [false, winPositions, reservedCells.length];
}

const displayResult = (winStatus) => {
    if (winStatus[0]) {
        winStatus[1].forEach(item => boxRowsAndCellsArray[item].classList.add('winner'));
        boxRowsAndCellsArray.forEach(item => item.removeEventListener('click', fillColumn));
        document.querySelector('#gamer-message').textContent = 'A győztes:';
    } else {
        document.querySelector('#gamer-message').textContent = 'Döntetlen!';
        currentGamer.innerHTML = '';
    }

    const newGameButton = document.querySelector('#new-game-button');
    newGameButton.classList.remove('hide');
    newGameButton.addEventListener('click', () => window.location.reload());
}


const checkVerticalWin = (reservedCells) => {
    const winPositions = [];
    for (let i = 0; i <= reservedCells.length - tableSize; i += tableSize) {
        let counter = 0;
        winPositions.length = 0;
        for (let j = i; j < i + tableSize; j++) {
            if (reservedCells[j] === currentGamer.innerHTML) {
                counter++;
                winPositions.push(j)
                if (counter === 3) { return winPositions; }
            }
        }
    }
    return winPositions;
}

const checkHorizontalWin = (reservedCells) => {
    const winPositions = [];
    for (let i = 0; i < tableSize; i++) {
        let counter = 0;
        winPositions.length = 0;
        for (let j = i; j < reservedCells.length; j += tableSize) {
            if (reservedCells[j] === currentGamer.innerHTML) {
                counter++;
                winPositions.push(j)
                if (counter === 3) { return winPositions; }
            }
        }
    }
    return winPositions;
}
const checkDiagonalWin = (reservedCells) => {
    const winPositions = [];
    let counter = 0;
    for (let i = 0; i < reservedCells.length; i += tableSize + 1) {
        if (reservedCells[i] === currentGamer.innerHTML) {
            counter++;
            winPositions.push(i)
        }
    }
    if (winPositions.length === 3) { return winPositions } else {
        winPositions.length = 0;
        counter = 0;
        for (let i = tableSize - 1; i < reservedCells.length - (tableSize - 1); i += tableSize - 1) {
            if (reservedCells[i] === currentGamer.innerHTML) {
                counter++;
                winPositions.push(i)
            }
        }
    }
    return winPositions;
}