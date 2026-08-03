import { cards } from "./game-config";

export class Card {
  cardEl: HTMLButtonElement;
  icon: string;
  isSolved: boolean;

  constructor($src: string) {
    this.cardEl = document.createElement("button");
    this.icon = $src.slice(0, $src.indexOf("."));
    this.isSolved = false;
  }

  createDivElement() {
    this.cardEl.classList.add("card", "card--game");
    cards.push(this);
  }
}

export class CardCodeVibes extends Card {
  constructor($src: string, $altText: string) {
    super($src);
    this.createCards($src, $altText);
  }

  createCards(src: string, altText: string) {
    super.createDivElement();
    this.cardEl.innerHTML = this.cardCodeVibesInnerHTML(src, altText);
  }

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

export class CardGaming extends Card {
  constructor($src: string, $altText: string) {
    super($src);

    this.createCards($src, $altText);
  }

  createCards(src: string, altText: string) {
    super.createDivElement();
    this.cardEl.innerHTML = this.cardGamingInnerHTML(src, altText);
  }

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
