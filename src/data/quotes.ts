/**
 * Collection of quotes used during typing tests.
 */
export const quotes: string[] = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when learning to type.",
  "Programming is the art of telling a computer what to do.",
  "Type quickly, but focus on accuracy first.",
  "Success is the sum of small efforts repeated daily."
];

/**
 * Returns a random quote from the quote list.
 */
export function getRandomQuote(): string {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}