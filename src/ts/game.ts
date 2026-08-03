import "../scss/main.scss";
import "../scss/pages/game-screen.scss";
import { Card } from "./card.class";
import { CardCodeVibes } from "./card.class";
import { CardGaming } from "./card.class";
import { gameConfig } from "./game-config";
import { cards } from "./game-config";
import * as Main from "../main";
import { CARD_ICONS } from "./data";
import { CARD_ICONS_ALT_TEXTS } from "./data";

/** Reference to the quit-game dialog element. */
const dialog = document.getElementById("quit-game-popup") as HTMLDialogElement;
/** Reference to the board container that holds all cards. */
const board = document.getElementById("cards-wrapper");
/** Current score for the blue player. */
let scoreBlue = 0;
/** Current score for the orange player. */
let scoreOrange = 0;
/** The active player whose turn it is. */
let currentPlayer: string;
/** Prevents additional card flips while a move is being evaluated. */
let flipLock = false;

init();

/**
 * Initializes the game by restoring settings, preparing the board,
 * creating cards, and styling the current player indicator.
 */
function init() {
  Main.getGameConfigFromLocalStorage();
  currentPlayer = gameConfig.playerColor;
  if (board) board.classList.add(`cards-${gameConfig.amountOfCards}`);
  Main.setDataTheme();
  createCards();
  shuffleCardsAndAppendToBoard();
  styleCurrentPlayer();
}

document
  .getElementById("exit-btn")
  ?.addEventListener("click", showQuitGamePopup);

document
  .getElementById("back-to-game-btn")
  ?.addEventListener("click", closeQuitGamePopup);

/**
 * Opens the quit-game dialog and triggers its entrance animation.
 */
function showQuitGamePopup() {
  dialog.showModal();
  dialog.classList.add("fly-in");
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeQuitGamePopup();
  }
});

/**
 * Closes the quit-game dialog and removes the active animation class.
 */
function closeQuitGamePopup() {
  dialog.close();
  dialog.classList.remove("fly-in");
}

/**
 * Creates the matching card pairs based on the current game theme.
 */
function createCards() {
  for (let index = 0; index < gameConfig.amountOfCards / 2; index++) {
    if (gameConfig.theme === "code vibes") {
      createNewCard("code vibes", index);
      createNewCard("code vibes", index);
    } else if (gameConfig.theme === "gaming") {
      createNewCard("gaming", index);
      createNewCard("gaming", index);
    }
  }
}

/**
 * Instantiates a new card for the selected theme and icon set.
 *
 * @param $theme - The active theme name, either "code vibes" or "gaming".
 * @param $index - The index used to select the corresponding icon data.
 */
function createNewCard($theme: string, $index: number) {
  if ($theme === "code vibes") {
    new CardCodeVibes(
      CARD_ICONS.code_vibes[$index],
      CARD_ICONS_ALT_TEXTS.code_vibes[$index],
    );
  } else if ($theme === "gaming") {
    new CardGaming(
      CARD_ICONS.gaming[$index],
      CARD_ICONS_ALT_TEXTS.gaming[$index],
    );
  }
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!flipLock && !card.classList.contains("card--matched"))
      card.classList.add("is-flipped");
  });
});

/**
 * Randomly shuffles the generated cards and appends them to the board.
 */
function shuffleCardsAndAppendToBoard() {
  if (board) {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    shuffledCards.forEach((card) => {
      board.appendChild(card.cardEl);
    });
  }
}

board?.addEventListener("click", (event) => {
  if (
    event.target instanceof HTMLButtonElement &&
    event.target.classList.contains("card")
  ) {
    let flippedCards: Card[] = [];
    cards.forEach((card) => {
      if (card.cardEl.classList.contains("is-flipped") && !card.isSolved)
        flippedCards.push(card);
    });
    if (flippedCards.length >= 2) evaluateMove(flippedCards);
  }
});

/**
 * Evaluates the current pair of flipped cards and prepares the next turn.
 *
 * @param $flippedCards - The two cards currently turned face up.
 */
function evaluateMove($flippedCards: Card[]) {
  flipLock = true;
  checkForMatch($flippedCards);
  setTimeout(toggleCurrentPlayer, 500);
}

/**
 * Determines whether the two selected cards form a matching pair.
 *
 * @param flippedCards - The cards to compare.
 */
function checkForMatch(flippedCards: Card[]) {
  const card1 = flippedCards[0].icon;
  const card2 = flippedCards[1].icon;

  if (isMatch(card1, card2)) {
    handleMatch(flippedCards);
  } else handleNoMatch(flippedCards);
}

/**
 * Compares two card icons to check whether they match.
 *
 * @param $icon1 - The icon value of the first card.
 * @param $icon2 - The icon value of the second card.
 * @returns True when both icons are equal, otherwise false.
 */
function isMatch($icon1: string, $icon2: string) {
  return $icon1 === $icon2;
}

/**
 * Handles matching cards by marking them as solved and updating the score.
 *
 * @param flippedCards - The matched pair that should be finalized.
 */
function handleMatch(flippedCards: Card[]) {
  flippedCards.forEach((card) => {
    setTimeout(() => {
      card.cardEl.classList.add("card--matched");
    }, 150);
    card.isSolved = true;
  });

  updateScore();
  if (allCardsSolved()) handleGameEnd();
}

/**
 * Resets the flipped state of non-matching cards after a short delay.
 *
 * @param flippedCards - The cards that should be turned back over.
 */
function handleNoMatch(flippedCards: Card[]) {
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.cardEl.classList.remove("is-flipped");
    });
  }, 500);
}

/**
 * Switches the active player after a turn has been completed.
 */
function toggleCurrentPlayer() {
  currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
  styleCurrentPlayer();
  flipLock = false;
}

/**
 * Updates the visible current-player indicator styling.
 */
function styleCurrentPlayer() {
  document.querySelectorAll(".current-player__svg").forEach((svg) => {
    svg.classList.remove("blue", "orange");
    svg.classList.add(currentPlayer);
  });
}

/**
 * Increments the score for the currently active player.
 */
function updateScore() {
  if (currentPlayer === "blue") scoreBlue++;
  else if (currentPlayer === "orange") scoreOrange++;
  displayScores();
}

/**
 * Updates the score counters displayed in the UI.
 */
function displayScores() {
  const scoreBlueRef = document.getElementById("score-player-blue");
  const scoreOrangeRef = document.getElementById("score-player-orange");
  if (scoreBlueRef) scoreBlueRef.innerText = scoreBlue.toString();
  if (scoreOrangeRef) scoreOrangeRef.innerText = scoreOrange.toString();
}

/**
 * Checks whether every card on the board has been solved.
 *
 * @returns True when all cards are matched, otherwise false.
 */
function allCardsSolved() {
  return cards.every((card) => card.isSolved);
}

/**
 * Finalizes the game, stores the result, and redirects to the end screen.
 */
function handleGameEnd() {
  saveResultsToLocalStorage();

  setTimeout(() => {
    window.location.href = "./endscreen.html";
  }, 1000);
}

/**
 * Persists the final scores and winner information in local storage.
 */
function saveResultsToLocalStorage() {
  localStorage.setItem("winner", getWinner());
  localStorage.setItem("scoreBlue", scoreBlue.toString());
  localStorage.setItem("scoreOrange", scoreOrange.toString());
}

/**
 * Determines the winner based on the final score.
 *
 * @returns The winning player name or "draw" in case of a tie.
 */
function getWinner() {
  if (scoreBlue !== scoreOrange) {
    return scoreBlue > scoreOrange ? "blue" : "orange";
  } else return "draw";
}
