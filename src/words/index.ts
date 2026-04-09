import type { WordLists, EmojiMap } from "../types";

export const words: WordLists = {
  default: [
    // Nature
    "ocean", "river", "forest", "mountain", "sunset", "meadow", "canyon", "valley",
    "island", "glacier", "desert", "prairie", "waterfall", "lagoon", "reef", "grove",
    // Weather & Sky
    "storm", "thunder", "breeze", "aurora", "rainbow", "cloud", "mist", "frost",
    "dawn", "dusk", "twilight", "zenith", "cosmos", "comet", "lunar", "stellar",
    // Animals
    "falcon", "dolphin", "tiger", "phoenix", "dragon", "wolf", "eagle", "panther",
    "otter", "fox", "owl", "hawk", "raven", "lion", "bear", "lynx",
    // Elements
    "crystal", "ember", "spark", "flame", "wave", "stone", "amber", "jade",
    "silver", "bronze", "copper", "iron", "steel", "quartz", "opal", "pearl",
    // Plants & Food
    "mango", "cedar", "maple", "willow", "bamboo", "lotus", "orchid", "fern",
    "sage", "basil", "mint", "olive", "lemon", "berry", "peach", "plum",
    // Abstract
    "swift", "bold", "brave", "calm", "vivid", "noble", "prime", "apex",
    "echo", "pulse", "tempo", "flux", "nexus", "core", "arc", "zen",
  ],

  funny: [
    // Silly animals
    "llama", "alpaca", "penguin", "platypus", "walrus", "moose", "sloth", "wombat",
    "panda", "hippo", "narwhal", "quokka", "lemur", "emu", "dodo", "yak",
    // Food & Snacks
    "pickle", "waffle", "noodle", "taco", "nacho", "pretzel", "muffin", "donut",
    "nugget", "burrito", "pancake", "biscuit", "churro", "popcorn", "cookie", "cupcake",
    // Fun words
    "wiggle", "wobble", "giggle", "bubble", "squish", "bounce", "zoom", "fizz",
    "sparkle", "twinkle", "doodle", "noodle", "snuggle", "bumble", "jumble", "tumble",
    // Objects
    "banana", "rocket", "robot", "disco", "ninja", "pirate", "wizard", "unicorn",
    "kazoo", "banjo", "ukulele", "yodel", "bongo", "tango", "mango", "flamingo",
  ],

  romantic: [
    // Feelings
    "dreamy", "tender", "gentle", "serene", "bliss", "grace", "charm", "glow",
    "warmth", "comfort", "peace", "harmony", "joy", "hope", "trust", "faith",
    // Nature (soft)
    "blossom", "petal", "garden", "meadow", "breeze", "sunrise", "moonlight", "starlight",
    "dewdrop", "rosebud", "lily", "jasmine", "violet", "lavender", "honey", "nectar",
    // Poetic
    "velvet", "silk", "satin", "lace", "pearl", "diamond", "ruby", "sapphire",
    "whisper", "murmur", "serenade", "lullaby", "sonnet", "poetry", "melody", "rhythm",
    // Connection
    "embrace", "cherish", "adore", "treasure", "forever", "always", "beloved", "darling",
    "sweet", "lovely", "precious", "golden", "radiant", "luminous", "eternal", "infinite",
  ],
};

export const emojis: EmojiMap = {
  default: [
    "🌊", "🏔️", "🌲", "⚡", "🌅", "🦅", "🐺", "🔥",
    "💎", "🌙", "⭐", "🍋", "🌿", "🦁", "🐬", "🌈",
  ],
  funny: [
    "🦙", "🐧", "🥒", "🧇", "🌮", "🥯", "🍩", "🎸",
    "🚀", "🤖", "🦄", "🥳", "🎉", "🎪", "🎭", "🦆",
  ],
  romantic: [
    "💕", "🌹", "✨", "💫", "🌸", "💝", "🦋", "🕊️",
    "💖", "🌷", "🌺", "💗", "💓", "🥀", "💐", "🌼",
  ],
};
