class Game {        //logika gry
    fields = ["","","","","","","","",""];
    winningConditions = [
        [1,2,3],
        [1,5,9],
        [1,4,7],
        [3,6,9],
        [3,5,7],
        [2,5,8],
        [7,8,9],
        [3,4,5]
    ];
    activePlayer = 'X'; 
    gameEnd = false;
    init() {
        this.board = new Board(this.move);
        console.log(this.gameEnd);
    }
    move = (e)=>{
        const clickedFieldPos = e.target.dataset.pos - 1;
        if (this.fields[clickedFieldPos] === ""){
            this.fields[clickedFieldPos] = this.activePlayer;
            this.board.makeMove(clickedFieldPos, this.activePlayer);
            this.checkIfEnd();
            console.log('game end = ', this.gameEnd);
            this.changePlayer();
        }
    }
    changePlayer(){
        this.activePlayer==="X" ? this.activePlayer="O" : this.activePlayer="X";
    }
    checkIfEnd(){
        if(this.fields.findIndex(field => field === "") === -1) this.gameEnd = true;
        else {
            for (let i=0; i < this.winningConditions.length; i++){
            const [posA, posB, posC] = this.winningConditions[i];
            const value1 = this.fields[posA - 1];
            const value2 = this.fields[posB - 1];
            const value3 = this.fields[posC - 1];
            if (value1 === value2 && value1 === value3 && value1 !== "") this.gameEnd = true;
            }
        }
        if (this.gameEnd)alert('Koniec gry')
    }
}

class Board{        //obsługa DOM
    fieldElements = document.querySelectorAll('.board__field');
    constructor(onFieldClick){
        this.fieldElements.forEach(field=>{
            field.addEventListener('click', onFieldClick)
        })
    }
    makeMove(fieldPos, player){
       const clickedFieldEl = this.fieldElements[fieldPos];
       clickedFieldEl.classList.add(`clicked_by_${player}`);
    }
}

const game = new Game();
game.init();
