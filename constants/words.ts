const Adjectives: string[] = require("../assets/libs/words/adjectives.json")
const Adverbs: string[] = require("../assets/libs/words/adverbs.json")
const Common: string[] = require("../assets/libs/words/common.json")
const Nouns: string[] = require("../assets/libs/words/nouns.json")

export type LibWordsType = {
    adjectives: string[];
    adverbs: string[];
    common: string[];
    nouns: string[];
}

export const LibWords: LibWordsType = {
    adjectives: Adjectives,
    adverbs: Adverbs,
    common: Common,
    nouns: Nouns,
}