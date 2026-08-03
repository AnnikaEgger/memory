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

const dialog = document.getElementById("quit-game-popup") as HTMLDialogElement;
const board = document.getElementById("cards-wrapper");
let scoreBlue = 0;
let scoreOrange = 0;
let currentPlayer: string;
let flipLock = false;

init();

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

function showQuitGamePopup() {
  dialog.showModal();
  dialog.classList.add("fly-in");
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeQuitGamePopup();
  }
});

function closeQuitGamePopup() {
  dialog.close();
  dialog.classList.remove("fly-in");
}

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

function evaluateMove($flippedCards: Card[]) {
  flipLock = true;
  checkForMatch($flippedCards);
  setTimeout(toggleCurrentPlayer, 500);
}

function checkForMatch(flippedCards: Card[]) {
  const card1 = flippedCards[0].icon;
  const card2 = flippedCards[1].icon;

  if (isMatch(card1, card2)) {
    handleMatch(flippedCards);
  } else handleNoMatch(flippedCards);
}

function isMatch($icon1: string, $icon2: string) {
  return $icon1 === $icon2;
}

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

function handleNoMatch(flippedCards: Card[]) {
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.cardEl.classList.remove("is-flipped");
    });
  }, 500);
}

function toggleCurrentPlayer() {
  currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
  styleCurrentPlayer();
  flipLock = false;
}

function styleCurrentPlayer() {
  document.querySelectorAll(".current-player__svg").forEach((svg) => {
    svg.classList.remove("blue", "orange");
    svg.classList.add(currentPlayer);
  });
}

function updateScore() {
  if (currentPlayer === "blue") scoreBlue++;
  else if (currentPlayer === "orange") scoreOrange++;
  displayScores();
}

function displayScores() {
  const scoreBlueRef = document.getElementById("score-player-blue");
  const scoreOrangeRef = document.getElementById("score-player-orange");
  if (scoreBlueRef) scoreBlueRef.innerText = scoreBlue.toString();
  if (scoreOrangeRef) scoreOrangeRef.innerText = scoreOrange.toString();
}

function allCardsSolved() {
  return cards.every((card) => card.isSolved);
}

function handleGameEnd() {
  saveResultsToLocalStorage();

  setTimeout(() => {
    window.location.href = "./endscreen.html";
  }, 1000);
}

function saveResultsToLocalStorage() {
  localStorage.setItem("winner", getWinner());
  localStorage.setItem("scoreBlue", scoreBlue.toString());
  localStorage.setItem("scoreOrange", scoreOrange.toString());
}

function getWinner() {
  if (scoreBlue !== scoreOrange) {
    return scoreBlue > scoreOrange ? "blue" : "orange";
  } else return "draw";
}
