let music = new Audio("music.mp3");
let beep = new Audio("beep.mp3");
let gameover = new Audio("gameover.mp3");
let winmusic = new Audio("winmusic.wav");
let turn = "X";
let isGameOver = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('text');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = null;

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== '')) {
            winner = boxtexts[e[0]].innerText;
        }
    });

    if (winner) {
        document.querySelector('#turn-info').innerText = winner + " won";
        isGameOver = true;


        const winnerImage = document.getElementById('winner-image');
        winnerImage.style.display = 'block';
        winnerImage.style.animation = 'ease-in-out';
        winmusic.play();
    } else if (checkDraw()) {
        document.querySelector('#turn-info').innerText = 'Game Over (Draw)';
        isGameOver = true;
        gameover.play();
    } else {
        document.querySelector('#turn-info').innerText = 'Turn for ' + (turn === 'X' ? 'O' : 'X');
    }
}

const checkDraw = () => {
    let boxtexts = document.getElementsByClassName('text');
    for (let i = 0; i < boxtexts.length; i++) {
        if (boxtexts[i].innerText === '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
    let boxtexts = document.getElementsByClassName('text');
    Array.from(boxtexts).forEach((text) => {
        text.innerText = '';
    });

    turn = "X";
    isGameOver = false;

    document.getElementById('turn-info').innerText = 'Turn for X';

    const winnerImage = document.getElementById('winner-image');
    winnerImage.style.display = 'none';
    winnerImage.style.animation = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    let textbox = document.getElementsByClassName("textbox");
    Array.from(textbox).forEach((element) => {
        let text = element.querySelector('.text');
        element.addEventListener('click', () => {
            if (text.innerText === '' && !isGameOver) {
                text.innerText = turn;
                beep.play();
                checkWin();
                if (!isGameOver) {
                    turn = changeTurn();
                    document.querySelector('#turn-info').innerText = 'Turn for ' + turn;
                }
            } else if (isGameOver) {
                document.querySelector('#turn-info').innerText = 'Game Over';
            }
        });
    });

    document.body.addEventListener('click', () => {
        if (music.paused) {
            music.play();
        }
    });

    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', resetGame);
});



