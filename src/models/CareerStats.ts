// Represents one completed typing test.
export type TypingResult = {
  wpm: number;
  accuracy: number;
  time: number;
  date: string;
};

// Key used to save stats in the browser.
const STORAGE_KEY = "typing-speed-career-stats";

// Saves a completed test result.
export function saveTypingResult(result: TypingResult): void {
  const results = getTypingResults();
  results.push(result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

// Gets all saved test results.
export function getTypingResults(): TypingResult[] {
  const savedResults = localStorage.getItem(STORAGE_KEY);

  if (!savedResults) {
    return [];
  }

  return JSON.parse(savedResults) as TypingResult[];
}

// Deletes all saved stats.
export function clearTypingResults(): void {
  localStorage.removeItem(STORAGE_KEY);
}