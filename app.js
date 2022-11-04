const Player = function(marker, name="player 1") {
    const _name = name;
    const _marker = marker;
    let _turn = [false];
    const _cells = [];
    const play = (index) => {
        Board.grid[index][2] = _marker;
        _cells.push(Board.grid[index]);
        _turn[0] = false;
    };
    const getPlayerName = () => _name;
    const getPlayerMarker = () => _marker
    const isPlayerTurn = () => _turn[0];
    const togglePlayerTurn = () => {_turn[0] = true};
    return {play, getPlayerName, isPlayerTurn,togglePlayerTurn, getPlayerMarker}
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
    const isFreeCell = (cell, index=2) => !(cell[index]);
    return {grid, getFreeCellCount, isFreeCell}
})();

const ticTacToe = (function(Player, Board) {
    const player1 = Player("O", "P1");
    const player2 = Player("X", "P2");

    const _domCache = {
        grid: document.querySelector('#grid'),
        tds : grid.querySelectorAll("td"),
    };

    const _render = function(target, content) {
        target.textContent = content
    };
    const _getPlayer = function() {
        if (player1.isPlayerTurn()) {
            player2.togglePlayerTurn()
            return player1
        } else {
            player1.togglePlayerTurn()
            return player2
        }
    }

    const play = function(cellElem) {
        const cellIndex = parseInt(cellElem.dataset["cellIndex"]);
        const cell = Board.grid[cellIndex];
        if (!(Board.isFreeCell(cell))) {
            return
        }
        const player = _getPlayer();
        player.play(cellIndex);
        _render(cellElem, player.getPlayerMarker());
    };

    _domCache.tds.forEach(element => {
       element.addEventListener("click", (e)=>{play(e.target)})
    });
})(Player, Board)