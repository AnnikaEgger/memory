import "../scss/main.scss";
import "../scss/pages/settings.scss";
import { gameConfig } from "./game-config";

/** Reference to all settings fieldsets. */
const fieldsets = document.querySelectorAll(".game-settings__group");
/** Button that starts the game once all settings are selected. */
const startGameBtn = document.getElementById(
  "start-game-btn",
) as HTMLButtonElement;
/** The main settings body element used for temporary theme previews. */
const body = document.getElementById("settings-body");
/** Stores the previously active theme before previewing another one. */
let themeBefore: string;
/** Tracks whether the hover preview effect has already been triggered. */
let hasTriggered = false;

init();

/**
 * Initializes the settings page interactions and updates the visible theme label.
 */
function init() {
  addSettingsOptionsEventListener();
  updateSelectedTheme();
}

/**
 * Adds click handling to the preview card so users can flip it visually.
 */
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

/**
 * Stores the current game configuration in local storage.
 */
function setGameConfigToLocalStorage() {
  localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
}

/**
 * Updates the selected theme in the global config and UI.
 *
 * @param selectedTheme - The chosen theme name.
 */
function selectTheme(selectedTheme: "code vibes" | "gaming") {
  gameConfig.theme = selectedTheme;
  const body = document.querySelector("body");
  if (body) body.dataset.theme = gameConfig.theme;

  themeBefore = gameConfig.theme;
  updateSelectedTheme();
}

/**
 * Updates the visible label showing the selected theme.
 */
function updateSelectedTheme() {
  const selectedThemeRef = document.getElementById("chosen-theme");
  if (selectedThemeRef) {
    if (gameConfig.theme === "code vibes")
      selectedThemeRef.innerText = "Code Vibes Theme";
    else selectedThemeRef.innerText = "Game Theme";
  }
}

/**
 * Updates the displayed player choice and the global player config.
 *
 * @param selectedPlayer - The selected player color.
 */
function selectPlayer(selectedPlayer: "blue" | "orange") {
  const selectedPlayerRef = document.getElementById("chosen-player");
  gameConfig.playerColor = selectedPlayer;
  if (selectedPlayerRef)
    selectedPlayerRef.textContent =
      gameConfig.playerColor[0].toUpperCase() +
      gameConfig.playerColor.slice(1) +
      " Player";
}

/**
 * Updates the board size label and the global card count.
 *
 * @param selectedBoardSize - The selected board size as a string value.
 */
function selectBoardSize(selectedBoardSize: "16" | "24" | "32") {
  const selectedSizeRef = document.getElementById("chosen-board-size");
  gameConfig.amountOfCards = Number(selectedBoardSize);
  if (selectedSizeRef)
    selectedSizeRef.textContent =
      "Board-" + gameConfig.amountOfCards + " Cards";
}

/**
 * Enables the start button once all settings groups have a selected value.
 */
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

/**
 * Temporarily previews the hovered theme on the settings page.
 *
 * @param $theme - The theme name to preview.
 */
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

/**
 * Restores the previously active theme after the hover preview ends.
 */
function handleThemeOptionMouseLeave() {
  hasTriggered = false;
  if (body) body.dataset.theme = themeBefore;
}
