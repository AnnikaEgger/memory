class Card {
  constructor() {}

  createDivElement(theme: string) {
    const template = document.getElementById(
      "card-template-" + theme,
    ) as HTMLTemplateElement;

    if (template) {
      const cardClone = template.content.cloneNode(true) as HTMLElement;
      document.getElementById("cards-wrapper")?.appendChild(cardClone);
    }

    const div = document.createElement("div");
    div.classList.add("card", "card--game");
    div.innerHTML = this.cardCodeVibesInnerHTML();
  }

  cardCodeVibesInnerHTML(): string {
    return `
    <button class="card card--game">
        <div class="card__inner">
          <div class="card__face card__face--back">
             <img
              class="img-code-vibes code-vibes"
              src="/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            /></div>
          <div class="card__face card__face--front">
            <img
              class="img-code-vibes code-vibes"
              src="/assets/icons/developer-akademie.svg"
              alt="Developer Akademie Icon"
            />
          </div>
        </div>
      </button>`;
  }
}

export class CardCodeVibes extends Card {
  constructor() {
    super();
    this.createDivElement("code-vibes");
  }
}

export class CardGaming extends Card {
  constructor() {
    super();
    this.createDivElement("gaming");
  }
}
