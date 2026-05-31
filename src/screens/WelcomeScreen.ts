// Generates the HTML for the welcome screen.
export function WelcomeScreen(): string {
  return `
    <section class="screen welcome-screen">
      <div class="card">
        <h1>Typing Speed Detector</h1>

        <p>
          Test your typing speed, accuracy, and focus.
        </p>

        <button id="begin-btn" class="primary-btn">
          Begin Test
        </button>

        <button id="stats-btn" class="secondary-btn">
          View Career Stats
        </button>
      </div>
    </section>
  `;
}