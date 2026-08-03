import "../scss/main.scss";
import "../scss/pages/end-screen.scss";
import * as Main from "../main";

const gameResult = document.getElementById("game-result");

init();

/**
 * Initializes the end screen by restoring settings, applying the theme,
 * loading results from storage, and triggering the entrance animation.
 */
function init() {
  Main.getGameConfigFromLocalStorage();
  Main.setDataTheme();
  getResultsFromLocalStorage();
  flyInResults();
}

/**
 * Adds the visual animation class to the results container after a delay.
 */
function flyInResults() {
  setTimeout(() => {
    gameResult?.classList.add("fly-in");
  }, 3000);
}

/**
 * Reads the stored score and winner values from local storage.
 */
function getResultsFromLocalStorage() {
  const scoreBlue = localStorage.getItem("scoreBlue");
  const scoreOrange = localStorage.getItem("scoreOrange");
  const winner = localStorage.getItem("winner");

  if (scoreBlue && scoreOrange) displayScores(scoreBlue, scoreOrange);
  if (winner) displayCorrectGameResult(winner);
}

/**
 * Updates the score labels displayed on the end screen.
 *
 * @param $scoreBlue - The final blue-player score.
 * @param $scoreOrange - The final orange-player score.
 */
function displayScores($scoreBlue: string, $scoreOrange: string) {
  const scoreBlueRef = document.getElementById("score-player-blue");
  const scoreOrangeRef = document.getElementById("score-player-orange");
  if (scoreBlueRef) scoreBlueRef.innerText = $scoreBlue.toString();
  if (scoreOrangeRef) scoreOrangeRef.innerText = $scoreOrange.toString();
}

/**
 * Displays the winner text and applies the matching result styling.
 *
 * @param $winner - The winner value stored in local storage.
 */
function displayCorrectGameResult($winner: string) {
  const winnerText = document.getElementById("winner-text");
  if (winnerText)
    winnerText.innerText =
      $winner.charAt(0).toUpperCase() + $winner.slice(1) + " Player";
  handleGamResultClasses($winner);
}

/**
 * Applies the correct CSS classes for draw, blue, orange, or win states.
 *
 * @param $winner - The winner value used to decide the styling.
 */
function handleGamResultClasses($winner: string) {
  gameResult?.classList.remove("draw", "win", "blue", "orange");

  if ($winner === "draw") gameResult?.classList.add("draw");
  else {
    gameResult?.classList.add("win");
    if ($winner === "blue") gameResult?.classList.add("blue");
    else gameResult?.classList.add("orange");
  }
}
