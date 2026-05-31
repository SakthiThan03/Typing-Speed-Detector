import type { TypingResult } from "../models/CareerStats";

// Generates the statistics screen.
export function StatsScreen(results: TypingResult[]): string {
  // Total completed typing tests.
  const totalTests = results.length;

  // Calculate average WPM.
  const averageWpm =
    totalTests === 0
      ? 0
      : Math.round(
          results.reduce((sum, result) => sum + result.wpm, 0) / totalTests
        );

  // Calculate average accuracy.
  const averageAccuracy =
    totalTests === 0
      ? 0
      : Math.round(
          results.reduce((sum, result) => sum + result.accuracy, 0) /
            totalTests
        );

  // Calculate average completion time.
  const averageTime =
    totalTests === 0
      ? 0
      : Math.round(
          results.reduce((sum, result) => sum + result.time, 0) / totalTests
        );

  // Find the highest WPM ever achieved.
  const bestWpm =
    totalTests === 0 ? 0 : Math.max(...results.map((result) => result.wpm));

  return `
    <section class="screen stats-screen">
      <div class="card">
        <h1>Career Stats</h1>

        <p>Total Tests: ${totalTests}</p>
        <p>Average WPM: ${averageWpm}</p>
        <p>Average Accuracy: ${averageAccuracy}%</p>
        <p>Average Time: ${averageTime}s</p>
        <p>Best WPM: ${bestWpm}</p>

        <button id="back-home-btn" class="primary-btn">
          Back Home
        </button>

        <button id="clear-stats-btn" class="secondary-btn">
          Clear Stats
        </button>
      </div>
    </section>
  `;
}