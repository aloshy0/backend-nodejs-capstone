const natural = require("natural");

const tokenizer = new natural.WordTokenizer();
const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

module.exports = { tokenizer, analyzer };