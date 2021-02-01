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
        [4,5,6]
    ];
    whoWon = '';
    activePlayer = 'O'; 
    gameEnd = false;
    resetBtn = document.getElementById('restartBtn');
    init() {
        this.board = new Board(this.move,this.activePlayer);
        this.resetBtn.addEventListener('click',()=>{
            this.restartGame();
        })
    }
    move = (e)=>{
        const clickedFieldPos = e.target.dataset.pos - 1;
        if (this.fields[clickedFieldPos] === ""){
            this.fields[clickedFieldPos] = this.activePlayer;
            this.board.makeMove(clickedFieldPos, this.activePlayer);
            this.checkIfEnd();
            if(!this.gameEnd) this.changePlayer();
        }
    }
    changePlayer(){
        this.activePlayer==="X" ? this.activePlayer="O" : this.activePlayer="X";
        this.board.displayActivePlayer(this.activePlayer);
    }
    checkIfEnd(){
        if(this.fields.findIndex(field => field === "") === -1) {
            this.gameEnd = true;
            this.whoWon = 'draw'
        }
        else {
            for (let i=0; i < this.winningConditions.length; i++){
                const [posA, posB, posC] = this.winningConditions[i];
                const value1 = this.fields[posA - 1];
                const value2 = this.fields[posB - 1];
                const value3 = this.fields[posC - 1];
                if (value1 === value2 && value1 === value3 && value1 !== "") {
                    this.gameEnd = true;
                    this.whoWon = `${this.activePlayer}`
                }
            }
        }
        if (this.gameEnd){
            this.board.blockEventListeners();
            this.board.displayWinner(this.whoWon);
        }
    }
    restartGame(){
        this.fields = ["","","","","","","","",""];
        this.whoWon = '';
        this.activePlayer = 'O'; 
        this.gameEnd = false;
        this.board.clearBoard(this.activePlayer);
    }
}
class Board{        //obsługa DOM
    fieldElements = document.querySelectorAll('.board__field');
    playerText = document.querySelector('.player');
    messageText = document.querySelector('.message');
    resetBtn = document.getElementById('restartBtn');
    constructor(onFieldClick,activePlayer){
        this.playerText.innerHTML = `Player ${activePlayer} begins.`;
        this.fieldElements.forEach(field=>{
            field.addEventListener('click', onFieldClick)
        });
    }
    makeMove(fieldPos, player){
       const clickedFieldEl = this.fieldElements[fieldPos];
       clickedFieldEl.classList.add(`clicked_by_${player}`);
    }
    blockEventListeners(){
        this.fieldElements.forEach(field=>{
            field.classList.add('board__field--inactive');
        })
    }
    unblockEventListeners(){
        this.fieldElements.forEach(field=>{
            field.classList.remove('board__field--inactive');
        })
    }
    displayActivePlayer(player){
        this.playerText.innerText = `Now it's player's ${player} turn`;
    }
    displayWinner(winner){
        this.messageText.classList.remove('message--inactive');
        if(winner==='draw') {
            this.messageText.innerHTML = `Equal game! It's a draw!`;
            this.playerText.innerHTML = 'Draw';
        }
        else{
            this.messageText.innerHTML = `Nice game! The winner is player ${winner}`;
            this.playerText.innerHTML = 'Game End';
        }
    }
    clearBoard(player){
        this.playerText.innerHTML = `Player ${player} begins.`;
        this.fieldElements.forEach(field=>{
            field.classList.remove('clicked_by_O');
            field.classList.remove('clicked_by_X');
        });
        this.messageText.classList.add('message--inactive');
        this.messageText.innerHTML = ``;
        this.unblockEventListeners();
    }
}


const game = new Game();
game.init();
