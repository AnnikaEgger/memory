import "./scss/main.scss";

import { gameConfig } from "./ts/game-config";

export function setDataTheme() {
  document.querySelector("body")?.setAttribute("data-theme", gameConfig.theme);
}

export function getGameConfigFromLocalStorage() {
  const storedConfig = localStorage.getItem("gameConfig");
  if (storedConfig) {
    const parsedConfig = JSON.parse(storedConfig);
    gameConfig.theme = parsedConfig.theme;
    gameConfig.playerColor = parsedConfig.playerColor;
    gameConfig.amountOfCards = parsedConfig.amountOfCards;
  }
}
