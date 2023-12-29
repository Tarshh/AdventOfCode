import * as fs from "fs";

function day4(inputFile: string) {
  const lines = fs.readFileSync(inputFile, "utf-8");
  const splittedLines: string[] = lines.split("\r\n");
  let points = splittedLines
    .map((line) => checkCards(line.split(":")[1]))
    .reduce((total, current) => (total += current));
  console.log(points);
}

function checkCards(card: string): number {
  let points = 0;
  const winningNumbers = card.split("|")[0].trim().split(" ");
  const myNumbers = card
    .split("|")[1]
    .trim()
    .split(" ")
    .filter((n) => n);
  for (let i = 0; i < winningNumbers.length; i++) {
    for (let j = 0; j < myNumbers.length; j++) {
      if (winningNumbers[i] === myNumbers[j]) {
        points === 0 ? (points = 1) : (points *= 2);
      }
    }
  }
  return points;
}

day4("./inputDay4.txt");
