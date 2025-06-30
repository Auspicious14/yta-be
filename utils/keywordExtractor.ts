// Path: youtube-automation-backend/utils/keywordExtractor.ts

export function extractKeywords(text: string): string[] {
  // Simple keyword extraction for demonstration purposes.
  // In a real application, you might use a more sophisticated NLP library.
  const words = text.toLowerCase().match(/\b\w+\b/g);
  if (!words) {
    return [];
  }

  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'for', 'with', 'as', 'by',
    'from', 'of', 'to', 'be', 'have', 'it', 'that', 'this', 'not', 'you', 'he', 'she', 'we', 'they', 'will', 'can'
  ]);

  const filteredWords = words.filter(word => !stopWords.has(word));

  // Count word frequency
  const wordFrequency: { [key: string]: number } = {};
  for (const word of filteredWords) {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  }

  // Sort by frequency and return top N keywords
  const sortedKeywords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

  return sortedKeywords.slice(0, 5); // Return top 5 keywords
}