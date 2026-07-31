import "./scss/main.scss";
let theme = "code vibes";
let playerColor = "blue";
let amountOfCards = 16;

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
    const target = event.target as HTMLInputElement;

    if (fieldset.id === "game-themes")
      selectTheme(target.value as "code vibes" | "gaming");
    else if (fieldset.id === "players")
      selectPlayer(target.value as "blue" | "orange");
    else if (fieldset.id === "board-sizes")
      selectBoardSize(target.value as "16" | "24" | "32");
  });
});

function selectTheme(selectedTheme: "code vibes" | "gaming") {
  theme = selectedTheme;
  const body = document.querySelector("body");
  if (body) {
    body.dataset.theme = theme;
  }
  updateSelectedTheme();
}

function updateSelectedTheme() {
  const selectedThemeRef = document.getElementById("chosen-theme");
  if (selectedThemeRef) {
    if (theme === "code vibes") selectedThemeRef.innerText = "Code Vibes Theme";
    else selectedThemeRef.innerText = "Game Theme";
  }
}

function selectPlayer(selectedPlayer: "blue" | "orange") {
  const selectedPlayerRef = document.getElementById("chosen-player");
  playerColor = selectedPlayer;
  if (selectedPlayerRef)
    selectedPlayerRef.textContent =
      playerColor[0].toUpperCase() + playerColor.slice(1) + " Player";
}

function selectBoardSize(selectedBoardSize: "16" | "24" | "32") {
  const selectedSizeRef = document.getElementById("chosen-board-size");
  amountOfCards = Number(selectedBoardSize);
  if (selectedSizeRef)
    selectedSizeRef.textContent = "Board-" + amountOfCards + " Cards";
}
