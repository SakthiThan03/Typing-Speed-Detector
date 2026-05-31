// Generates the HTML for the results screen.
// @param wpm Final words per minute score.
// @param accuracy Final accuracy percentage.
// @param time Total completion time.
// @returns HTML string for results screen.
export function ResultsScreen(
  wpm: number,
  accuracy: number,
  time: number
): string {
  return `
    <section class="screen results-screen">
      <div class="card">

        <h1>Results</h1>

        <p class="result-number">${wpm} WPM</p>

        <p>Accuracy: ${accuracy}%</p>
        <p>Time: ${time}s</p>

        <button id="try-again-btn" class="primary-btn">
          Try Again
        </button>

      </div>
    </section>
  `;
}