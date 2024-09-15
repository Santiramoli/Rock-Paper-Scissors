// Variables
let humanScore = 0;
let computerScore = 0;
let round = 1;
const div = document.getElementById("result");

// Computer choice generator
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

// Human choice
function getHumanChoice() {
    return new Promise((resolve) => {
        const options = document.querySelectorAll('.icon');
        options.forEach(option => {
            option.addEventListener('click', function () {
                resolve(option.id); // Captura el id (rock, paper, o scissors) cuando se hace clic
            });
        });
    });
}

function playRound(humanChoice, computerChoice) {
    let resultMessage;
    if (humanChoice === computerChoice) {
        resultMessage = 'It\'s a tie!';
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultMessage = 'You win!';
    } else {
        resultMessage = 'You lose!';
    }
    
    // Mostrar el resultado en el div y asegurarse de que esté visible
    div.innerHTML = `<strong>Round result: </strong>${resultMessage}`;
    div.style.display = "block";

    return resultMessage;
}

async function playGame() {
    console.log('Game started!');
    
    // Jugar 5 rondas o hasta que termine el juego
    for (let i = round; i <= 5; i++) {
        const humanChoice = await getHumanChoice(); // Espera a que el jugador elija
        console.log('You chose: ' + humanChoice);

        const computerChoice = getComputerChoice();
        console.log('Computer chose: ' + computerChoice);

        const result = playRound(humanChoice, computerChoice);
        console.log(result);

        if (result === 'You win!'){
            humanScore++;
        } else if (result === 'You lose!'){
            computerScore++;
        }

        // Actualizar los puntajes en pantalla
        document.getElementById("round-score").innerHTML = i;
        document.getElementById("player-score").innerHTML = humanScore;
        document.getElementById("computer-score").innerHTML = computerScore;
    }

    // Mostrar resultados finales
    console.log('Final Scores:');
    console.log('Human: ' + humanScore);
    console.log('Computer: ' + computerScore);

    let finalMessage;
    if (humanScore > computerScore) {
        finalMessage = 'You are the overall winner!';
    } else if (humanScore < computerScore) {
        finalMessage = 'The computer wins!';
    } else {
        finalMessage = 'The game is a tie!';
    }

    // Mostrar el mensaje final en el div
    div.innerHTML = `<strong>Final result:</strong> ${finalMessage}`;
    div.style.display = "block";
}

// Reiniciar el juego
function restart() {
    humanScore = 0;
    computerScore = 0;
    round = 1;
    console.clear();
    console.log('Game restarted');
    document.getElementById("round-score").innerHTML = round;
    document.getElementById("player-score").innerHTML = humanScore;
    document.getElementById("computer-score").innerHTML = computerScore;
    div.style.display = "none";  // Ocultar el div al reiniciar el juego
    playGame();
}

restart();
