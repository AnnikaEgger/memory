import { Card } from "./card.class";

/**
 * Global game settings used throughout the app.
 */
export const gameConfig = {
  /** The currently selected game theme. */
  theme: "code vibes",
  /** The player color that starts the round. */
  playerColor: "blue",
  /** The number of cards shown on the board. */
  amountOfCards: 16,
};

/**
 * Stores all card instances that are currently rendered in the game.
 */
export let cards: Card[] = [];
