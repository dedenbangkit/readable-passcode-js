# readable-passcode

Generate human-friendly, memorable passcodes.

```diff
- 839201
- ABX-194-QZ
+ mango-river-27
+ sunset-falcon-42
```

## Why?

Traditional verification codes are hard to remember and awkward to share:

- `839201` - Which digit was it again?
- `ABX-194` - Was that a B or an 8?

Readable passcodes are memorable and easy to communicate:

- `ocean-swift-42` - Easy to remember
- `pickle-llama-73` - Fun to say out loud

## Install

```bash
npm install readable-passcode
```

## Quick Start

```ts
import { generatePasscode } from "readable-passcode";

generatePasscode();
// "mango-river-27"

generatePasscode({ style: "funny" });
// "pickle-llama-73"

generatePasscode({ emoji: true });
// "🌊 ocean-swift-42"
```

## API

### `generatePasscode(options?)`

Generate a readable passcode.

```ts
type GeneratePasscodeOptions = {
  separator?: string;              // default: "-"
  numberMin?: number;              // default: 10
  numberMax?: number;              // default: 99
  words?: number;                  // default: 2
  wordCase?: "lower" | "upper" | "capital";  // default: "lower"
  style?: "default" | "funny" | "romantic";  // default: "default"
  emoji?: boolean;                 // default: false
  randomFn?: () => number;         // default: Math.random
};
```

#### Examples

```ts
// Custom separator
generatePasscode({ separator: "_" });
// "forest_moon_31"

// More words for higher entropy
generatePasscode({ words: 3 });
// "ocean-swift-falcon-42"

// Different number range
generatePasscode({ numberMin: 100, numberMax: 999 });
// "river-storm-847"

// Capital case
generatePasscode({ wordCase: "capital" });
// "Sunset-Valley-27"

// Funny style
generatePasscode({ style: "funny" });
// "waffle-penguin-55"

// Romantic style
generatePasscode({ style: "romantic" });
// "blossom-moonlight-19"

// With emoji
generatePasscode({ style: "funny", emoji: true });
// "🦙 llama-pickle-42"
```

### `toSpeakable(passcode, options?)`

Convert a passcode to a voice-friendly format for phone calls or voice verification.

```ts
import { toSpeakable } from "readable-passcode";

toSpeakable("mango-river-27");
// "alpha mango river twenty-seven"

toSpeakable("ocean-swift-42", { phoneticPrefix: false });
// "ocean swift forty-two"

// Works with emoji passcodes too
toSpeakable("🌊 ocean-river-27");
// "bravo ocean river twenty-seven"
```

#### Options

```ts
type SpeakableOptions = {
  phoneticPrefix?: boolean;  // default: true - adds NATO alphabet prefix
};
```

### `numberToWords(num)`

Convert a number (0-99) to English words.

```ts
import { numberToWords } from "readable-passcode";

numberToWords(42);  // "forty-two"
numberToWords(15);  // "fifteen"
numberToWords(80);  // "eighty"
```

### `createSpeakableConverter(randomFn?)`

Create a deterministic speakable converter for testing.

```ts
import { createSpeakableConverter } from "readable-passcode";

const toSpeakable = createSpeakableConverter(() => 0.5);
toSpeakable("ocean-river-27");
// Always returns the same phonetic prefix
```

### Word Lists

Access the built-in word lists for customization:

```ts
import { words, emojis } from "readable-passcode";

console.log(words.default);   // ["ocean", "river", "forest", ...]
console.log(words.funny);     // ["pickle", "llama", "waffle", ...]
console.log(words.romantic);  // ["blossom", "moonlight", ...]

console.log(emojis.default);  // ["🌊", "🏔️", "🌲", ...]
```

## Use Cases

### OTP Alternative

Replace ugly verification codes with memorable ones:

```ts
const code = generatePasscode({ numberMin: 10, numberMax: 99 });
// Send "Your code is: sunset-river-42"
```

### Invite Codes

Generate shareable invite codes:

```ts
const invite = generatePasscode({ words: 3, wordCase: "capital" });
// "Forest-Eagle-Storm-27"
```

### Temporary Passwords

Create temporary passwords that users can actually remember:

```ts
const tempPass = generatePasscode({ words: 3, numberMax: 999 });
// "ocean-swift-falcon-847"
```

### Room/Session Codes

Generate codes for meetings, game rooms, or sessions:

```ts
const roomCode = generatePasscode({ style: "funny", separator: " " });
// "waffle penguin 42"
```

### Call Center Verification

Use speakable codes for phone verification:

```ts
const code = generatePasscode();
const speakable = toSpeakable(code);

// Agent: "Your verification phrase is: alpha mango river twenty-seven"
```

## Entropy & Security

Default configuration (`2 words + 2-digit number`):
- Word pool: ~100 words per style
- Number range: 10-99 (90 values)
- Combinations: ~100 × 99 × 90 = ~891,000

For higher security, increase word count:

```ts
generatePasscode({ words: 3 });
// ~100 × 99 × 98 × 90 = ~87 million combinations

generatePasscode({ words: 4 });
// ~8.5 billion combinations
```

> **Note**: This library is designed for **memorable codes**, not cryptographic security. For passwords requiring high entropy, consider a dedicated password generator.

## Deterministic Output

For testing or reproducible results, inject a custom random function:

```ts
// Simple seeded random (for testing)
function seededRandom(seed: number) {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

generatePasscode({ randomFn: seededRandom(42) });
// Always produces the same output with seed 42
```

## TypeScript

Full TypeScript support with exported types:

```ts
import type {
  GeneratePasscodeOptions,
  SpeakableOptions
} from "readable-passcode";
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run typecheck

# Build
npm run build
```

## License

AGPL-3.0
