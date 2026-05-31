// Import application styling.
import "./styles/app.css";

// Import quote data.
import { getRandomQuote } from "./data/quotes";

// Import screen generators.
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { TypingScreen } from "./screens/TypingScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { StatsScreen } from "./screens/StatsScreen";

// Import career statistics helpers.
import {
  clearTypingResults,
  getTypingResults,
  saveTypingResult
} from "./models/CareerStats";

// Root app container from index.html.
const app = document.querySelector<HTMLDivElement>("#app")!;

// Stores the quote for the current typing test.
let currentQuote = "";

// Stores when the user starts typing.
let startTime: number | null = null;

// Stores final results before showing the results screen.
let finalWpm = 0;
let finalAccuracy = 100;
let finalTime = 0;

// Shows the welcome screen.
function showWelcomeScreen(): void {
  app.innerHTML = WelcomeScreen();

  const beginButton = document.querySelector<HTMLButtonElement>("#begin-btn");
  const statsButton = document.querySelector<HTMLButtonElement>("#stats-btn");

  // Start a new typing test.
  beginButton?.addEventListener("click", () => {
    showTypingScreen();
  });

  // Open the career stats screen.
  statsButton?.addEventListener("click", () => {
    showStatsScreen();
  });
}

// Shows the typing screen.
function showTypingScreen(): void {
  currentQuote = getRandomQuote();
  startTime = null;

  app.innerHTML = TypingScreen(currentQuote);

  const input = document.querySelector<HTMLTextAreaElement>("#typing-input");
  const timeDisplay = document.querySelector<HTMLSpanElement>("#time");
  const wpmDisplay = document.querySelector<HTMLSpanElement>("#wpm");
  const accuracyDisplay = document.querySelector<HTMLSpanElement>("#accuracy");
  const restartButton = document.querySelector<HTMLButtonElement>("#restart-btn");
  const homeButton = document.querySelector<HTMLButtonElement>("#home-btn");

  input?.focus();

  input?.addEventListener("input", () => {
    if (!input) {
      return;
    }

    // Start timer after first typed character.
    if (startTime === null) {
      startTime = Date.now();
    }

    const typedText = input.value;

    // Elapsed time in seconds.
    const elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTime) / 1000)
    );

    // Calculate typed words.
    const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;

    // Convert seconds to minutes for WPM formula.
    const minutes = elapsedSeconds / 60;

    // Words Per Minute = words typed / minutes elapsed.
    const wpm = Math.round(wordsTyped / minutes);

    // Count correctly typed characters.
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentQuote[i]) {
        correctCharacters++;
      }
    }

    // Accuracy = correct characters / total typed characters.
    const accuracy =
      typedText.length === 0
        ? 100
        : Math.round((correctCharacters / typedText.length) * 100);

    // Update live stats.
    if (timeDisplay) {
      timeDisplay.textContent = String(elapsedSeconds);
    }

    if (wpmDisplay) {
      wpmDisplay.textContent = String(wpm);
    }

    if (accuracyDisplay) {
      accuracyDisplay.textContent = String(accuracy);
    }

    // End the test when the user exactly matches the quote.
    if (typedText === currentQuote) {
      finalWpm = wpm;
      finalAccuracy = accuracy;
      finalTime = elapsedSeconds;

      // Save result to career stats.
      saveTypingResult({
        wpm: finalWpm,
        accuracy: finalAccuracy,
        time: finalTime,
        date: new Date().toISOString()
      });

      showResultsScreen();
    }
  });

  // Restart with a new quote.
  restartButton?.addEventListener("click", () => {
    showTypingScreen();
  });

  // Return to the welcome screen.
  homeButton?.addEventListener("click", () => {
    showWelcomeScreen();
  });
}

// Shows the results screen.
function showResultsScreen(): void {
  app.innerHTML = ResultsScreen(finalWpm, finalAccuracy, finalTime);

  const tryAgainButton = document.querySelector<HTMLButtonElement>("#try-again-btn");
  const homeButton =
    document.querySelector<HTMLButtonElement>("#results-home-btn");

  // Start another typing test.
  tryAgainButton?.addEventListener("click", () => {
    showTypingScreen();
  });

  // Return to welcome screen.
  homeButton?.addEventListener("click", () => {
    showWelcomeScreen();
  });
}

// Shows the career stats screen.
function showStatsScreen(): void {
  const results = getTypingResults();

  app.innerHTML = StatsScreen(results);

  const backHomeButton = document.querySelector<HTMLButtonElement>("#back-home-btn");
  const clearStatsButton =
    document.querySelector<HTMLButtonElement>("#clear-stats-btn");

  // Return to welcome screen.
  backHomeButton?.addEventListener("click", () => {
    showWelcomeScreen();
  });

  // Clear all saved stats.
  clearStatsButton?.addEventListener("click", () => {
    clearTypingResults();
    showStatsScreen();
  });
}

// Start the app on the welcome screen.
showWelcomeScreen();