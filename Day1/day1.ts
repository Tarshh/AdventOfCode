import * as fs from "fs";

const writtenNumbers = [
  {
    writtenValue: "one",
    numberValue: 1,
  },
  {
    writtenValue: "two",
    numberValue: 2,
  },
  {
    writtenValue: "three",
    numberValue: 3,
  },
  {
    writtenValue: "four",
    numberValue: 4,
  },
  {
    writtenValue: "five",
    numberValue: 5,
  },
  {
    writtenValue: "six",
    numberValue: 6,
  },
  {
    writtenValue: "seven",
    numberValue: 7,
  },
  {
    writtenValue: "eight",
    numberValue: 8,
  },
  {
    writtenValue: "nine",
    numberValue: 9,
  },
];

function swapWrittenNumbers(item: string) {
  let newString = item;
  let foundFirstNumber = false;
  let foundLastNumber = false;

  for (let i = 0; i < item.length; i++) {
    let substring = newString.substring(i, item.length);
    if (parseInt(substring.charAt(0))) {
      foundFirstNumber = true;
    }
    for (let writtenNumber of writtenNumbers) {
      if (
        substring.startsWith(writtenNumber.writtenValue) &&
        !foundFirstNumber
      ) {
        newString = newString.replace(
          writtenNumber.writtenValue,
          writtenNumber.numberValue.toString()
        );
        foundFirstNumber = true;
        break;
      }
    }
  }
  if (foundFirstNumber) {
    for (let i = newString.length - 1; i > 0; i--) {
      const subString = newString.substring(i, newString.length);
      for (let writtenNumber of writtenNumbers) {
        if (
          subString.startsWith(writtenNumber.writtenValue) &&
          !foundLastNumber
        ) {
          const allOccurences = new RegExp(writtenNumber.writtenValue, "g");
          newString = newString.replace(
            allOccurences,
            writtenNumber.numberValue.toString()
          );
          foundLastNumber = true;
          break;
        }
      }
    }
  }
  return newString;
}

function day1() {
  const lines = fs.readFileSync("./inputDay1.txt", "utf-8");
  const splittedLines: string[] = lines.split("\r\n");
  let total = 0;

  splittedLines.map((item: string) => {
    const numbersInString = swapWrittenNumbers(item);
    const numbersOnly = numbersInString.replace(/\D/g, "");
    const numberToAdd =
      numbersOnly.length > 1
        ? numbersOnly.charAt(0) + numbersOnly.slice(-1)
        : numbersOnly.charAt(0) + numbersOnly.charAt(0);
    total += parseInt(numberToAdd);
    console.log({ numberToAdd });
  });
  console.log(total);
}

day1();
