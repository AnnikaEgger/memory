import "../scss/main.scss";
import "../scss/pages/end-screen.scss";

// import { gameConfig } from "./game-config";
import * as Global from "./global";

const gameResult = document.getElementById("game-result");

init();

function init() {
  Global.getGameConfigFromLocalStorage();
  Global.setDataTheme();
  getResultsFromLocalStorage();

  setTimeout(() => {
    gameResult?.classList.add("fly-in");
  }, 5000);
}

function getResultsFromLocalStorage() {
  const scoreBlue = localStorage.getItem("scoreBlue");
  const scoreOrange = localStorage.getItem("scoreOrange");
  const winner = localStorage.getItem("winner");

  if (scoreBlue && scoreOrange) displayScores(scoreBlue, scoreOrange);
  if (winner) displayCorrectGameResult(winner);
}

export function displayScores($scoreBlue: string, $scoreOrange: string) {
  const scoreBlueRef = document.getElementById("score-player-blue");
  const scoreOrangeRef = document.getElementById("score-player-orange");
  if (scoreBlueRef) scoreBlueRef.innerText = $scoreBlue.toString();
  if (scoreOrangeRef) scoreOrangeRef.innerText = $scoreOrange.toString();
}

function displayCorrectGameResult($winner: string) {
  const winnerText = document.getElementById("winner-text");
  if (winnerText)
    winnerText.innerText =
      $winner.charAt(0).toUpperCase() + $winner.slice(1) + " Player";

  gameResult?.classList.remove("draw", "win", "blue", "orange");

  if ($winner === "draw") gameResult?.classList.add("draw");
  else {
    gameResult?.classList.add("win");
    if ($winner === "blue") gameResult?.classList.add("blue");
    else gameResult?.classList.add("orange");
  }
}
