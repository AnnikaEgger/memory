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
