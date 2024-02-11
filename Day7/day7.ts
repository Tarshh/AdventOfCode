import assert from "node:assert";
import * as fs from "node:fs";

enum HandType {
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
  J: 1,
  T: 10,
};

type Hand = {
  cards: number[];
  bid: number;
  handType: HandType;
  handTypeWithJokers: HandType;
};

function readFile(inputFile: string) {
  return fs.readFileSync(inputFile, "utf-8");
}

function parseCards(inputFileName: string) {
  const lines = readFile(inputFileName);
  const splitLines = lines.split("\n");
  return splitLines.map((line) => parseHand(line));
}

function day7(hands: Hand[]) {
  hands.sort((a, b) => {
    return sortHands(a, b);
  });

  const total = hands.reduce(
    (total, current, currentIndex) => total + current.bid * (currentIndex + 1),
    0
  );

  return total;
}

function day7part2(hands: Hand[]) {
  hands.sort((a, b) => {
    return sortHands(a, b, true);
  });

  const total = hands.reduce(
    (total, current, currentIndex) => total + current.bid * (currentIndex + 1),
    0
  );

  return total;
}

function sortHands(
  handA: Hand,
  handB: Hand,
  handTypeWithJoker?: Boolean
): number {
  if (!handTypeWithJoker) {
    if (handA.handType > handB.handType) return 1;
    if (handB.handType > handA.handType) return -1;
  } else {
    if (handA.handTypeWithJokers > handB.handTypeWithJokers) return 1;
    if (handB.handTypeWithJokers > handA.handTypeWithJokers) return -1;
  }

  return tieBreaker(handA.cards, handB.cards);
}

function tieBreaker(cardsA: number[], cardsB: number[]): number {
  let i = 0;
  for (let i = 0; i < cardsA.length; i++) {
    const comparison = cardsA[i] - cardsB[i];
    if (comparison !== 0) return comparison;
  }
  return 0;
}

function parseToCard(card: string): number {
  return card in faceCardsValues ? faceCardsValues[card] : Number(card);
}

const parseHand = (line: string): Hand => {
  const [cardString, bidString] = line.split(" ");
  const cards = cardString.split("").map((card) => parseToCard(card));
  const bid = Number(bidString);
  return {
    cards,
    bid,
    handType: getHandType(cards),
    handTypeWithJokers: getHandTypeWithJoker(cards),
  };
};

function getCardCounts(cards: number[]) {
  const cardsMap = new Map<number, number>();
  for (const card of cards) {
    const currentCountOfCard = cardsMap.get(card) || 0;
    cardsMap.set(card, currentCountOfCard + 1);
  }
  return cardsMap;
}

function getHandType(cards: Hand["cards"]): HandType {
  const counts = getCardCounts(cards);
  const sortedCounts = [...counts.values()].sort((a, b) => b - a);
  return handTypeFromSortedCounts(sortedCounts);
}

function handTypeFromSortedCounts(amounts: number[]) {
  if (amounts[0] === 5) {
    return HandType.fiveOfAKind;
  }
  if (amounts[0] === 4) {
    return HandType.fourOfAKind;
  }
  if (amounts[0] === 3 && amounts[1] === 2) {
    return HandType.FullHouse;
  }
  if (amounts[0] === 3) {
    return HandType.ThreeOfAKind;
  }
  if (amounts[0] === 2 && amounts[1] === 2) {
    return HandType.TwoPair;
  }
  if (amounts[0] === 2) {
    return HandType.OnePair;
  }
  return HandType.HighCard;
}

function getHandTypeWithJoker(cards: Hand["cards"]): HandType {
  const counts = getCardCounts(cards);
  const jokerCard = 1;
  let jokerCount = counts.get(jokerCard) || 0;
  counts.delete(jokerCard);

  const sortedCounts = [...counts.values()].sort((a, b) => b - a);

  jokerCount === 5 ? (sortedCounts[0] = 5) : (sortedCounts[0] += jokerCount);

  return handTypeFromSortedCounts(sortedCounts);
}

const hands = parseCards("./inputDay7.txt");
const result = day7(hands);
assert(result === 248217452);
const result2 = day7part2(hands);
console.log({ result2 });
assert(result2 === 245576185);
