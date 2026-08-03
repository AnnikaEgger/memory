import { cards } from "./game-config";

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
    this.cardEl.innerHTML = this.cardCodeVibesInnerHTML(src, altText);
  }

  /**
   * Builds the HTML structure for a code-vibes card.
   *
   * @param $src - The icon asset file name.
   * @param $altText - The accessible alt text for the icon.
   * @returns The generated card markup as a string.
   */
  cardCodeVibesInnerHTML($src: string, $altText: string): string {
    return `
        <div class="card__inner">
          <div class="card__face card__face--back">
             <img
              class="img-code-vibes code-vibes"
              src="/assets/icons/code-vibes-theme/${$src}"
              alt="${$altText}"
            />
            </div>
          <div class="card__face card__face--front">
               <img
              class="img-code-vibes code-vibes"
              src="/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            />
          </div>
        </div>`;
  }
}

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
    this.cardEl.innerHTML = this.cardGamingInnerHTML(src, altText);
  }

  /**
   * Builds the HTML structure for a gaming card.
   *
   * @param $src - The icon asset file name.
   * @param $altText - The accessible alt text for the icon.
   * @returns The generated card markup as a string.
   */
  cardGamingInnerHTML($src: string, $altText: string): string {
    return `
        <div class="card__inner">
          <div class="card__face card__face--back">
             <img
              class="img-gaming gaming"
              src="/assets/icons/games-theme/${$src}"
              alt="${$altText}"
            />
            </div>
          <div class="card__face card__face--front">
               <img
              class="img-gaming gaming"
              src="/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            />
          </div>
        </div>`;
  }
}
