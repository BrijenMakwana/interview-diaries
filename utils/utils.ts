const countWords = (text: string): number => {
  return text?.trim().split(/\s+/).length;
};

const getArticleReadTimeInMin = (text: string): number => {
  const wordsPerMinute = 225;

  const wordCount = countWords(text);

  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
};

export { countWords, getArticleReadTimeInMin };
