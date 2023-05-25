function createField(size) {
    let field = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push({ isMine: false, numOfMinesAround: 0, opened: false });
        }
        field.push(row);
    }
    return field;
}

function createMines(field, numOfMines = 0) {
    let placeMines = 0;
    while (placeMines < numOfMines) {
        let row = Math.floor(Math.random() * field.length);
        let col = Math.floor(Math.random() * field[0].length);
        if (!field[row][col].isMine) {
            placeMines++;
            field[row][col].isMine = true;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const neighborRow = row + i;
                    const neighborCol = col + j;
                    if (
                        neighborRow >= 0 &&
                        neighborRow < field.length &&
                        neighborCol >= 0 &&
                        neighborCol < field[0].length &&
                        !field[neighborRow][neighborCol].isMine
                    ) {
                        field[neighborRow][neighborCol].numOfMinesAround++;
                    }
                }
            }
        }
    }
    return field;
}

function addMarkupToPage(field) {
    let markup = `
    <div class="minesweeper_window">
        <div class="header"></div>
        <div class="field">`;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            const currentCell = field[i][j];
            markup += `<div class ="cell hidden" data-clicked="false" data-row="${i}" data-col="${j}"></div>`;
        }
    }
    markup += `</div>
        <div class="bottom"></div>
    </div>`;
    document.querySelector('body').innerHTML = markup;
}

function addMinesToMarkup(field) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            const currentCell = field[i][j];
            const cellElement = cells[i * field.length + j];
            cellElement.setAttribute('data-mine', currentCell.isMine ? 'true' : 'false');
            cellElement.setAttribute('data-num-of-mines-around', currentCell.numOfMinesAround);
        }
    }
    return field;
}

function showBombs(field) {
    for (let i = 0; i < field.length; i++) {
        const currentRow = field[i];
        for (let j = 0; j < currentRow.length; j++) {
            const currentElement = currentRow[j];
            if (currentElement.isMine === true && !currentElement.opened) {
                const cellElement = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                cellElement.classList.add('opened');
                cellElement.textContent = 'B!';
            }
        }
    }
}

function openEmptyCell(field, row, col) {
    if (
        row < 0 ||
        row >= field.length ||
        col < 0 ||
        col >= field[0].length ||
        field[row][col].isMine ||
        field[row][col].opened
    ) {
        return;
    }


    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cellElement.classList.remove('hidden');
    cellElement.classList.add('opened');
    field[row][col].opened = true;

    const numOfMinesAround = field[row][col].numOfMinesAround;
    
     if(numOfMinesAround === 0){
        cellElement.textContent = '';
        numOfOpenedCells++;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const neighborRow = row + i;
                const neighborCol = col + j;
                openEmptyCell(field, neighborRow, neighborCol);
            }
        } 
    }else {
        cellElement.textContent = numOfMinesAround;
        numOfOpenedCells++;
        console.log(numOfOpenedCells);
        console.log(numOfSafeCells);
        if (numOfOpenedCells === numOfSafeCells) {
            alert('Congratulations! You win!');
        }
    }
}

let size = 10;
let numOfOpenedCells = 0;
let numOfMines = 1;
let numOfSafeCells = size * size - numOfMines;
let minesPlaced = false;
let field = createField(size);
addMarkupToPage(field);


const fieldElement = document.querySelector('.field');
fieldElement.addEventListener('click', event => {
    const clickedCell = event.target;
    const cellClasses = clickedCell.classList;

    if (cellClasses.contains('field')) {
        console.log('field!');
    } else if (cellClasses.contains('hidden')) {
        if (!minesPlaced) {
            field = createMines(field, 1); // Разместить мины на поле после первого клика
            addMinesToMarkup(field); // Обновить разметку с учетом размещенных мин
            console.log(field);
            minesPlaced = true; // Установить флаг, что мины были размещены
        }

        const clickedRow = parseInt(clickedCell.getAttribute('data-row'));
        const clickedCol = parseInt(clickedCell.getAttribute('data-col'));

        if (clickedCell.getAttribute('data-mine') === 'false') {
            openEmptyCell(field, clickedRow, clickedCol);
        } else {
            alert('Game over!!!');
            showBombs(field);
        }
    } else if (clickedCell.getAttribute('data-clicked') === 'true') {
        console.log('cell is already clicked');
    }
});
fieldElement.addEventListener('contextmenu', event => {
    event.preventDefault();
    const clickedCell = event.target;
    const cellClasses = clickedCell.classList;

    if (cellClasses.contains('opened')) {
        return;
    }

    if (cellClasses.contains('hidden')) {
        if (clickedCell.getAttribute('data-clicked') === 'true') {
            clickedCell.removeAttribute('data-clicked');
            clickedCell.textContent = '';
        } else {
            clickedCell.setAttribute('data-clicked', 'true');
            clickedCell.textContent = 'F';
        }
    }
});
