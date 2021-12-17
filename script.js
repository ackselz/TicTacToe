// const Gameboard = (() => {
//     let gameboard = [];
//     return {gameboard};
// })()

// const playerFactory = (name) => {
//     this.name = name;
// }

// const render = function() {
//     for (let i = 0; i < 9; i++) {
//         let cell = document.getElementById(`${i}`)
//         cell.textContent = Gameboard.gameboard[i];
//     }
// }

// let turnTracker = 0;
// const p1 = [];
// const p2 = [];

// const click = function(e) {
//     console.log(e);
//     if (Gameboard.gameboard[e.target.id]) {
//         return;
//     }
//     else if (turnTracker === 0) {
//         Gameboard.gameboard[e.target.id] = "X";
//         turnTracker = 1;
//         console.table(Gameboard.gameboard);
//         p1.push(parseInt(e.target.id));
//         console.table(p1);
//     }
//     else {
//         Gameboard.gameboard[e.target.id] = "O";
//         turnTracker = 0;
//         console.table(Gameboard.gameboard);
//         p2.push(parseInt(e.target.id));
//         console.table(p2);
//     }
//     render();
//     check();
// }

// const container = document.querySelector(".container")

// container.addEventListener("click", click)

// const winCon = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6],
// ]

// const check = function() {
//     if (p1.length < 3) {
//         return;
//     }
//     for (let i = 0; i < 8; i++){
//         // let result = p1.every(element => winCon[i].includes(element));
//         let result = winCon[i].every(element => p1.includes(element));
//         if (result) {
//             console.log("win");
//             Gameboard.gameboard = [];
//             p1.length = 0;
//             p2.length = 0;
//             render();
//             return;
//         }
//     }
// }

const playerOneInput = document.getElementById("player-one");
const playerTwoInput = document.getElementById("player-two");

const playerFactory = (name, moves) => {
    this.name = name;
    this.moves = moves;
    return {name, moves};
}

p1 = playerFactory(playerOneInput.value, []);
p2 = playerFactory(playerTwoInput.value, []);

const TicTacToe = (() => {

    //cache DOM
    const container = document.getElementById("container");
    const message = document.getElementById("message");
    const reset = document.getElementById("reset");
    
    //bind events
    container.addEventListener("click", _mark);
    reset.addEventListener("click", clear);

    let gameboard = [];
    let turnCount = 0;
    let gameEnd = 0;

    const winCon = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];


    if (p1.name) {
        message.textContent = `${p1.name} starts first`;
    }
    else {
        message.textContent = "Player 1 starts first";
    }

    function _render() {
        for (let i = 0; i < 9; i++) {
            let cell = document.getElementById(`${i}`)
            cell.textContent = gameboard[i];
            cell.classList.remove("win");
        }
    };

    function _mark(e) {
        if (gameboard[e.target.id] || !e.target.className.includes("cell") || gameEnd) {
            return;
        }
        else if (turnCount % 2 === 0) {
            gameboard[e.target.id] = "X";
            turnCount++;
            p1.moves.push(parseInt(e.target.id));
            if (p2.name) {
                message.textContent = `${p2.name}'s turn`;
            }
            else {
                message.textContent = "Player 2's turn";
            }
        }
        else {
            gameboard[e.target.id] = "O";
            turnCount++;
            p2.moves.push(parseInt(e.target.id));
            if (p1.name) {
                message.textContent = `${p1.name}'s turn`;
            }
            else {
                message.textContent = "Player 1's turn";
            }
        }
        _render();
        check();
    }
    
    function check() {
        if (turnCount < 4) {
            return;
        }
        if (turnCount > 8) {
            message.classList.add("tie");
            message.textContent = "It is a tie!";
            gameEnd = 1
            return;
        }
        for (let i = 0; i < 8; i++) {
            if (winCon[i].every(element => p1.moves.includes(element))) {
                if (p1.name) {
                    message.textContent = `${p1.name} wins!`;
                }
                else {
                    message.textContent = "Player 1 wins!";
                }
                win(1, i);
                return;
            }
            else if (winCon[i].every(element => p2.moves.includes(element))) {
                if (p2.name) {
                    message.textContent = `${p2.name} wins!`;
                }
                else {
                    message.textContent = "Player 2 wins!";
                }
                win(2, i);
                return;
            }
        }
    }

    function win(player, index) {
        message.classList.add("win");
        for (let i = 0; i < winCon[index].length; i++) {
            let cell = document.getElementById(`${winCon[index][i]}`)
            cell.classList.add("win");
        }
        gameEnd = 1;
    }

    function clear() {
        gameboard = [];
        p1 = playerFactory(playerOneInput.value, []);
        p2 = playerFactory(playerTwoInput.value, []);
        turnCount = 0;
        gameEnd = 0;
        message.className = "";
        
        if (p1.name) {
            message.textContent = `${p1.name} starts first`;
        }
        else {
            message.textContent = "Player 1 starts first";
        }
        _render();
    }

    return {gameboard, check, clear};
})()

