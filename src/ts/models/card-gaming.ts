import { Card } from "./card.class";
import { cardGamingInnerHTML } from "../templates";

/**
 * Card implementation for the gaming theme.
 */
export class CardGaming extends Card {
  /**
   * Creates a themed card and renders its HTML markup.
   *
   * @param $src - The icon asset file name.
   * @param $altText - The accessible alt text for the icon.
   */
  constructor($src: string, $altText: string) {
    super($src);
    this.createCards($src, $altText);
  }

  /**
   * Renders the card with the gaming visual markup.
   *
   * @param src - The icon asset file name.
   * @param altText - The accessible alt text for the icon.
   */
  createCards(src: string, altText: string) {
    super.createDivElement();
    this.cardEl.innerHTML = cardGamingInnerHTML(src, altText);
  }

  /**
   * Builds the HTML structure for a gaming card.
   *
   * @param $src - The icon asset file name.
   * @param $altText - The accessible alt text for the icon.
   * @returns The generated card markup as a string.
   */
}
