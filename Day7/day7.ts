import * as fs from "fs";

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
  cardsMap: Map<number, number> | null;
  bid: number;
  type: type | null;
  rank: number;
};

function day7(inputFile: string) {
  const hands: Hand[] = [];
  const lines = fs.readFileSync(inputFile, "utf-8");
  const splittedLines = lines.split("\r\n");
  splittedLines.forEach((line) => hands.push(hand(line)));
  hands.forEach((hand) => checkHand(hand));
  hands.forEach((hand) => checkType(hand));
  rankHandsByType(hands);
}

const hand = (line: string): Hand => {
  const cards = line.split(" ")[0].split("");
  const numberCards: number[] = [];
  let cardNumber: number = 0;
  for (let i = 0; i < cards.length; i++) {
    if (!Number(cards[i])) {
      cardNumber = faceCardsValues[cards[i]];
    } else {
      cardNumber = Number(cards[i]);
    }
    numberCards.push(cardNumber);
  }
  const bid = Number(line.split(" ")[1]);
  return {
    cards: numberCards,
    cardsMap: null,
    bid: bid,
    type: undefined,
    rank: 0,
  };
};

function checkHand(hand: Hand) {
  const cardsMap = new Map<number, number>();
  for (let i = 0; i < hand.cards.length; i++) {
    let card: number = hand.cards[i];
    let currentCountOfCard = cardsMap.get(card);
    if (!currentCountOfCard) {
      cardsMap.set(card, 1);
    } else {
      currentCountOfCard++;
      cardsMap.set(card, currentCountOfCard);
    }
  }
  //sort map by entries
  //create array from map
  const entriesArray = Array.from(cardsMap.entries());
  //sort array by value of the map, no sorting on a map
  entriesArray.sort((a, b) => b[1] - a[1]);
  //turn it back into a map
  const sortedMap = new Map(entriesArray);
  hand.cardsMap = sortedMap;
}

function checkType(hand: Hand) {
  let currentType;
  // console.log(hand.cardsMap);
  for (const [card, amount] of hand.cardsMap) {
    if (amount === 5) {
      hand.type = type.fiveOfAKind;
    } else if (amount === 4) {
      hand.type = type.fourOfAKind;
      currentType = type.fourOfAKind;
    } else if (amount === 3) {
      hand.type = type.ThreeOfAKind;
      currentType = type.ThreeOfAKind;
    } else if (amount === 2 && currentType === type.ThreeOfAKind) {
      hand.type = type.FullHouse;
    } else if (amount === 2 && currentType == type.OnePair) {
      hand.type = type.TwoPair;
    } else if (amount === 2) {
      hand.type = type.OnePair;
      currentType = type.OnePair;
    } else if (amount === 1 && currentType === undefined) {
      hand.type = type.HighCard;
    }
  }

  currentType = null;
}

function rankHandsByType(hands: Hand[]) {
  hands.sort((a, b) => a.type - b.type);

  console.log(hands, "voor");

  hands.sort((a, b) => {
    if (a.type === b.type) {
      tieBreaker(a.cards, b.cards);
    }
    return null;
  });
  console.log(hands, "na");
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
