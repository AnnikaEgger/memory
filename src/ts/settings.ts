import "../scss/main.scss";
import "../scss/pages/settings.scss";
import { gameConfig } from "./game-config";
import { GameConfigInt } from "./game-config";
import { CardsAmount } from "./game-config";

const fieldsets = document.querySelectorAll(".game-settings__group");
const startGameBtn = document.getElementById(
  "start-game-btn",
) as HTMLButtonElement;
const body = document.getElementById("settings-body");
let themeBefore: string;
let hasTriggered = false;

init();

/**
 * Initializes the settings page, restores any saved configuration, and updates the UI.
 */
function init() {
  addEventListeners();
  applyPreviousSettings();
  updateSelectedTheme();
  setTimeout(checkIfEverythingIsSelected, 500);
}

/**
 * Registers all event listeners for the settings interactions.
 */
function addEventListeners() {
  addSettingsOptionsEventListener();
  addStartGameBtnEventListener();
  addFieldsetsChangeListeners();
  addCodeVibesOptionEventListeners();
  addGameOptionEventListeners();
}

/**
 * Enables flipping of the preview card when the user clicks it.
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

/**
 * Starts the game when the start button is clicked.
 */
function addStartGameBtnEventListener() {
  startGameBtn?.addEventListener("click", () => {
    location.href = "game.html";
  });
}

/**
 * Listens for changes in each settings fieldset and updates the game configuration.
 */
function addFieldsetsChangeListeners() {
  fieldsets.forEach((fieldset) => {
    fieldset.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      checkIfEverythingIsSelected();
      if (fieldset instanceof HTMLFieldSetElement)
        selectCurrentOption(fieldset, target);
      setGameConfigToLocalStorage();
    });
  });
}

/**
 * Restores the previously saved configuration from local storage, if available.
 */
function applyPreviousSettings() {
  const savedConfig = localStorage.getItem("gameConfig");

  if (savedConfig) {
    const previousConfig: GameConfigInt = JSON.parse(savedConfig);
    Object.assign(gameConfig, previousConfig);
    applyGameConfigToOptions();
  }
}

/**
 * Applies the current game configuration values to the matching radio buttons.
 */
function applyGameConfigToOptions() {
  checkRadioButton(gameConfig.theme);
  checkRadioButton(gameConfig.playerColor);
  checkRadioButton(gameConfig.amountOfCards);
  selectTheme(gameConfig.theme);
  selectBoardSize(gameConfig.amountOfCards);
  selectPlayer(gameConfig.playerColor);
}

/**
 * Checks the matching radio input for a given value.
 *
 * @param value - The stored configuration value to match against the input element.
 */
function checkRadioButton(value: string | number) {
  const input = document.querySelector(`input[value="${value}"]`);
  if (input instanceof HTMLInputElement) input.checked = true;
}

/**
 * Routes the selected option to the appropriate configuration handler.
 *
 * @param fieldset - The fieldset that contains the changed input.
 * @param target - The selected radio button input.
 */
function selectCurrentOption(
  fieldset: HTMLFieldSetElement,
  target: HTMLInputElement,
) {
  if (fieldset.id === "game-themes")
    selectTheme(target.value as "code vibes" | "gaming");
  else if (fieldset.id === "players")
    selectPlayer(target.value as "blue" | "orange");
  else if (fieldset.id === "board-sizes")
    selectBoardSize(target.value as "16" | "24" | "36");
}

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
function selectBoardSize(selectedBoardSize: string | number) {
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

/**
 * Attaches hover listeners to the Code Vibes option for theme previewing.
 */
function addCodeVibesOptionEventListeners() {
  const codeVibesOption = document.getElementById("code-vibes-option");

  if (codeVibesOption) {
    codeVibesOption.addEventListener("mouseenter", () => {
      handleThemeOptionMouseEnter("code vibes");
    });
    codeVibesOption.addEventListener("mouseleave", handleThemeOptionMouseLeave);
  }
}

/**
 * Attaches hover listeners to the gaming option for theme previewing.
 */
function addGameOptionEventListeners() {
  const gameOption = document.getElementById("game-theme-option");

  if (gameOption) {
    gameOption.addEventListener("mouseenter", () => {
      handleThemeOptionMouseEnter("gaming");
    });
    gameOption.addEventListener("mouseleave", handleThemeOptionMouseLeave);
  }
}

/**
 * Temporarily previews the hovered theme on the settings page.
 *
 * @param theme - The theme name to preview.
 */
function handleThemeOptionMouseEnter(theme: string) {
  if (hasTriggered) return;
  hasTriggered = true;

  if (body) {
    if (body.dataset.theme) themeBefore = body?.dataset.theme;
    body.dataset.theme = theme;
  }
}

/**
 * Restores the previously active theme after the hover preview ends.
 */
function handleThemeOptionMouseLeave() {
  hasTriggered = false;
  if (body) body.dataset.theme = themeBefore;
}
