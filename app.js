const Player = function(marker, name="player 1") {
    const _name = name;
    const _marker = marker;
    let _turn = [false];
    let _cells = [];
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
    const reset = () => {_cells = []}
    return {
         play,
         getPlayerName,
         isPlayerTurn,
         togglePlayerTurn,
         getPlayerMarker,
         getCells,
         reset,
        }
}

const Board = (function(size=3) {
    const getGrid = (size=3) => {
        const grid = [];
        for(let y = size-1; y >= 0; y--){
            for(let x = 0; x < size; x++){
                grid.push([x, y, null]);
            }
        }
        return grid
    };
    let grid = getGrid(size);

    const getFreeCells = (index=2) => {
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
         getGrid,
         getFreeCells,
         isFreeCell,
        }
})();

const ticTacToe = (function(Player, Board) {
    //Create players for a 2 player game
    let player1 = Player("O", "P1");
    let player2 = Player("X", "P2");
    let isGameOver = false;

    //Select dom elements that are required for manipulation
    const _domCache = {
        game: document.querySelector('#game'),
        header: game.querySelector("header"),
        footer: game.querySelector("footer"),
        grid: game.querySelector('#grid'),
        tds : grid.querySelectorAll("td"),
        restart: game.querySelector('#restart'),
        multiplayer: game.querySelector("#ismultiplayer"),
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
        if ( isGameOver || !(Board.isFreeCell(cell)) ) {
            return
        }
        const player = _getPlayer();
        player.play(cellIndex, cellElem);
        _render(cellElem, player.getPlayerMarker());
        if (player.getCells().length > 2) {
            endGame(player.getCells(), player.getPlayerName());
        }
    };

    const _linearEquations = function(arr) {
        for (let i = 0; i < 3; i++) {
            let cx = 0,
                cy = 0,
                cxy = 0,
                cyx = 0;
            const n = 2;
            for (let [x, y] of arr) {
                if (x == i) {
                    cx++;
                    if (cx > n) {
                        return true
                    }
                } 
                if (y == i) {
                    cy++;
                    if (cy > n) {
                        return true
                    }
                }
                if (y == x) {
                    cxy++;
                    if (cxy > n) {
                        return true
                    }
                }
                if (y == (-x + 3)) {
                    cyx++;
                    if (cyx > n) {
                        return true
                    }
                };
            }
        }
    }
    const endGame = function (arr, name) {
        if (_linearEquations(arr)) {
            alert(`game over ${name} won`)
            isGameOver = true
        } else if (Board.getFreeCells().length < 1) {
            alert("draw");
            isGameOver = true
        }
    }

    const _resizeToSquare = function() {
        const headerHeight = _domCache.header.clientHeight;
        const footerHeight = _domCache.footer.clientHeight;
        const elem = _domCache.grid.parentElement;
        const elemHeight = document.body.clientHeight - headerHeight - footerHeight - 32//padding
        const minDimension = Math.min(elemHeight, elem.clientWidth);
        _domCache.grid.style.width = `${minDimension}px`;
        _domCache.grid.style.height = `${minDimension}px`;
        console.log("window resized!");
    }
    _resizeToSquare();

    const _restart = function() {
        player1.reset();
        player2.reset();
        Board.grid = Board.getGrid();
        _domCache.tds.forEach((td)=> _render(td, '.'));
    }

    _domCache.tds.forEach(element => {
       element.addEventListener("click", (e)=>{
        play(e.target)
        if (!(_domCache.multiplayer.checked) && (Board.getFreeCells().length > 0)) {
            let randomElem = null;
            while (randomElem == null) {
                const randomInndex = parseInt(Math.random() * Board.grid.length);
                if (Board.isFreeCell(Board.grid[randomInndex])) {
                    randomElem = _domCache.tds[randomInndex];
                }
            }
            setTimeout(()=>{play(randomElem)}, 300);
        }
    })
    });

    window.addEventListener("resize", _resizeToSquare);
    
    _domCache.restart.addEventListener('click', _restart);
})(Player, Board)