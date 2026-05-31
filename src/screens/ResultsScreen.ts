// Generates the HTML for the results screen.
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

        <div class="button-row">
          <button id="try-again-btn" class="primary-btn">
            Try Again
          </button>

          <button id="results-home-btn" class="secondary-btn">
            Home
          </button>
        </div>
      </div>
    </section>
  `;
}