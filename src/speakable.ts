import type { SpeakableOptions } from "./types";

const NATO_ALPHABET: Record<string, string> = {
  a: "alpha", b: "bravo", c: "charlie", d: "delta", e: "echo",
  f: "foxtrot", g: "golf", h: "hotel", i: "india", j: "juliet",
  k: "kilo", l: "lima", m: "mike", n: "november", o: "oscar",
  p: "papa", q: "quebec", r: "romeo", s: "sierra", t: "tango",
  u: "uniform", v: "victor", w: "whiskey", x: "xray", y: "yankee",
  z: "zulu",
};

const ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
];

/**
 * Convert a number (0-99) to English words
 */
export function numberToWords(num: number): string {
  if (num < 0 || num > 99) {
    throw new Error("Number must be between 0 and 99");
  }

  if (num < 20) {
    return ONES[num] || "zero";
  }

  const ten = Math.floor(num / 10);
  const one = num % 10;

  if (one === 0) {
    return TENS[ten];
  }

  return `${TENS[ten]}-${ONES[one]}`;
}

/**
 * Get a NATO phonetic alphabet word for a letter
 */
export function getPhoneticLetter(): string {
  const letters = Object.keys(NATO_ALPHABET);
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  return NATO_ALPHABET[randomLetter];
}

/**
 * Convert a passcode to a voice-friendly speakable format
 *
 * @example
 * toSpeakable("mango-river-27")
 * // "alpha mango river twenty-seven"
 *
 * toSpeakable("mango-river-27", { phoneticPrefix: false })
 * // "mango river twenty-seven"
 */
export function toSpeakable(passcode: string, options: SpeakableOptions = {}): string {
  const { phoneticPrefix = true } = options;

  // Remove emoji if present (emoji is typically at the start followed by space)
  const cleanPasscode = passcode.replace(/^[\p{Emoji}\s]+/u, "").trim();

  // Split by common separators
  const parts = cleanPasscode.split(/[-_\s]+/);

  const result: string[] = [];

  // Add phonetic prefix
  if (phoneticPrefix) {
    result.push(getPhoneticLetter());
  }

  for (const part of parts) {
    // Check if part is a number
    const num = parseInt(part, 10);
    if (!isNaN(num) && num >= 0 && num <= 99) {
      result.push(numberToWords(num));
    } else {
      // Keep word as-is (lowercase for consistency)
      result.push(part.toLowerCase());
    }
  }

  return result.join(" ");
}

/**
 * Create a seeded speakable converter with deterministic phonetic prefix
 */
export function createSpeakableConverter(randomFn: () => number = Math.random) {
  const getSeededPhoneticLetter = (): string => {
    const letters = Object.keys(NATO_ALPHABET);
    const randomLetter = letters[Math.floor(randomFn() * letters.length)];
    return NATO_ALPHABET[randomLetter];
  };

  return (passcode: string, options: SpeakableOptions = {}): string => {
    const { phoneticPrefix = true } = options;

    const cleanPasscode = passcode.replace(/^[\p{Emoji}\s]+/u, "").trim();
    const parts = cleanPasscode.split(/[-_\s]+/);
    const result: string[] = [];

    if (phoneticPrefix) {
      result.push(getSeededPhoneticLetter());
    }

    for (const part of parts) {
      const num = parseInt(part, 10);
      if (!isNaN(num) && num >= 0 && num <= 99) {
        result.push(numberToWords(num));
      } else {
        result.push(part.toLowerCase());
      }
    }

    return result.join(" ");
  };
}
