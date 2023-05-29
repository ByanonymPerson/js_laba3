export function reverseWords(str) {
  return str.split(" ").map(word => {
    let wordLength = word.length;
    if (wordLength % 2 === 0) {
      return word.slice(wordLength / 2) + word.slice(0, wordLength / 2);
    } else {
      let middle = Math.floor(wordLength / 2);
      return word.slice(middle + 1) + word[middle] + word.slice(0, middle);
    }
  }).join(" ");
}