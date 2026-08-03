import "../scss/main.scss";
import "../scss/pages/end-screen.scss";

// import { gameConfig } from "./game-config";
import * as Global from "./global";

init();

function init() {
  Global.getGameConfigFromLocalStorage();
  Global.setDataTheme();

  setTimeout(() => {
    document.getElementById("game-result")?.classList.add("fly-in");
  }, 5000);
}
