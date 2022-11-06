const Player = function(marker, name="player 1") {
    const _name = name;
    const _marker = marker;
    let _turn = [false];
    const _cells = [];
    const play = (index, cellElem) => {
        Board.grid[index][2] = cellElem;
        _cells.push(Board.grid[index]);
        _turn[0] = false;
    };
    const getPlayerName = () => _name;
    const getPlayerMarker = () => _marker
    const isPlayerTurn = () => _turn[0];
    const togglePlayerTurn = () => {_turn[0] = true};
    const getCells = () => _cells;
    return {
         play,
         getPlayerName,
         isPlayerTurn,
         togglePlayerTurn,
         getPlayerMarker,
         getCells,
        }
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
    const getFreeCell = (index=2) => {
        const cells = [];
        for (let arr of grid) {
            if(arr[index] === null){
                cells.push(arr);
            }
        }
        return cells
    };
    const isFreeCell = (cell, index=2) => !(cell[index]);
    return {
         grid,
         getFreeCell,
         isFreeCell,
        }
})();

const ticTacToe = (function(Player, Board) {
    //Create players for a 2 player game
    const player1 = Player("O", "P1");
    const player2 = Player("X", "P2");

    //Select dom elements that are required for manipulation
    const _domCache = {
        grid: document.querySelector('#grid'),
        tds : grid.querySelectorAll("td"),
    };

    //Display  player moves in the grid
    const _render = function(target, content) {
        target.textContent = content
    };

    //Return the player depending on whose turn it is to play
    const _getPlayer = function() {
        if (player1.isPlayerTurn()) {
            player2.togglePlayerTurn()
            return player1
        } else {
            player1.togglePlayerTurn()
            return player2
        }
    }

    // Player move
    const play = function(cellElem) {
        const cellIndex = parseInt(cellElem.dataset["cellIndex"]);
        const cell = Board.grid[cellIndex];
        if (!(Board.isFreeCell(cell))) {
            return
        }
        const player = _getPlayer();
        player.play(cellIndex, cellElem);
        _render(cellElem, player.getPlayerMarker());
        if (player.getCells().length > 2) {
            endGame(player.getCells())
        }
    }


    const _linearEquations = function(arr) {
        for (let i = 0; i < 3; i++) {
            let cx = 0,
                cy = 0,
                cxy = 0,
                cyx = 0;
            const n = 2;
            for (let [x, y] of arr) {
                switch (true) {
                    case (x == i):
                        cx++;
                        if (cx > n) {
                            return true
                        }
                        break;

                    case (y == i):
                        cy++;
                        if (cy > n) {
                            return true
                        }
                        break;

                    case (y == x):
                        cxy++;
                        if (cxy > n) {
                            return true
                        }
                        break;

                    case (y == (-x + 3)):
                        cxy++;
                        if (cyx > n) {
                            return true
                        }
                        break;
                }
            }
        }
    }

    const endGame = function (arr) {
        if (_linearEquations(arr)) {
            console.log(`won`)
        } else  {
            console.log("draw")
        }
    }

    _domCache.tds.forEach(element => {
       element.addEventListener("click", (e)=>{play(e.target)})
    });
})(Player, Board)