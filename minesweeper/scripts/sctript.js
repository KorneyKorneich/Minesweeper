

function createField(size) {
    let field = [];
    for(let i = 0; i < size; i++){
     const row = [];
     for(let j = 0; j< size; j++){
         row.push({isMine: false}) ;
     }
     field.push(row);
    }
    return field;
}
 
function createMines (field, numOfMines){
     let placeMines = 0;
     while (placeMines < numOfMines){
        let row = Math.floor(Math.random() * field.length);
        let col = Math.floor(Math.random() * field[0].length);
         if(!field[row][col].isMine) {
            placeMines++;
            field[row][col].isMine = true;
         }
     }
     return field;
}
 
 function addMarkupToPage (field){
     let markup = 
 `<div class="minesweeper_window">
 <div class="header"></div>
 <div class="field">`;
     for(let i = 0; i < field.length; i++){
         for(let j = 0; j < field[i].length; j++){
            const currentCell = field[i][j];
                markup += `<div class ="cell hidden data-mine=[${currentCell.isMine ? true : false}]"></div>`;
            }   
         }
     markup += `</div>
 <div class="bottom"></div>
 </div>`;
     document.write(markup);
 }
 
function clearField(){
    fieldElement.innerHTML = '';
}

 let field = createField(10);
 field = createMines(field, 10);
 console.log(field);
 addMarkupToPage(field);
 
 const fieldElement = document.querySelector(".field");
 fieldElement.addEventListener('click', event => {
    const clickedCell = event.target;
    const cellClasses = clickedCell.classList;
    console.log(cellClasses);
    
    if(cellClasses.contains('field')) console.log('field!');
    else if(cellClasses.contains('cell') && cellClasses.contains('hidden') && clickedCell.dataset.mine === false) {
        cellClasses.remove('hidden');
        cellClasses.add('opened');
    }
    else{
        clearField();
    }
    console.log(cellClasses);

 });
 
 
 