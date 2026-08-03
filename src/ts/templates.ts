/**
 * Builds the HTML structure for a gaming card.
 *
 * @param $src - The icon asset file name.
 * @param $altText - The accessible alt text for the icon.
 * @returns The generated card markup as a string.
 */

export function cardGamingInnerHTML($src: string, $altText: string): string {
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

/**
 * Builds the HTML structure for a code-vibes card.
 *
 * @param $src - The icon asset file name.
 * @param $altText - The accessible alt text for the icon.
 * @returns The generated card markup as a string.
 */
export function cardCodeVibesInnerHTML($src: string, $altText: string): string {
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
