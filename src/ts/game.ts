import "../scss/main.scss";
import "../scss/pages/game-screen.scss";

import { CardCodeVibes } from "./card.class";
import { CardGaming } from "./card.class";
import { gameConfig } from "./game-config";

const dialog = document.getElementById("quit-game-popup") as HTMLDialogElement;

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
    "cone-square.svg",
    "cone-triangel.svg",
    "controller.svg",
    "creeper.svg",
    "cubes.png",
    "gameboy.svg",
    "labyrinth.svg",
    "level-up.svg",
    "pacman-yellow.svg",
    "pacman.svg",
    "play-btn.svg",
    "puzzle.svg",
    "snake.svg",
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
    "Cone Square Icon",
    "Cone Triangle Icon",
    "Controller Icon",
    "Creeper Icon",
    "Cubes Icon",
    "Gameboy Icon",
    "Labyrinth Icon",
    "Level Up Icon",
    "Yellow Pacman Icon",
    "Pacman Icon",
    "Play Button Icon",
    "Puzzle Icon",
    "Snake Icon",
    "Toad Icon",
  ],
};

init();

function init() {
  getGameConfigFromLocalStorage();
  const board = document.getElementById("cards-wrapper");
  if (board) board.classList.add(`cards-${gameConfig.amountOfCards}`);
  document.querySelector("body")?.setAttribute("data-theme", gameConfig.theme);
  createCards();
}

function getGameConfigFromLocalStorage() {
  const storedConfig = localStorage.getItem("gameConfig");
  if (storedConfig) {
    const parsedConfig = JSON.parse(storedConfig);
    gameConfig.theme = parsedConfig.theme;
    gameConfig.playerColor = parsedConfig.playerColor;
    gameConfig.amountOfCards = parsedConfig.amountOfCards;
  }
}

document
  .getElementById("exit-btn")
  ?.addEventListener("click", showQuitGamePopup);

document
  .getElementById("back-to-game-btn")
  ?.addEventListener("click", closeQuitGamePopup);

function showQuitGamePopup() {
  dialog.showModal();
  dialog.style.display = "flex";
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeQuitGamePopup();
  }
});

function closeQuitGamePopup() {
  dialog.close();
  dialog.style.display = "none";
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

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});
