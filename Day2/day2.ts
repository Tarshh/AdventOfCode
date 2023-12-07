import * as fs from "fs";

enum Cubecolors {
  red = "red",
  green = "green",
  blue = "blue",
}

function playGame(gameId: number, game: string): number {
  const totalAmountOfRedCubes = 12;
  const totalAmountOfGreenCubes = 13;
  const totalAmountOfBlueCubes = 14;
  let impossibleGame = false;

  const sets = game.split(": ").pop();
  const setWithoutGame = sets?.split("; ");
  const cubes = setWithoutGame?.map((cube) => cube.split(","));

  cubes?.map((cube) => {
    cube.map((color) => {
      const trimmedColorWithNumber = color.trim();
      const cubeNumber = parseInt(trimmedColorWithNumber.replace(/\D/g, ""));
      const cubeColor = trimmedColorWithNumber.replace(/\d+/g, "").trim();
      if (!impossibleGame) {
        switch (cubeColor) {
          case Cubecolors.blue: {
            cubeNumber > totalAmountOfBlueCubes && (impossibleGame = true);
            break;
          }
          case Cubecolors.green: {
            cubeNumber > totalAmountOfGreenCubes && (impossibleGame = true);
            break;
          }
          case Cubecolors.red: {
            cubeNumber > totalAmountOfRedCubes && (impossibleGame = true);
            break;
          }
        }
      }
    });
  });
  return impossibleGame ? 0 : gameId;
}

function day2(inputFile: string) {
  const lines = fs.readFileSync(inputFile, "utf-8");
  const splittedLines: string[] = lines.split("\r\n");
  const totalGameIds = splittedLines
    .map((line, key) => playGame(key + 1, line))
    .reduce((total, current) => (total += current), 0);
  console.log(totalGameIds);
}

day2("./inputDay2.txt");
