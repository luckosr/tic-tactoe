class Game {        //logika gry
    fields = ["","","","","","","","",""];
    winningConditions = [
        [1,2,3],
        [1,5,9],
        [1,4,7],
        [3,6,9],
        [3,5,7],
        [2,5,8],
        [7,8,9]
    ];
    activePlayer = 'X'; 
    gameEnd = false;
    init() {
        this.board = new Board(this.move);
    }
    move = (e)=>{
        const clickedFieldPos = e.target.dataset.pos - 1;
        if (this.fields[clickedFieldPos] === ""){
            this.fields[clickedFieldPos] = this.activePlayer;
            this.board.makeMove();
        }
    }
}

class Board{        //obsługa DOM
    fieldElements = document.querySelectorAll('.board__field');
    constructor(onFieldClick){
        this.fieldElements.forEach(field=>{
            field.addEventListener('click', onFieldClick)
        })
    }
    makeMove(){
        console.log('test');
    }
}

const game = new Game();
game.init();
