function createField(size) {
    let field = [];
    for(let i = 0; i < size; i++){
     field[i] = [];
     for(let j = 0; j< size; j++){
         field[i][j] = 0;
     }
    }
    return field;
 }
 
 function createMines (field, numOfMines){
     let placeMines = 0;
     let row = Math.floor(Math.random() * field.length);
     let col = Math.floor(Math.random() * field[0].length);
 
     while (placeMines < numOfMines){
         if(!field[row][col].isMine) {
             placeMines++;
             field[row][col].isMine = true;
         }
         row = Math.floor(Math.random() * field.length);
         col = Math.floor(Math.random() * field[0].length);
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
             markup += `<div class ="cell">1</div>`;
         }
     }
 
     markup += `</div>
 <div class="bottom"></div>
 </div>`;
     document.write(markup);
 }
 
 let field = createField(10);
 console.log(field);
 field = createMines(field, 10);
 addMarkupToPage(field);
 
 
 
 
 
 