import * as fs from "node:fs";

enum type {
  fiveOfAKind = 6,
  fourOfAKind = 5,
  FullHouse = 4,
  ThreeOfAKind = 3,
  TwoPair = 2,
  OnePair = 1,
  HighCard = 0,
}

const faceCardsValues: { [key: string]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

type Hand = {
  cards: number[];
  bid: number;
  type: type;
  rank: number;
};

function day7(inputFile: string) {
  const lines: string = fs.readFileSync(inputFile, "utf-8");
  const splittedLines = lines.split("\r\n");
  const hands: Hand[] = splittedLines.map((line) => parseHand(line));
  console.log(hands);
  rankHandsByType(hands);
}

const parseHand = (line: string): Hand => {
  const cards = [...line.split(" ")[0]];
  const numberCards = cards.map((card) => parseToCard(card));

  function parseToCard(card: string): number {
    return Number.isNaN(Number(card)) ? faceCardsValues[card] : Number(card);
  }

  const bid = Number(line.split(" ")[1]);
  return {
    cards: numberCards,
    bid: bid,
    type: getType(numberCards),
    rank: 0,
  };
};

function getCardCounts(cards: number[]) {
  const cardsMap = new Map<number, number>();
  for (let i = 0; i < cards.length; i++) {
    let card: number = cards[i];
    let currentCountOfCard = cardsMap.get(card);
    if (!currentCountOfCard) {
      cardsMap.set(card, 1);
    } else {
      currentCountOfCard++;
      cardsMap.set(card, currentCountOfCard);
    }
  }
  return cardsMap;
}

function getType(cards: Hand["cards"]): type {
  const counts = getCardCounts(cards);
  const amounts = [...counts.values()].sort((a, b) => b - a);
  if (amounts[0] === 5) {
    return type.fiveOfAKind;
  }
  if (amounts[0] === 4) {
    return type.fourOfAKind;
  }
  if (amounts[0] === 3 && amounts[1] === 2) {
    return type.FullHouse;
  }
  if (amounts[0] === 3) {
    return type.ThreeOfAKind;
  }
  if (amounts[0] === 2 && amounts[1] === 2) {
    return type.TwoPair;
  }
  if (amounts[0] === 2) {
    return type.OnePair;
  }
  return type.HighCard;
}

function rankHandsByType(hands: Hand[]) {
  hands.sort((a, b) => a.type - b.type);

  // console.log(hands, "voor");

  hands.sort((a, b) => {
    if (a.type === b.type) {
      tieBreaker(a.cards, b.cards);
    }
    return null;
  });
  // console.log(hands, "na");
}

function tieBreaker(cardsA: number[], cardsB: number[]) {
  for (let i = 0; i < cardsA.length; i++) {
    for (let x = 0; x < cardsB.length; x++) {
      if (cardsA[i] === cardsB[x]) {
        i++;
        x++;
      } else if (cardsA[i] < cardsB[x]) {
        return 1;
      } else if (cardsA[i] > cardsB[x]) {
        return -1;
      }
    }
  }
}
day7("./inputDay7.txt");

[
  ...new Map([
    ["a", 4],
    ["b", 8],
    ["c", 1],
  ]).values(),
].sort((a, b) => b - a);
