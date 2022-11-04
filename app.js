const Player = function(marker, name="player 1") {
    const _name = name;
    const _marker = marker;
    const _turn = false;
    const _cells = [];
    const play = () => {
        console.log("I played")
    };
    const getPlayerName = () => name;
    return {getPlayerName, play}
}

const Board = (function(size=3) {
    const getGrid = (size) => {
        const grid = [];
        for(let y = size-1; y >= 0; y--){
            for(let x = 0; x < size; x++){
                grid.push([x, y, null]);
            }
        }
        return grid
    };
    const grid = getGrid(size);
    const getFreeCellCount = (index=2) => {
        const count = 0;
        for (let arr of grid) {
            if(arr[index] === ""){
                count++;
            }
        }
        return count
    };
    const isFreeCell = (cell, index=2) => {
        return (cell[2])? true: false
    };
    return {getFreeCellCount, isFreeCell}
})();

const ticTacToe = (function(Player, Board) {
    const player1 = Player("O", "P1");
    const player2 = Player("X", "P2");
    
    const domCache = {
        grid: document.querySelector('#grid'),
    };

    const render = function(target, content) {
        target.textContent = content
    };

    const play = function() {

    }
})()