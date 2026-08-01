import "../scss/main.scss";
import "../scss/pages/game-screen.scss";

import { CardCodeVibes } from "./card.class";
import { CardGaming } from "./card.class";
import { gameConfig } from "./game-config";

const dialog = document.getElementById("quit-game-popup") as HTMLDialogElement;

init();

function init() {
  createCards();
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
  for (let index = 0; index < gameConfig.amountOfCards; index++) {
    if (gameConfig.theme === "code vibes") {
      new CardCodeVibes();
    } else if (gameConfig.theme === "gaming") {
      new CardGaming();
    }
  }
}
