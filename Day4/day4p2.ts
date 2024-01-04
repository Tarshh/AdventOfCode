import * as fs from "fs";

type parsedCard = [number, string[], string[]];

function parseCard(card: string): parsedCard {
  const cardNumber = parseInt(card.split(":")[0].replace(/\D/g, ""));
  const cardWithoutCardNumber = card.split(":")[1];
  const winningNumbers = cardWithoutCardNumber.split("|")[0].trim().split(" ");
  const myNumbers = card
    .split("|")[1]
    .trim()
    .split(" ")
    .filter((n) => n);
  return [cardNumber, winningNumbers, myNumbers];
}

function day4(inputFile: string) {
  const lines = fs.readFileSync(inputFile, "utf-8");
  let splittedLines: string[] = lines.split("\r\n");
  let cardCopies = new Map<number, number>();

  for (let i = 0; i < splittedLines.length; i++) {
    cardCopies.set(i + 1, 1);
  }

  for (let i = 0; i < splittedLines.length; i++) {
    const [cardNumber, winningNumbers, myNumbers] = parseCard(splittedLines[i]);
    checkNumbers(cardNumber, winningNumbers, myNumbers);
  }

  function checkNumbers(
    cardNumber: number,
    winningNumbers: string[],
    myNumbers: string[]
  ) {
    const iterations = cardCopies.get(cardNumber);
    let amountOfMatches = 0;

    if (!iterations) {
      return;
    }

    for (let i = 0; i < iterations; i++) {
      winningNumbers.forEach((winningNumber) => {
        myNumbers.forEach((myNumber) => {
          if (winningNumber === myNumber) {
            amountOfMatches++;
            let currentMatches = cardCopies.get(cardNumber + amountOfMatches);
            if (currentMatches) {
              cardCopies.set(cardNumber + amountOfMatches, currentMatches + 1);
            }
          }
        });
      });

      //reset AmountOfMatches for next iteration
      amountOfMatches = 0;
    }
  }

  const total = Array.from(cardCopies.values()).reduce(
    (total, current) => (total += current)
  );

  console.log(total);
}

day4("./inputDay4.txt");
