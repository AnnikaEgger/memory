import "./scss/main.scss";

import { gameConfig } from "./ts/game-config";

/**
 * Applies the current game theme to the document body.
 */
export function setDataTheme() {
  document.querySelector("body")?.setAttribute("data-theme", gameConfig.theme);
}

/**
 * Restores the saved game configuration from local storage.
 */
export function getGameConfigFromLocalStorage() {
  const storedConfig = localStorage.getItem("gameConfig");
  if (storedConfig) {
    const parsedConfig = JSON.parse(storedConfig);
    gameConfig.theme = parsedConfig.theme;
    gameConfig.playerColor = parsedConfig.playerColor;
    gameConfig.amountOfCards = parsedConfig.amountOfCards;
  }
}
