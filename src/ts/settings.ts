import "../scss/main.scss";
import "../scss/pages/settings.scss";
import { gameConfig } from "./game-config";

const fieldsets = document.querySelectorAll(".game-settings__group");
const startGameBtn = document.getElementById(
  "start-game-btn",
) as HTMLButtonElement;
const body = document.getElementById("settings-body");
let themeBefore: string;
let hasTriggered = false;

init();

function init() {
  addSettingsOptionsEventListener();
  updateSelectedTheme();
}

function addSettingsOptionsEventListener() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(
        ".card",
      ) as HTMLButtonElement;
      if (card) card.classList.toggle("is-flipped");
    });
  }
}

startGameBtn?.addEventListener("click", () => {
  location.href = "game.html";
});

fieldsets.forEach((fieldset) => {
  fieldset.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    checkIfEverythingIsSelected();

    if (fieldset.id === "game-themes")
      selectTheme(target.value as "code vibes" | "gaming");
    else if (fieldset.id === "players")
      selectPlayer(target.value as "blue" | "orange");
    else if (fieldset.id === "board-sizes")
      selectBoardSize(target.value as "16" | "24" | "32");

    setGameConfigToLocalStorage();
  });
});

function setGameConfigToLocalStorage() {
  localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
}

function selectTheme(selectedTheme: "code vibes" | "gaming") {
  gameConfig.theme = selectedTheme;
  const body = document.querySelector("body");
  if (body) body.dataset.theme = gameConfig.theme;

  themeBefore = gameConfig.theme;
  updateSelectedTheme();
}

function updateSelectedTheme() {
  const selectedThemeRef = document.getElementById("chosen-theme");
  if (selectedThemeRef) {
    if (gameConfig.theme === "code vibes")
      selectedThemeRef.innerText = "Code Vibes Theme";
    else selectedThemeRef.innerText = "Game Theme";
  }
}

function selectPlayer(selectedPlayer: "blue" | "orange") {
  const selectedPlayerRef = document.getElementById("chosen-player");
  gameConfig.playerColor = selectedPlayer;
  if (selectedPlayerRef)
    selectedPlayerRef.textContent =
      gameConfig.playerColor[0].toUpperCase() +
      gameConfig.playerColor.slice(1) +
      " Player";
}

function selectBoardSize(selectedBoardSize: "16" | "24" | "32") {
  const selectedSizeRef = document.getElementById("chosen-board-size");
  gameConfig.amountOfCards = Number(selectedBoardSize);
  if (selectedSizeRef)
    selectedSizeRef.textContent =
      "Board-" + gameConfig.amountOfCards + " Cards";
}

function checkIfEverythingIsSelected() {
  const allChecked = Array.from(fieldsets).every((fieldset) => {
    return fieldset.querySelector("input[type='radio']:checked") !== null;
  });

  if (allChecked) {
    startGameBtn.disabled = false;
    document
      .getElementById("chosen-settings")
      ?.classList.add("chosen-settings--final");
  }
}

document
  .getElementById("code-vibes-option")
  ?.addEventListener("mouseenter", () => {
    handleThemeOptionMouseEnter("code vibes");
  });

document
  .getElementById("game-theme-option")
  ?.addEventListener("mouseenter", () => {
    handleThemeOptionMouseEnter("gaming");
  });

function handleThemeOptionMouseEnter($theme: string) {
  if (hasTriggered) return;
  hasTriggered = true;

  if (body) {
    if (body.dataset.theme) themeBefore = body?.dataset.theme;
    body.dataset.theme = $theme;
  }
}

document
  .getElementById("code-vibes-option")
  ?.addEventListener("mouseleave", handleThemeOptionMouseLeave);

document
  .getElementById("game-theme-option")
  ?.addEventListener("mouseleave", handleThemeOptionMouseLeave);

function handleThemeOptionMouseLeave() {
  hasTriggered = false;
  if (body) body.dataset.theme = themeBefore;
}
