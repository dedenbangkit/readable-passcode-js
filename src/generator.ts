import type { GeneratePasscodeOptions } from "./types";
import { words, emojis } from "./words";

const DEFAULT_OPTIONS: Required<Omit<GeneratePasscodeOptions, "randomFn">> & {
  randomFn: () => number;
} = {
  separator: "-",
  numberMin: 10,
  numberMax: 99,
  words: 2,
  wordCase: "lower",
  style: "default",
  emoji: false,
  randomFn: Math.random,
};

/**
 * Pick a random item from an array
 */
function pickRandom<T>(arr: T[], randomFn: () => number): T {
  return arr[Math.floor(randomFn() * arr.length)];
}

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number, randomFn: () => number): number {
  return Math.floor(randomFn() * (max - min + 1)) + min;
}

/**
 * Apply case transformation to a word
 */
function applyCase(word: string, wordCase: "lower" | "upper" | "capital"): string {
  switch (wordCase) {
    case "upper":
      return word.toUpperCase();
    case "capital":
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    case "lower":
    default:
      return word.toLowerCase();
  }
}

/**
 * Generate a human-friendly passcode
 *
 * @example
 * generatePasscode()
 * // "mango-river-27"
 *
 * generatePasscode({ words: 3, emoji: true })
 * // "🌊 ocean-swift-falcon-42"
 *
 * generatePasscode({ style: "funny", wordCase: "capital" })
 * // "Pickle-Llama-73"
 */
export function generatePasscode(options: GeneratePasscodeOptions = {}): string {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const {
    separator,
    numberMin,
    numberMax,
    words: wordCount,
    wordCase,
    style,
    emoji,
    randomFn,
  } = config;

  // Validate number range
  if (numberMin > numberMax) {
    throw new Error("numberMin must be less than or equal to numberMax");
  }

  if (wordCount < 1) {
    throw new Error("words must be at least 1");
  }

  // Get word list for the selected style
  const wordList = words[style];
  const emojiList = emojis[style];

  // Pick random words (avoiding duplicates)
  const selectedWords: string[] = [];
  const availableWords = [...wordList];

  for (let i = 0; i < wordCount && availableWords.length > 0; i++) {
    const index = Math.floor(randomFn() * availableWords.length);
    const word = availableWords.splice(index, 1)[0];
    selectedWords.push(applyCase(word, wordCase));
  }

  // Generate random number
  const number = randomInt(numberMin, numberMax, randomFn);

  // Build passcode
  const parts = [...selectedWords, number.toString()];
  let passcode = parts.join(separator);

  // Add emoji prefix if enabled
  if (emoji) {
    const selectedEmoji = pickRandom(emojiList, randomFn);
    passcode = `${selectedEmoji} ${passcode}`;
  }

  return passcode;
}
