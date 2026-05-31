/**
 * Generates the HTML for the typing test screen.
 *
 * @param quote The quote the user must type.
 * @returns HTML string for the typing screen.
 */
export function TypingScreen(quote: string): string {
  return `
    <section class="screen typing-screen">
      <div class="card wide-card">

        <h1>Typing Test</h1>

        <p id="quote-display" class="quote-text">
          ${quote}
        </p>

        <textarea
          id="typing-input"
          placeholder="Start typing here..."
          autocomplete="off"
          spellcheck="false"
        ></textarea>

        <div class="stats">
          <p>Time: <span id="time">0</span>s</p>
          <p>WPM: <span id="wpm">0</span></p>
          <p>Accuracy: <span id="accuracy">100</span>%</p>
        </div>

        <button id="restart-btn" class="secondary-btn">
          Restart
        </button>

      </div>
    </section>
  `;
}