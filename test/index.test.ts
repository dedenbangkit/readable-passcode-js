import { describe, it, expect } from "vitest";
import {
  generatePasscode,
  toSpeakable,
  numberToWords,
  createSpeakableConverter,
  words,
} from "../src";

// Seeded random for deterministic tests
function createSeededRandom(seed: number) {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

describe("generatePasscode", () => {
  describe("default output format", () => {
    it("generates passcode with 2 words and a number", () => {
      const passcode = generatePasscode();
      const parts = passcode.split("-");

      expect(parts).toHaveLength(3);
      expect(parts[0]).toMatch(/^[a-z]+$/);
      expect(parts[1]).toMatch(/^[a-z]+$/);
      expect(parseInt(parts[2])).toBeGreaterThanOrEqual(10);
      expect(parseInt(parts[2])).toBeLessThanOrEqual(99);
    });

    it("uses lowercase by default", () => {
      const passcode = generatePasscode({ randomFn: createSeededRandom(42) });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(word).toBe(word.toLowerCase());
      });
    });
  });

  describe("separator customization", () => {
    it("uses custom separator", () => {
      const passcode = generatePasscode({ separator: "_" });
      expect(passcode).toMatch(/^[a-z]+_[a-z]+_\d+$/);
    });

    it("handles empty separator", () => {
      const passcode = generatePasscode({ separator: "" });
      expect(passcode).toMatch(/^[a-z]+[a-z]+\d+$/);
    });

    it("handles space separator", () => {
      const passcode = generatePasscode({ separator: " " });
      expect(passcode).toMatch(/^[a-z]+ [a-z]+ \d+$/);
    });
  });

  describe("number range", () => {
    it("respects numberMin and numberMax", () => {
      for (let i = 0; i < 20; i++) {
        const passcode = generatePasscode({ numberMin: 50, numberMax: 60 });
        const number = parseInt(passcode.split("-").pop()!);

        expect(number).toBeGreaterThanOrEqual(50);
        expect(number).toBeLessThanOrEqual(60);
      }
    });

    it("handles single number range", () => {
      const passcode = generatePasscode({ numberMin: 42, numberMax: 42 });
      const number = parseInt(passcode.split("-").pop()!);

      expect(number).toBe(42);
    });

    it("throws on invalid range", () => {
      expect(() => generatePasscode({ numberMin: 99, numberMax: 10 })).toThrow(
        "numberMin must be less than or equal to numberMax"
      );
    });
  });

  describe("word count", () => {
    it("generates passcode with 1 word", () => {
      const passcode = generatePasscode({ words: 1 });
      const parts = passcode.split("-");

      expect(parts).toHaveLength(2);
    });

    it("generates passcode with 3 words", () => {
      const passcode = generatePasscode({ words: 3 });
      const parts = passcode.split("-");

      expect(parts).toHaveLength(4);
    });

    it("generates passcode with 5 words", () => {
      const passcode = generatePasscode({ words: 5 });
      const parts = passcode.split("-");

      expect(parts).toHaveLength(6);
    });

    it("throws on zero words", () => {
      expect(() => generatePasscode({ words: 0 })).toThrow(
        "words must be at least 1"
      );
    });
  });

  describe("capitalization options", () => {
    it("applies uppercase", () => {
      const passcode = generatePasscode({
        wordCase: "upper",
        randomFn: createSeededRandom(42),
      });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(word).toBe(word.toUpperCase());
      });
    });

    it("applies capital case", () => {
      const passcode = generatePasscode({
        wordCase: "capital",
        randomFn: createSeededRandom(42),
      });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(word[0]).toBe(word[0].toUpperCase());
        expect(word.slice(1)).toBe(word.slice(1).toLowerCase());
      });
    });
  });

  describe("style options", () => {
    it("uses default word list", () => {
      const passcode = generatePasscode({
        style: "default",
        randomFn: createSeededRandom(42),
      });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(words.default).toContain(word);
      });
    });

    it("uses funny word list", () => {
      const passcode = generatePasscode({
        style: "funny",
        randomFn: createSeededRandom(42),
      });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(words.funny).toContain(word);
      });
    });

    it("uses romantic word list", () => {
      const passcode = generatePasscode({
        style: "romantic",
        randomFn: createSeededRandom(42),
      });
      const wordParts = passcode.split("-").slice(0, -1);

      wordParts.forEach((word) => {
        expect(words.romantic).toContain(word);
      });
    });
  });

  describe("emoji mode", () => {
    it("prepends emoji when enabled", () => {
      const passcode = generatePasscode({ emoji: true });

      // Should start with an emoji followed by space
      expect(passcode).toMatch(/^[\p{Emoji}\uFE0F]+ /u);
    });

    it("does not include emoji by default", () => {
      const passcode = generatePasscode();

      // Should not start with emoji
      expect(passcode).toMatch(/^[a-z]/);
    });
  });

  describe("deterministic behavior", () => {
    it("produces same output with same seed", () => {
      const passcode1 = generatePasscode({ randomFn: createSeededRandom(12345) });
      const passcode2 = generatePasscode({ randomFn: createSeededRandom(12345) });

      expect(passcode1).toBe(passcode2);
    });

    it("produces different output with different seeds", () => {
      const passcode1 = generatePasscode({ randomFn: createSeededRandom(12345) });
      const passcode2 = generatePasscode({ randomFn: createSeededRandom(54321) });

      expect(passcode1).not.toBe(passcode2);
    });
  });

  describe("word uniqueness", () => {
    it("does not repeat words in the same passcode", () => {
      // Test with many words to increase chance of catching duplicates
      for (let i = 0; i < 50; i++) {
        const passcode = generatePasscode({ words: 5 });
        const wordParts = passcode.split("-").slice(0, -1);
        const uniqueWords = new Set(wordParts);

        expect(uniqueWords.size).toBe(wordParts.length);
      }
    });
  });
});

