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
  for (let i = 0; i < item.length; i++) {
    let substring = newString.substring(i, item.length);
    for (let writtenNumber of writtenNumbers) {
      if (substring.startsWith(writtenNumber.writtenValue)) {
        newString = newString.replace(
          writtenNumber.writtenValue,
          writtenNumber.numberValue.toString()
        );
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
