class Card {
  div: HTMLDivElement;

  constructor() {
    this.div = document.createElement("div");
  }

  createDivElement() {
    this.div.classList.add("card", "card--game");
    document.getElementById("cards-wrapper")?.appendChild(this.div);
  }
}

export class CardCodeVibes extends Card {
  constructor($src: string, $altText: string) {
    super();
    this.createCards($src, $altText);
  }

  createCards(src: string, altText: string) {
    super.createDivElement();
    this.div.innerHTML = this.cardCodeVibesInnerHTML(src, altText);
  }

  cardCodeVibesInnerHTML($src: string, $altText: string): string {
    return `
    <button class="card card--game">
        <div class="card__inner">
          <div class="card__face card__face--back">
             <img
              class="img-code-vibes code-vibes"
              src="../public/assets/icons/code-vibes-theme/${$src}"
              alt="${$altText}"
            />
            </div>
          <div class="card__face card__face--front">
               <img
              class="img-code-vibes code-vibes"
              src="../public/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            />
          </div>
        </div>
      </button>`;
  }
}

export class CardGaming extends Card {
  constructor($src: string, $altText: string) {
    super();
    this.createCards($src, $altText);
  }

  createCards(src: string, altText: string) {
    super.createDivElement();
    this.div.innerHTML = this.cardGamingInnerHTML(src, altText);
  }

  cardGamingInnerHTML($src: string, $altText: string): string {
    return `
    <button class="card card--game">
        <div class="card__inner">
          <div class="card__face card__face--back">
             <img
              class="img-gaming gaming"
              src="../public/assets/icons/games-theme/${$src}"
              alt="${$altText}"
            />
            </div>
          <div class="card__face card__face--front">
               <img
              class="img-gaming gaming"
              src="../public/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            />
          </div>
        </div>
      </button>`;
  }
}