describe("toSpeakable", () => {
  describe("number conversion", () => {
    it("converts numbers to words", () => {
      const speakable = toSpeakable("ocean-river-27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });

    it("handles teens", () => {
      const speakable = toSpeakable("ocean-river-15", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river fifteen");
    });

    it("handles round numbers", () => {
      const speakable = toSpeakable("ocean-river-30", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river thirty");
    });
  });

  describe("phonetic prefix", () => {
    it("includes phonetic prefix by default", () => {
      const speakable = toSpeakable("ocean-river-27");
      const parts = speakable.split(" ");

      // First part should be a NATO alphabet word
      const natoWords = [
        "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf",
        "hotel", "india", "juliet", "kilo", "lima", "mike", "november",
        "oscar", "papa", "quebec", "romeo", "sierra", "tango", "uniform",
        "victor", "whiskey", "xray", "yankee", "zulu",
      ];

      expect(natoWords).toContain(parts[0]);
    });

    it("can disable phonetic prefix", () => {
      const speakable = toSpeakable("ocean-river-27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });
  });

  describe("emoji handling", () => {
    it("removes emoji prefix", () => {
      const speakable = toSpeakable("🌊 ocean-river-27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });
  });

  describe("case handling", () => {
    it("normalizes to lowercase", () => {
      const speakable = toSpeakable("OCEAN-RIVER-27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });
  });

  describe("separator handling", () => {
    it("handles underscore separator", () => {
      const speakable = toSpeakable("ocean_river_27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });

    it("handles space separator", () => {
      const speakable = toSpeakable("ocean river 27", { phoneticPrefix: false });

      expect(speakable).toBe("ocean river twenty-seven");
    });
  });
});

describe("numberToWords", () => {
  it("converts single digits", () => {
    expect(numberToWords(0)).toBe("zero");
    expect(numberToWords(1)).toBe("one");
    expect(numberToWords(9)).toBe("nine");
  });

  it("converts teens", () => {
    expect(numberToWords(10)).toBe("ten");
    expect(numberToWords(11)).toBe("eleven");
    expect(numberToWords(19)).toBe("nineteen");
  });

  it("converts tens", () => {
    expect(numberToWords(20)).toBe("twenty");
    expect(numberToWords(30)).toBe("thirty");
    expect(numberToWords(90)).toBe("ninety");
  });

  it("converts compound numbers", () => {
    expect(numberToWords(21)).toBe("twenty-one");
    expect(numberToWords(42)).toBe("forty-two");
    expect(numberToWords(99)).toBe("ninety-nine");
  });

  it("throws on out of range", () => {
    expect(() => numberToWords(-1)).toThrow("Number must be between 0 and 99");
    expect(() => numberToWords(100)).toThrow("Number must be between 0 and 99");
  });
});

describe("createSpeakableConverter", () => {
  it("creates deterministic converter with seed", () => {
    const converter1 = createSpeakableConverter(createSeededRandom(42));
    const converter2 = createSpeakableConverter(createSeededRandom(42));

    const result1 = converter1("ocean-river-27");
    const result2 = converter2("ocean-river-27");

    expect(result1).toBe(result2);
  });
});
