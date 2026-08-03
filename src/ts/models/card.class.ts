import { cards } from "../game-config";

/**
 * Base class for all memory game cards.
 */
export class Card {
  /** The DOM button element rendered for the card. */
  cardEl: HTMLButtonElement;
  /** The icon identifier derived from the source filename. */
  icon: string;
  /** Indicates whether the card has already been matched. */
  isSolved: boolean;

  /**
   * Creates a new card instance.
   *
   * @param $src - The file name of the card icon asset.
   */
  constructor($src: string) {
    this.cardEl = document.createElement("button");
    this.icon = $src.slice(0, $src.indexOf("."));
    this.isSolved = false;
  }

  /**
   * Registers the card in the DOM and adds the shared card styling classes.
   */
  createDivElement() {
    this.cardEl.classList.add("card", "card--game");
    cards.push(this);
  }
}
