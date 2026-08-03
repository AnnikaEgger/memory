import { Card } from "./models/card.class";

/**
 * Global game settings used throughout the app.
 */
export const gameConfig: GameConfigInt = {
  /** The currently selected game theme. */
  theme: "code vibes",
  /** The player color that starts the round. */
  playerColor: "blue",
  /** The number of cards shown on the board. */
  amountOfCards: 16,
};

export interface GameConfigInt {
  theme: "code vibes" | "gaming";
  playerColor: "blue" | "orange";
  amountOfCards: number;
}

export type CardsAmount = 16 | 24 | 36;

/**
 * Stores all card instances that are currently rendered in the game.
 */
export let cards: Card[] = [];
