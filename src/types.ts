/**
 * Configuration options for passcode generation
 */
export type GeneratePasscodeOptions = {
  /** Separator between words and number (default: "-") */
  separator?: string;
  /** Minimum number value (default: 10) */
  numberMin?: number;
  /** Maximum number value (default: 99) */
  numberMax?: number;
  /** Number of words to include (default: 2) */
  words?: number;
  /** Word casing style (default: "lower") */
  wordCase?: "lower" | "upper" | "capital";
  /** Word list style/theme (default: "default") */
  style?: "default" | "funny" | "romantic";
  /** Prepend a themed emoji (default: false) */
  emoji?: boolean;
  /** Custom random function for deterministic output (default: Math.random) */
  randomFn?: () => number;
};

/**
 * Options for converting passcode to speakable format
 */
export type SpeakableOptions = {
  /** Include phonetic alphabet prefix (default: true) */
  phoneticPrefix?: boolean;
};

/**
 * Word list structure organized by style
 */
export type WordLists = {
  default: string[];
  funny: string[];
  romantic: string[];
};

/**
 * Emoji mappings for styles
 */
export type EmojiMap = {
  default: string[];
  funny: string[];
  romantic: string[];
};
