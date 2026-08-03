import { Card } from "./card.class";
import { cardCodeVibesInnerHTML } from "../templates";

/**
 * Card implementation for the code-vibes theme.
 */
export class CardCodeVibes extends Card {
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
   * Renders the card with the code-vibes visual markup.
   *
   * @param src - The icon asset file name.
   * @param altText - The accessible alt text for the icon.
   */
  createCards(src: string, altText: string) {
    super.createDivElement();
    this.cardEl.innerHTML = cardCodeVibesInnerHTML(src, altText);
  }
}
