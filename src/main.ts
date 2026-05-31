// Import application styling.
import "./styles/app.css";

// Import data and screen generators.
import { getRandomQuote } from "./data/quotes";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { TypingScreen } from "./screens/TypingScreen";
import { ResultsScreen } from "./screens/ResultsScreen";

/**
 * Root application container.
 */
const app = document.querySelector<HTMLDivElement>("#app")!;

/*
|--------------------------------------------------------------------------
| Application State
|--------------------------------------------------------------------------
| These variables store data while the user moves between screens.
*/

let currentQuote = "";
let startTime: number | null = null;

let finalWpm = 0;
let finalAccuracy = 100;
let finalTime = 0;

/**
 * Displays the welcome screen.
 */
function showWelcomeScreen(): void {
  app.innerHTML = WelcomeScreen();

  const beginButton = document.querySelector<HTMLButtonElement>("#begin-btn");

  beginButton?.addEventListener("click", () => {
    showTypingScreen();
  });
}

/**
 * Displays the typing test screen and handles live typing calculations.
 */
function showTypingScreen(): void {
  currentQuote = getRandomQuote();
  startTime = null;

  app.innerHTML = TypingScreen(currentQuote);

  const input = document.querySelector<HTMLTextAreaElement>("#typing-input");
  const timeDisplay = document.querySelector<HTMLSpanElement>("#time");
  const wpmDisplay = document.querySelector<HTMLSpanElement>("#wpm");
  const accuracyDisplay = document.querySelector<HTMLSpanElement>("#accuracy");
  const restartButton = document.querySelector<HTMLButtonElement>("#restart-btn");

  input?.focus();

  input?.addEventListener("input", () => {
    if (!input) {
      return;
    }

    // Start the timer only after the user types the first character.
    if (startTime === null) {
      startTime = Date.now();
    }

    const typedText = input.value;

    // Calculate elapsed time in seconds.
    // Math.max prevents division by zero during the first second.
    const elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTime) / 1000)
    );

    /*
    |--------------------------------------------------------------------------
    | WPM Calculation
    |--------------------------------------------------------------------------
    | Words Per Minute = number of typed words / elapsed minutes.
    */
    const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = elapsedSeconds / 60;
    const wpm = Math.round(wordsTyped / minutes);

    /*
    |--------------------------------------------------------------------------
    | Accuracy Calculation
    |--------------------------------------------------------------------------
    | Compare each typed character with the character in the target quote.
    */
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentQuote[i]) {
        correctCharacters++;
      }
    }

    const accuracy =
      typedText.length === 0
        ? 100
        : Math.round((correctCharacters / typedText.length) * 100);

    // Update the stats shown on the screen.
    if (timeDisplay) {
      timeDisplay.textContent = String(elapsedSeconds);
    }

    if (wpmDisplay) {
      wpmDisplay.textContent = String(wpm);
    }

    if (accuracyDisplay) {
      accuracyDisplay.textContent = String(accuracy);
    }

    /*
    |--------------------------------------------------------------------------
    | Test Completion
    |--------------------------------------------------------------------------
    | Once the typed text exactly matches the quote, store final stats
    | and move to the results screen.
    */
    if (typedText === currentQuote) {
      finalWpm = wpm;
      finalAccuracy = accuracy;
      finalTime = elapsedSeconds;

      showResultsScreen();
    }
  });

  restartButton?.addEventListener("click", () => {
    showTypingScreen();
  });
}

/**
 * Displays the final results screen.
 */
function showResultsScreen(): void {
  app.innerHTML = ResultsScreen(finalWpm, finalAccuracy, finalTime);

  const tryAgainButton =
    document.querySelector<HTMLButtonElement>("#try-again-btn");

  tryAgainButton?.addEventListener("click", () => {
    showTypingScreen();
  });
}

// Start the application on the welcome screen.
showWelcomeScreen();