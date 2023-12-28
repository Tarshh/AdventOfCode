import * as fs from "fs";

const symbols = ["*", "#", "+", "$", "/", "%", "@", "-", "&", "="];

function day3(inputFile: string) {
  const lines = fs.readFileSync(inputFile, "utf-8");
  const splittedLines: string[] = lines.split("\r\n");
  let total = 0;

  for (let i = 0; i < splittedLines.length; i++) {
    const numberMatches = splittedLines[i].match(/\d{1,3}/g) || [];
    let currentIndex = 0;

    numberMatches.forEach((number) => {
      let startIndex = splittedLines[i].indexOf(number, currentIndex);
      let endIndex = startIndex + number.length;
      let currentLine = splittedLines[i].substring(
        startIndex - 1,
        endIndex + 1
      );

      //set currentIndex at the end of our current match so it will check passed the matches we already had.
      currentIndex = endIndex;

      const lineAbove = splittedLines[i - 1]
        ? splittedLines[i - 1].substring(startIndex - 1, endIndex + 1)
        : "";
      const lineBelow = splittedLines[i + 1]
        ? splittedLines[i + 1].substring(startIndex - 1, endIndex + 1)
        : "";
      const symbolsFound = checkForSymbols(lineAbove, currentLine, lineBelow);

      const numberOnly = parseInt(
        splittedLines[i].substring(startIndex, endIndex)
      );

      if (symbolsFound) {
        total += numberOnly;
      }
    });
  }
  console.log({ total });
}

function checkForSymbols(
  lineAbove: string,
  currentLine: string,
  lineBelow: string
) {
  return symbols.some(
    (symbol) =>
      lineAbove.includes(symbol) ||
      currentLine.includes(symbol) ||
      lineBelow.includes(symbol)
  );
}

day3("./inputDay3.txt");
