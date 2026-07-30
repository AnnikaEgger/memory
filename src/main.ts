import "./scss/main.scss";
let theme = "code vibes";

init();

function init() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(
        ".card",
      ) as HTMLButtonElement;
      if (card) {
        card.classList.toggle("is-flipped");
      }
    });
  }
}

const fieldsets = document.querySelectorAll(".game-settings__group");

fieldsets.forEach((fieldset) => {
  fieldset.addEventListener("change", (event) => {
    if (fieldset.id === "game-themes") {
      const target = event.target as HTMLInputElement;
      selectTheme(target.value);
      styleGamePreview();
    } else if (fieldset.id === "players") {
    } else if (fieldset.id === "board-sizes") {
    }
  });
});

function selectTheme(selectedTheme: string) {
  theme = selectedTheme;
  console.log(theme);
}

function styleGamePreview() {}
