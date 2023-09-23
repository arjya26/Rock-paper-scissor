const options = ["rock", "paper", "scissors"];
let leaderboard = [];

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", playRound);
});

let playerScore = 0;
let computerScore = 0;

function playRound(e) {
    const playerChoice = e.target.id;
    const computerChoice = options[Math.floor(Math.random() * 3)];

    const roundResult = getRoundResult(playerChoice, computerChoice);
    displayResult(roundResult, playerChoice, computerChoice);

    if (roundResult === "You win!") {
      leaderboard.unshift({ winner: "Player", choice: getSymbol(playerChoice), time: getCurrentTime() , symbol: clocksymbol()});
        playerScore++;
    } else if (roundResult === "Computer wins!") {
      leaderboard.unshift({ winner: "Computer", choice: getSymbol(computerChoice), time: getCurrentTime(), symbol: clocksymbol() });
        computerScore++;
    }
    updateLeaderboard();
    updateGameState();
    
}

function updateGameState() {
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;

    const playerTrophy = document.getElementById("player-trophy");
    const computerTrophy = document.getElementById("computer-trophy");

    if (playerScore > computerScore) {
        playerTrophy.style.visibility = "visible";
        computerTrophy.style.visibility = "hidden";
    } else if (computerScore > playerScore) {
        playerTrophy.style.visibility = "hidden";
        computerTrophy.style.visibility = "visible";
    } else {
        playerTrophy.style.visibility = "hidden";
        computerTrophy.style.visibility = "hidden";
    }
}



function getRoundResult(player, computer) {
    if (player === computer) return "It's a draw!";
    if ((player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function displayResult(result, playerChoice, computerChoice) {
    const roundResultElement = document.getElementById("round-result");
    roundResultElement.textContent = result;

    const playerChoiceElement = document.createElement("span");
    playerChoiceElement.textContent = ` (Player: ${playerChoice})`;

    const computerChoiceElement = document.createElement("span");
    computerChoiceElement.textContent = ` (Computer: ${computerChoice})`;

    roundResultElement.appendChild(playerChoiceElement);
    roundResultElement.appendChild(computerChoiceElement);
}

/*function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes();
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}*/

function getCurrentTime () {
    const currentDate = new Date ();
    let hours = currentDate.getHours ();
    let minutes = currentDate.getMinutes ();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

function updateLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.symbol} ${entry.time}  ${entry.winner} wins by choosing ${entry.choice}`;
        leaderboardList.appendChild(li);
    });
}

function clocksymbol() {
    return "🕒";
}

function getSymbol(choice) {
    switch (choice) {
        case "rock":
            return "👊"; 
        case "paper":
            return "👋"; 
        case "scissors":
            return "✌";
    }
}
