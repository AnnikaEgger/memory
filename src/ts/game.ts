import "../scss/main.scss";
import "../scss/pages/game-screen.scss";

import { Card } from "./card.class";
import { CardCodeVibes } from "./card.class";
import { CardGaming } from "./card.class";
import { gameConfig } from "./game-config";
import { cards } from "./game-config";
import * as Global from "./global";

let scoreBlue = 0;
let scoreOrange = 0;

// import { IconName } from "./literals";

const dialog = document.getElementById("quit-game-popup") as HTMLDialogElement;
const board = document.getElementById("cards-wrapper");

let currentPlayer: string;

const CARD_ICONS = {
  code_vibes: [
    "angular.svg",
    "bootstrap.svg",
    "css.svg",
    "django.svg",
    "firebase.svg",
    "git.svg",
    "github.svg",
    "html.svg",
    "js.svg",
    "node-js.svg",
    "python.svg",
    "react.svg",
    "sass.svg",
    "sql.svg",
    "terminal.svg",
    "ts.svg",
    "vs-code.svg",
    "vue-js.svg",
  ],

  gaming: [
    "banana.svg",
    "card.svg",
    "coin.svg",
    "cone-circle.svg",
    "controller.svg",
    "creeper.svg",
    "cubes.png",
    "gameboy.svg",
    "labyrinth.svg",
    "level-up.svg",
    "cone-square.svg",
    "pacman-yellow.svg",
    "pacman.svg",
    "play-btn.svg",
    "puzzle.svg",
    "snake.svg",
    "cone-triangle.svg",
    "toad.svg",
  ],
};

const CARD_ICONS_ALT_TEXTS = {
  code_vibes: [
    "Angular Icon",
    "Bootstrap Icon",
    "CSS Icon",
    "Django Icon",
    "Firebase Icon",
    "Git Icon",
    "GitHub Icon",
    "HTML Icon",
    "JavaScript Icon",
    "Node.js Icon",
    "Python Icon",
    "React Icon",
    "Sass Icon",
    "SQL Icon",
    "Terminal Icon",
    "TypeScript Icon",
    "VS Code Icon",
    "Vue.js Icon",
  ],
  gaming: [
    "Banana Icon",
    "Card Icon",
    "Coin Icon",
    "Cone Circle Icon",
    "Controller Icon",
    "Creeper Icon",
    "Cubes Icon",
    "Gameboy Icon",
    "Labyrinth Icon",
    "Level Up Icon",
    "Cone Square Icon",
    "Yellow Pacman Icon",
    "Pacman Icon",
    "Play Button Icon",
    "Puzzle Icon",
    "Snake Icon",
    "Cone Triangle Icon",
    "Toad Icon",
  ],
};

init();

function init() {
  Global.getGameConfigFromLocalStorage();
  currentPlayer = gameConfig.playerColor;
  if (board) board.classList.add(`cards-${gameConfig.amountOfCards}`);
  Global.setDataTheme();
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
      new CardCodeVibes(
        CARD_ICONS.code_vibes[index],
        CARD_ICONS_ALT_TEXTS.code_vibes[index],
      );
      new CardCodeVibes(
        CARD_ICONS.code_vibes[index],
        CARD_ICONS_ALT_TEXTS.code_vibes[index],
      );
    } else if (gameConfig.theme === "gaming") {
      new CardGaming(
        CARD_ICONS.gaming[index],
        CARD_ICONS_ALT_TEXTS.gaming[index],
      );
      new CardGaming(
        CARD_ICONS.gaming[index],
        CARD_ICONS_ALT_TEXTS.gaming[index],
      );
    }
  }
}

let timeout: boolean = false;

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!timeout) card.classList.toggle("is-flipped");
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
  setTimeout(() => {
    timeout = true;
    if (
      event.target instanceof HTMLButtonElement &&
      event.target.classList.contains("card")
    ) {
      let flippedCards: Card[] = [];

      cards.forEach((card) => {
        if (card.cardEl.classList.contains("is-flipped") && !card.isSolved) {
          flippedCards.push(card);
        }
      });

      if (flippedCards.length >= 2) {
        checkForMatch(flippedCards);
        setTimeout(toggleCurrentPlayer, 500);
      }
    }
    timeout = false;
  }, 250);
});

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
    card.cardEl.classList.add("card--matched");
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
  window.location.href = "./endscreen.html";
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
